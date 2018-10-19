module.exports = {
  JWT_SECRET: process.env.SURL_JWT_SECRET || 'oops',
  HTTP_PORT: process.env.SURL_HTTP_PORT || 3000,
  WS_PORT: process.env.SURL_WS_PORT || 4000,
  DB_HOST: process.env.SURL_DB_HOST || '',
  DB_PORT: Number(process.env.SURL_DB_PORT) || 27017,
  DB_NAME: process.env.SURL_DB_NAME || '',
  DB_USERNAME: process.env.SURL_DB_USERNAME || '',
  DB_PASSWORD: process.env.SURL_DB_PASSWORD || '',
  DB_AUTH_SOURCE: process.env.SURL_DB_AUTH_SOURCE || '',
};
