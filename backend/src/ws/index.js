const server = require('http').createServer();
const socketIO = require('socket.io');
const log = require('debug')('sURL:ws');
const { promisify } = require('util');

const { WS_PORT } = require('../configs');

const CHANNELS = {
  NEW_URL: 'newURL',
};

const ws = socketIO(server, {
  path: '/',
  serveClient: false,
});

async function startServer() {
  const startListening = promisify(server.listen.bind(server));
  await startListening(WS_PORT);
  log('WS Server has been started on port', WS_PORT);
}

function broadcastNewURL(url) {
  return ws.emit(CHANNELS.NEW_URL, JSON.stringify(url));
}

module.exports = {
  startServer,
  ws,
  broadcastNewURL,
};
