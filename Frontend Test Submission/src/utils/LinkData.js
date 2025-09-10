import { Log } from './LogUtil';

const KEY = 'links';

export function getAllLinks() {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    Log('frontend', 'error', 'page', `Fetch error: ${err.message}`);
    return {};
  }
}

export function getLink(code) {
  try {
    return getAllLinks()[code] || null;
  } catch (err) {
    Log('frontend', 'error', 'page', `Fetch error for ${code}: ${err.message}`);
    return null;
  }
}

export function addLink(url, code, mins) {
  try {
    const links = getAllLinks();
    const now = Date.now();
    links[code] = {
      url,
      code,
      created: now,
      expires: now + (mins || 30) * 60 * 1000,
      clicks: [],
      clickCount: 0
    };
    localStorage.setItem(KEY, JSON.stringify(links));
    return links[code];
  } catch (err) {
    Log('frontend', 'error', 'page', `Save error: ${err.message}`);
    throw err;
  }
}

export function updateLink(code, data) {
  try {
    const links = getAllLinks();
    if (!links[code]) return null;
    links[code] = {
      ...links[code],
      ...data,
      lastAccess: data.clicks ? Date.now() : links[code].lastAccess
    };
    localStorage.setItem(KEY, JSON.stringify(links));
    return links[code];
  } catch (err) {
    Log('storage', 'error', 'updateLink', `Update error for ${code}: ${err.message}`);
    throw err;
  }
}
