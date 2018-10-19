const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');
const log = require('debug')('sURL:http');
const { promisify } = require('util');

const { HTTP_PORT } = require('../configs');
const router = require('./routes');
const { errorHandler } = require('./middlewares');

async function startServer() {
  const app = createApp();
  const listen = promisify(app.listen.bind(app));
  await listen(HTTP_PORT);
  log('HTTP Server has been started on port', HTTP_PORT);
}

function createApp() {
  const koa = new Koa();
  koa.use(errorHandler())
    .use(cors())
    .use(morgan('common'))
    .use(bodyParser())
    .use(router());
  return koa;
}

module.exports = {
  startServer,
};
