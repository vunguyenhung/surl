const Router = require('koa-router');

const User = require('../db/user');
const URL = require('../db/url');
const { createToken } = require('../services/crypto');
const { auth, validateURL } = require('./middlewares');

function routes() {
  const router = new Router();
  router
    .post('/users', async (ctx) => {
      const newUser = await User.create({});
      const token = await createToken({ userId: newUser.id });
      ctx.body = { token };
    });

  router.get('/users/:userId/urls', auth(), async (ctx) => {
    const { userId } = ctx.params;
    if (userId !== ctx.user.id) {
      ctx.throw(401, 'You don\'t have permission to do this');
    }

    ctx.body = await URL.find({ user: userId });
  });

  router.post('/users/:userId/urls',
    validateURL(), auth(),
    async (ctx) => {
      const { userId } = ctx.params;
      if (userId !== ctx.user.id) {
        ctx.throw(401, 'You don\'t have permission to do this');
      }

      const { url } = ctx.request.body;
      const { key } = await URL.create({ url, user: userId });
      ctx.body = { key };
    });

  router.get('/urls', async (ctx) => {
    const { sort, limit } = ctx.request.query;
    const sortQuery = sanitizeSortQueryString(sort);
    const limitQuery = Number(limit);

    ctx.body = await URL.find({})
      .sort(sortQuery)
      .limit(limitQuery);
  });

  router.get('/:key', async (ctx) => {
    const { key } = ctx.params;
    const result = await URL.findOne({ key });
    if (!result) {
      ctx.throw(404);
    }

    ctx.redirect(result.url);
    await URL.increaseVisitCount(key);
  });

  return router.routes();
}

function sanitizeSortQueryString(sortQuery) {
  return String(sortQuery)
    .split(',')
    .reduce((acc, curr) => {
      const [fieldToSort, sortBy] = curr.split('.');
      const sortByValue = { asc: 1, desc: -1 }[sortBy];
      if (sortByValue) {
        return { ...acc, [fieldToSort]: sortByValue };
      }
      return acc;
    }, {});
}


module.exports = routes;
