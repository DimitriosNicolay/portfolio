"""Receive a website release over SSH stdin; never print its runtime secrets."""
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import time


def atomic_write(path, content):
    fd, name = tempfile.mkstemp(prefix='.deploy-', dir=path.parent)
    try:
        with os.fdopen(fd, 'wb') as stream:
            stream.write(content)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(name, path)
    finally:
        Path(name).unlink(missing_ok=True)


def validate(payload):
    if not re.fullmatch(r'ghcr\.io/dimitriosnicolay/portfolio:sha-[0-9a-f]{40}', payload.get('image', '')):
        raise ValueError('Unexpected release image')
    value = payload.get('environment', '')
    if not isinstance(value, str) or not value.strip() or '\0' in value or len(value.encode()) > 48000:
        raise ValueError('Runtime environment is missing or invalid')
    names = set(re.findall(r'^([A-Z_][A-Z0-9_]*)=.+$', value, re.M))
    if not {'BASE_URL', 'SECRET_KEY_BASE', 'DATABASE_URL', 'CLICKHOUSE_DATABASE_URL'} <= names:
        raise ValueError('Runtime environment is missing required keys')
    if not payload.get('registry_user') or not payload.get('registry_token'):
        raise ValueError('Registry authentication is missing')


def deploy(payload, stack=Path('/opt/stacks/portfolio'), runner=subprocess.run, sleeper=time.sleep):
    validate(payload)
    os.umask(0o077)
    env_path = stack / '.env'
    release_path = stack / 'docker-compose.website-release.json'
    previous_env = env_path.read_bytes()
    old_keys = set(re.findall(rb'^([A-Z_][A-Z0-9_]*)=.+$', previous_env, re.M))
    new_keys = set(re.findall(rb'^([A-Z_][A-Z0-9_]*)=.+$', payload['environment'].encode(), re.M))
    if not old_keys <= new_keys:
        raise ValueError('Runtime environment omits existing configuration keys')
    changed = False
    with tempfile.TemporaryDirectory(prefix='.release-', dir=stack) as directory:
        temporary = Path(directory)
        staged_env = temporary / '.env'
        staged_release = temporary / 'release.json'
        staged_env.write_text(payload['environment'].replace('\r\n', '\n').rstrip() + '\n')
        staged_release.write_text(json.dumps({'services': {'portfolio': {'image': payload['image']}}}))
        process_env = dict(os.environ, DOCKER_CONFIG=str(temporary / 'docker'))

        def run(args, label, data=None, check=True, timeout=120):
            result = runner(args, input=data, capture_output=True, text=True,
                            timeout=timeout, env=process_env)
            if check and result.returncode:
                raise RuntimeError(label + ' failed; command output withheld to protect credentials')
            return result

        def compose(env_file=env_path, override=release_path):
            return ['docker', 'compose', '-p', 'portfolio', '--env-file', str(env_file),
                    '-f', str(stack / 'docker-compose.production.yml'), '-f', str(override)]

        # Pull and validate before touching the live environment or application.
        run(compose(staged_env, staged_release) + ['config', '--quiet'], 'Configuration validation')
        old_image = run(['docker', 'inspect', '--format', '{{.Image}}', 'portfolio-portfolio-1'],
                        'Current image inspection').stdout.strip()
        if not re.fullmatch(r'sha256:[0-9a-f]{64}', old_image):
            raise RuntimeError('Unexpected current image identity')
        run(['docker', 'login', 'ghcr.io', '-u', payload['registry_user'], '--password-stdin'],
            'Registry login', data=payload['registry_token'])
        run(compose(staged_env, staged_release) + ['pull', 'portfolio'], 'Image pull', timeout=300)
        atomic_write(stack / '.env.previous', previous_env)
        try:
            changed = True
            atomic_write(env_path, staged_env.read_bytes())
            atomic_write(release_path, staged_release.read_bytes())
            run(compose() + ['up', '-d', '--no-deps', '--no-build', '--pull', 'never', 'portfolio'],
                'Website recreation')
            health = "require('http').get('http://127.0.0.1:3000/',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1));setTimeout(()=>process.exit(1),8000)"
            for _ in range(15):
                response = run(compose() + ['exec', '-T', 'portfolio', 'node', '-e', health],
                               'Website health', check=False, timeout=12)
                if response.returncode == 0:
                    print('Website deployment and HTTP health check succeeded.', flush=True)
                    return
                sleeper(3)
            raise RuntimeError('Website health check failed')
        except Exception:
            if changed:
                atomic_write(env_path, previous_env)
                atomic_write(release_path, json.dumps({'services': {'portfolio': {'image': old_image}}}).encode())
                run(compose() + ['up', '-d', '--no-deps', '--no-build', '--pull', 'never', 'portfolio'],
                    'Rollback to previous website image')
            raise RuntimeError('Website deployment failed; previous environment and image restored') from None


if __name__ == '__main__':
    try:
        deploy(json.load(sys.stdin))
    except Exception:
        print('Deployment failed. No credentials or command output are printed.', file=sys.stderr)
        sys.exit(1)
