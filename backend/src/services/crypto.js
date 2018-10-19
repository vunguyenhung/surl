const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const base62 = require('base-62.js');

const { JWT_SECRET } = require('../configs');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

function createToken(data, opts) {
  return jwtSign(data, JWT_SECRET, opts);
}

function verifyToken(token) {
  return jwtVerify(token, JWT_SECRET).catch(() => false);
}

function idToKey(id) {
  return base62.encodeHex(id);
}

module.exports = {
  createToken,
  verifyToken,
  idToKey,
};
