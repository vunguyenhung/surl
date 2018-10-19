import { API_HTTP_URL } from './configs';
import { generateShortenedURLFromKey } from './utils';

export async function createShortenedURL({ url, userId, token }) {
  const { key } = await fetch(`${API_HTTP_URL}/users/${userId}/urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url }),
  }).then(response => response.json());

  return generateShortenedURLFromKey(key);
}

export async function getUserURLs({ userId, token }) {
  const urls = await fetch(`${API_HTTP_URL}/users/${userId}/urls`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => response.json());

  return urls.map(url => ({
    ...url,
    shortenedURL: generateShortenedURLFromKey(url.key),
  }));
}

export async function getTop10URLs() {
  const urls = await fetch(`${API_HTTP_URL}/urls?sort=visitCount.desc&limit=10`)
    .then(response => response.json());

  return urls.map(url => ({
    ...url,
    shortenedURL: generateShortenedURLFromKey(url.key),
  }));
}

export function register() {
  return fetch(`${API_HTTP_URL}/users`, { method: 'POST' })
    .then(response => response.json());
}
