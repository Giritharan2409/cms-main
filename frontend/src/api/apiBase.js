const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const configuredBase = trimTrailingSlash(import.meta.env.VITE_API_BASE_URL);

const inferredRenderBackend =
  !import.meta.env.DEV && typeof window !== 'undefined' && window.location.hostname.endsWith('.onrender.com')
    ? 'https://cms-backend.onrender.com'
    : '';

const hostBase = configuredBase || inferredRenderBackend;

export const API_BASE = hostBase ? `${hostBase}/api` : '/api';

export function buildApiUrl(path) {
  const normalizedPath = String(path || '').startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalizedPath}`;
}
