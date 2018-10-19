const mongoose = require('mongoose');

const URLModel = require('./models/url');
const { idToKey } = require('../services/crypto');

function create({ user, url }) {
  const newId = mongoose.Types.ObjectId();
  const key = idToKey(newId);
  return URLModel.create({
    _id: newId, key, url, user,
  });
}

function find(query, projection) {
  return URLModel.find(query, 'key url id visitCount', projection);
}

function findOne(query) {
  return URLModel.findOne(query, 'key url id visitCount');
}

function increaseVisitCount(key) {
  return URLModel.updateOne({ key }, { $inc: { visitCount: 1 }, lastVisited: Date.now() });
}

module.exports = {
  create,
  find,
  findOne,
  deleteMany: URLModel.deleteMany.bind(URLModel),
  increaseVisitCount,
};
