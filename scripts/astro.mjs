import { spawnSync } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { basePath, productionOrigin } from './publication.mjs';

const [command, kind, ...args] = process.argv.slice(2);
if (
  !['dev', 'check', 'build', 'preview'].includes(command ?? '') ||
  !['local', 'production'].includes(kind ?? '')
) {
  throw new Error(
    'Uso: node scripts/astro.mjs <dev|check|build|preview> <local|production>',
  );
}
basePath(process.env.BASE_PATH);
if (kind === 'production') productionOrigin(process.env.SITE_URL);
const cli = fileURLToPath(
  new URL('../node_modules/astro/bin/astro.mjs', import.meta.url),
);
const result = spawnSync(process.execPath, [cli, command ?? '', ...args], {
  stdio: 'inherit',
  env: { ...process.env, C4AI_BUILD_KIND: kind, ASTRO_TELEMETRY_DISABLED: '1' },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
