import https from 'https';

const IGDB_BASE_URL = 'https://api.igdb.com/v4';
const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
const DEFAULT_IGDB_CLIENT_ID = '331ozbtylxc949s6y4o2amakole28q';
const DEFAULT_IGDB_CLIENT_SECRET = 'g6dhb4trtz2b69dckp5b4t6womkvbj';
const REQUEST_TIMEOUT_MS = 15000;

let cachedToken = null;

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function requestText(url, { method = 'GET', headers = {}, body = '' } = {}) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const req = https.request({
      protocol: target.protocol,
      hostname: target.hostname,
      path: `${target.pathname}${target.search}`,
      method,
      headers: {
        ...headers,
        ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {})
      },
      timeout: REQUEST_TIMEOUT_MS
    }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode || 500, body: data }));
      res.on('error', reject);
    });

    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('Request timeout')));
    if (body) req.write(body);
    req.end();
  });
}

function getCredentials(env = {}) {
  return {
    clientId: (process.env.IGDB_CLIENT_ID || env.IGDB_CLIENT_ID || process.env.VITE_IGDB_CLIENT_ID || env.VITE_IGDB_CLIENT_ID || DEFAULT_IGDB_CLIENT_ID).trim(),
    clientSecret: (process.env.IGDB_CLIENT_SECRET || env.IGDB_CLIENT_SECRET || process.env.VITE_IGDB_CLIENT_SECRET || env.VITE_IGDB_CLIENT_SECRET || DEFAULT_IGDB_CLIENT_SECRET).trim()
  };
}

async function getAccessToken(env = {}) {
  const { clientId, clientSecret } = getCredentials(env);
  if (!clientId || !clientSecret) {
    throw new Error('IGDB credentials are not configured. Add IGDB_CLIENT_SECRET to .env.local or Settings.');
  }

  if (cachedToken?.value && cachedToken.expiresAt > Date.now() + 60000) {
    return cachedToken.value;
  }

  const url = new URL(TWITCH_TOKEN_URL);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('client_secret', clientSecret);
  url.searchParams.set('grant_type', 'client_credentials');

  const response = await requestText(url.href, { method: 'POST' });
  let parsed = null;
  try {
    parsed = response.body ? JSON.parse(response.body) : null;
  } catch {
    parsed = null;
  }

  if (response.statusCode < 200 || response.statusCode >= 300 || !parsed?.access_token) {
    throw new Error(parsed?.message || parsed?.error || `Twitch token request failed: ${response.statusCode}`);
  }

  cachedToken = {
    value: parsed.access_token,
    expiresAt: Date.now() + Math.max(0, Number(parsed.expires_in || 0) - 60) * 1000
  };
  return cachedToken.value;
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

export function igdbProxyPlugin(env = {}) {
  async function handler(req, res, next) {
    if (!req.url?.startsWith('/api/igdb/')) {
      next();
      return;
    }

    if (req.method !== 'POST') {
      sendJson(res, 405, { error: 'IGDB proxy only accepts POST requests.' });
      return;
    }

    const endpoint = req.url.replace('/api/igdb/', '').split('?')[0].replace(/[^a-z_]/gi, '');
    if (!endpoint) {
      sendJson(res, 400, { error: 'Missing IGDB endpoint.' });
      return;
    }

    try {
      const query = await readRequestBody(req);
      const token = await getAccessToken(env);
      const { clientId } = getCredentials(env);
      const response = await requestText(`${IGDB_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'text/plain',
          'Client-ID': clientId,
          Authorization: `Bearer ${token}`
        },
        body: query
      });

      res.statusCode = response.statusCode;
      res.setHeader('Content-Type', 'application/json');
      res.end(response.body || '[]');
    } catch (error) {
      sendJson(res, 502, { error: error.message });
    }
  }

  return {
    name: 'nexus-igdb-proxy',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}
