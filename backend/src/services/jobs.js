const Agenda = require('agenda');
const dayjs = require('dayjs');

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_AUTH_SOURCE,
} = require('../configs');
const URL = require('../db/url');

const JOBS = {
  DELETE_1_WEEK_OLD_URLS: 'delete 1 week old urls',
};

const DB_CONNECTION_STRING = (DB_USERNAME && DB_PASSWORD && DB_AUTH_SOURCE)
  ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTH_SOURCE}`
  : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const agenda = new Agenda({ db: { address: DB_CONNECTION_STRING, collection: 'jobs' } });

async function start() {
  agenda.define(JOBS.DELETE_1_WEEK_OLD_URLS, (job, done) => {
    const ONE_WEEK_AGO = dayjs().subtract(1, 'week').toISOString();
    URL.deleteMany({ lastVisited: { $lt: ONE_WEEK_AGO } }, done);
  });

  await agenda.start();

  await agenda.every('1 day', JOBS.DELETE_1_WEEK_OLD_URLS);
}

module.exports = {
  start,
};
