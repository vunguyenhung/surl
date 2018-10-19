const debug = require('debug');

const DB = require('./db');
const HTTP = require('./http');
const Jobs = require('./services/jobs');

debug.enable('sURL:*');
const log = debug('sURL:index');

function main() {
  return Promise.all([
    DB.connect(),
    HTTP.startServer(),
    Jobs.start(),
  ]);
}

main()
  .then(() => {
    log('sURL has been started');
  })
  .catch((e) => {
    log('Error occurred while starting sURL', e);
    process.exit(1);
  });
