/* eslint-disable import/prefer-default-export */
import { API_HTTP_URL } from './configs';

export function generateShortenedURLFromKey(key) {
  return `${API_HTTP_URL}/${key}`;
}
