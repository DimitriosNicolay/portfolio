"""Pass the runtime configuration to SSH stdin, never to shell command arguments."""
import json
import os
from pathlib import Path
import re
import shlex
import subprocess
import tempfile


def main():
    def required(name):
        value = os.environ.get(name, '')
        if not value.strip():
            raise ValueError('Missing ' + name)
        return value

    host, user = required('VPS_HOST'), required('VPS_USER')
    if not re.fullmatch(r'[a-zA-Z0-9][a-zA-Z0-9.-]*', host) or not re.fullmatch(r'[a-z_][a-z0-9_-]*', user):
        raise ValueError('Invalid SSH destination')
    payload = {
        'environment': required('PORTFOLIO_RUNTIME_ENV'),
        'image': 'ghcr.io/' + required('GITHUB_REPOSITORY').lower() + ':sha-' + required('GITHUB_SHA'),
        'registry_user': required('GITHUB_ACTOR'),
        'registry_token': required('GHCR_TOKEN'),
    }
    remote = Path(__file__).with_name('deploy_remote.py').read_text()
    with tempfile.TemporaryDirectory(prefix='portfolio-ssh-') as directory:
        key, hosts = Path(directory) / 'key', Path(directory) / 'known_hosts'
        for path, value in [(key, required('VPS_SSH_KEY')), (hosts, required('VPS_KNOWN_HOSTS'))]:
            path.touch(mode=0o600)
            path.write_text(value.rstrip() + '\n')
        args = ['ssh', '-F', '/dev/null', '-i', str(key), '-o', 'IdentitiesOnly=yes',
                '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=15', '-o', 'ServerAliveInterval=15',
                '-o', 'ServerAliveCountMax=3', '-o', 'StrictHostKeyChecking=yes',
                '-o', 'UserKnownHostsFile=' + str(hosts), user + '@' + host,
                'python3 -c ' + shlex.quote(remote)]
        subprocess.run(args, input=json.dumps(payload), text=True, check=True, timeout=900)


if __name__ == '__main__':
    main()
