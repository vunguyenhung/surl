const validator = require('validator');

const User = require('../db/user');
const { verifyToken } = require('../services/crypto');

function auth() {
  return async (ctx, next) => {
    const user = await getUser(ctx);
    if (!user) {
      ctx.throw(401, 'Token is invalid');
    }
    ctx.user = user;
    await next();

    async function getUser(context) {
      const authHeader = context.get('Authorization') || '';

      const token = authHeader.substring('Bearer '.length);
      const tokenData = await verifyToken(token);

      return tokenData && User.findById(tokenData.userId);
    }
  };
}

function errorHandler() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = { message: err.message };
      ctx.app.emit('error', err, ctx);
    }
  };
}

function validateURL() {
  return async (ctx, next) => {
    const { url } = ctx.request.body;
    if (!url) {
      ctx.throw(400, 'URL is required');
    }
    if (!validator.isURL(url, { require_protocol: true })) {
      ctx.throw(400, 'URL is invalid');
    }
    await next();
  };
}

module.exports = {
  auth,
  errorHandler,
  validateURL,
};
