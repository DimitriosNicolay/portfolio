import contextlib
import importlib.util
import io
import json
from pathlib import Path
import stat
import subprocess
import tempfile
import unittest
from unittest import mock

spec = importlib.util.spec_from_file_location('deploy_remote', Path(__file__).parents[1] / 'scripts/deploy_remote.py')
deploy_remote = importlib.util.module_from_spec(spec)
spec.loader.exec_module(deploy_remote)
OLD = 'BASE_URL=https://old.invalid\nSECRET_KEY_BASE=old\n'
NEW = 'BASE_URL=https://analytics.example\nSECRET_KEY_BASE=fixture-secret\nDATABASE_URL=postgres://fixture\nCLICKHOUSE_DATABASE_URL=http://fixture\n'
IMAGE = 'ghcr.io/dimitriosnicolay/portfolio:sha-' + 'a' * 40
OLD_IMAGE = 'sha256:' + 'b' * 64


class DeployTest(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.stack = Path(self.directory.name)
        (self.stack / '.env').write_text(OLD)
        self.payload = dict(environment=NEW, image=IMAGE, registry_user='fixture', registry_token='fixture-token')
        self.calls = []

    def runner(self, fail=None):
        failed = False
        def run(args, **kwargs):
            nonlocal failed
            self.calls.append((args, kwargs))
            if fail and fail in args and not failed:
                failed = True
                return subprocess.CompletedProcess(args, 1, 'fixture-secret', 'fixture-token')
            output = OLD_IMAGE + '\n' if 'inspect' in args else ''
            return subprocess.CompletedProcess(args, 0, output, '')
        return run

    def deploy(self, runner):
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            deploy_remote.deploy(self.payload, self.stack, runner, sleeper=lambda _: None)
        return output.getvalue()

    def test_rejects_missing_environment_before_any_command(self):
        self.payload['environment'] = 'BASE_URL=https://example.invalid\n'
        with self.assertRaises(ValueError):
            self.deploy(self.runner())
        self.assertEqual(self.calls, [])
        self.assertEqual((self.stack / '.env').read_text(), OLD)

    def test_rejects_unexpected_image_before_any_command(self):
        self.payload['image'] = 'ghcr.io/someone/other:latest'
        with self.assertRaises(ValueError):
            self.deploy(self.runner())
        self.assertEqual(self.calls, [])

    def test_existing_environment_keys_cannot_be_accidentally_dropped(self):
        (self.stack / '.env').write_text(OLD + 'POSTGRES_PASSWORD=fixture-existing\n')
        with self.assertRaises(ValueError):
            self.deploy(self.runner())
        self.assertEqual(self.calls, [])
        self.assertIn('POSTGRES_PASSWORD=', (self.stack / '.env').read_text())

    def test_pull_failure_preserves_live_files_and_never_restarts(self):
        with self.assertRaises(RuntimeError) as error:
            self.deploy(self.runner('pull'))
        self.assertEqual((self.stack / '.env').read_text(), OLD)
        self.assertFalse((self.stack / 'docker-compose.website-release.json').exists())
        self.assertFalse(any('up' in args for args, _ in self.calls))
        self.assertNotIn('fixture-token', str(error.exception))
        self.assertNotIn('fixture-secret', str(error.exception))

    def test_success_uses_private_runtime_file_and_website_only(self):
        output = self.deploy(self.runner())
        self.assertEqual((self.stack / '.env').read_text(), NEW)
        self.assertEqual((self.stack / '.env.previous').read_text(), OLD)
        self.assertEqual(stat.S_IMODE((self.stack / '.env').stat().st_mode), 0o600)
        self.assertEqual(json.loads((self.stack / 'docker-compose.website-release.json').read_text()), {'services': {'portfolio': {'image': IMAGE}}})
        changes = [args for args, _ in self.calls if 'up' in args]
        self.assertEqual(len(changes), 1)
        self.assertEqual(changes[0][-1], 'portfolio')
        self.assertIn('--no-deps', changes[0])
        self.assertFalse(list(self.stack.glob('.release-*')))
        self.assertNotIn('fixture-secret', output)
        for args, _ in self.calls:
            self.assertNotIn('fixture-token', ' '.join(args))
            self.assertNotIn('fixture-secret', ' '.join(args))

    def test_failed_start_restores_previous_env_and_exact_previous_image(self):
        with self.assertRaises(RuntimeError):
            self.deploy(self.runner('up'))
        self.assertEqual((self.stack / '.env').read_text(), OLD)
        result = json.loads((self.stack / 'docker-compose.website-release.json').read_text())
        self.assertEqual(result['services']['portfolio']['image'], OLD_IMAGE)
        self.assertEqual(len([a for a, _ in self.calls if 'up' in a]), 2)

    def test_ssh_client_passes_secrets_only_in_stdin_and_private_key_file(self):
        path = Path(__file__).parents[1] / 'scripts/deploy.py'
        spec = importlib.util.spec_from_file_location('deploy_client', path)
        client = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(client)
        variables = dict(VPS_HOST='192.0.2.1', VPS_USER='deploy', VPS_SSH_KEY='fixture-private-key',
                         VPS_KNOWN_HOSTS='fixture-known-host', PORTFOLIO_RUNTIME_ENV=NEW,
                         GITHUB_REPOSITORY='DimitriosNicolay/portfolio', GITHUB_SHA='a' * 40,
                         GITHUB_ACTOR='fixture', GHCR_TOKEN='fixture-token')
        files = []
        def ssh(args, **kwargs):
            self.assertNotIn('fixture-private-key', ' '.join(args))
            self.assertNotIn('fixture-token', ' '.join(args))
            self.assertNotIn('fixture-secret', ' '.join(args))
            self.assertIn('StrictHostKeyChecking=yes', args)
            key = Path(args[args.index('-i') + 1]);files.append(key)
            self.assertEqual(stat.S_IMODE(key.stat().st_mode), 0o600)
            self.assertEqual(json.loads(kwargs['input'])['environment'], NEW)
        with mock.patch.dict(client.os.environ, variables), mock.patch.object(client.subprocess, 'run', ssh):
            client.main()
        self.assertFalse(files[0].exists())


if __name__ == '__main__':
    unittest.main()
