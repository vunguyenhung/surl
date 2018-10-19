const UserModel = require('./models/user');

module.exports = {
  findById: UserModel.findById.bind(UserModel),
  create: UserModel.create.bind(UserModel),
};
