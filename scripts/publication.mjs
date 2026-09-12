import { isIP } from 'node:net';
import { URL } from 'node:url';

/** @param {string | undefined} value */
export function productionOrigin(value) {
  if (!value) throw new Error('SITE_URL é obrigatória para publicação.');
  const url = new URL(value);
  validateOriginParts(url);
  const host = url.hostname.toLowerCase().replace(/\.$/, '');
  if (
    !host.includes('.') ||
    isIP(host) ||
    host.includes(':') ||
    reservedHost(host)
  ) {
    throw new Error(
      'SITE_URL deve usar um domínio real, não local ou demonstrativo.',
    );
  }
  return url.origin;
}

/** @param {URL} url */
function validateOriginParts(url) {
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('SITE_URL deve ser uma origem HTTPS sem credenciais.');
  }
  if (url.pathname !== '/' || url.search || url.hash || url.port) {
    throw new Error(
      'SITE_URL deve conter apenas a origem; use BASE_PATH para subdiretório.',
    );
  }
}

/** @param {string} host */
function reservedHost(host) {
  return [
    'localhost',
    'local',
    'internal',
    'test',
    'invalid',
    'example',
    'example.com',
    'example.org',
    'example.net',
  ].some((reserved) => host === reserved || host.endsWith(`.${reserved}`));
}

/** @param {string | undefined} value */
export function basePath(value = '/') {
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(value)) {
    throw new Error(
      'BASE_PATH deve ser / ou um caminho como /c4ai/, com barra final.',
    );
  }
  return value;
}
