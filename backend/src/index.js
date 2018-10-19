const debug = require('debug');

const { connect: connectDB } = require('./db');
const { startServer: startHTTPServer } = require('./http');

debug.enable('sURL:*');
const log = debug('sURL:index');

function main() {
  return Promise.all([
    connectDB(),
    startHTTPServer(),
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
