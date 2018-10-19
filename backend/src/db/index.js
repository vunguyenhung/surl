const mongoose = require('mongoose');
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_AUTH_SOURCE,
} = require('../configs');

const URL = require('./models/url');

function connect(options) {
  const DEFAULT_OPTIONS = { useNewUrlParser: true, useCreateIndex: true };
  const AUTH_OPTIONS = (DB_AUTH_SOURCE && DB_USERNAME && DB_PASSWORD) && {
    authSource: DB_AUTH_SOURCE,
    auth: { user: DB_USERNAME, password: DB_PASSWORD },
  };

  return mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    ...DEFAULT_OPTIONS,
    ...AUTH_OPTIONS,
    ...options,
  });
}

module.exports = {
  connect,
  URL,
  createId: mongoose.Types.ObjectId,
};
