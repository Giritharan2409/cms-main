const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const configuredBaseRaw = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE
);

function normalizeHostBase(value) {
  if (!value) return '';
  return value.endsWith('/api') ? value.slice(0, -4) : value;
}

function resolveHostBase() {
  const configuredBase = normalizeHostBase(configuredBaseRaw);
  if (configuredBase) return configuredBase;

  // Production: use same-origin paths; render.yaml rewrites /api/* to backend
  // This avoids CORS errors and respects the static site's rewrite rules
  if (!import.meta.env.DEV && typeof window !== 'undefined') {
    return '';
  }

  return '';
}

const hostBase = resolveHostBase();

// Always use same-origin /api paths; let Render rewrites handle backend routing
export const API_BASE = '/api';

export function buildApiUrl(path) {
  const normalizedPath = String(path || '').startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalizedPath}`;
}
