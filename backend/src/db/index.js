const mongoose = require('mongoose');
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_AUTH_SOURCE,
} = require('../configs');

const DB_CONNECTION_STRING = (DB_USERNAME && DB_PASSWORD && DB_AUTH_SOURCE)
  ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTH_SOURCE}`
  : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

function connect(options) {
  const DEFAULT_OPTIONS = { useNewUrlParser: true, useCreateIndex: true };

  return mongoose.connect(DB_CONNECTION_STRING, {
    ...DEFAULT_OPTIONS,
    ...options,
  });
}

module.exports = {
  connect,
  DB_CONNECTION_STRING,
};
