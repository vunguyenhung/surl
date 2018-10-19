const mongoose = require('mongoose');
const { omit } = require('ramda');

const URLSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  url: { type: String, required: true },
  visitCount: { type: Number, default: 0 },
  lastVisited: { type: Date, default: Date.now() },
}, { timestamps: true });

URLSchema.set('toJSON', {
  transform: (doc, result) => ({
    ...omit(['_id'], result),
    // eslint-disable-next-line no-underscore-dangle
    id: result._id,
  }),
});

module.exports = mongoose.model('URL', URLSchema);
