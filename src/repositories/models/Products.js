/**
 * Products model.
 *
 * Mongoose schema for product documents. Fields include `name`, `description`,
 * `price` and `stock`. The schema enables timestamps, allows virtuals in JSON
 * output, and is configured with `strict: false` so additional fields may be stored.
 *
 * @module models/Products
 */

const mongoose = require('mongoose');

const productsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true,
      unique: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: [1, 'El stock debe ser al menos 1']
    }
  },
  {
    timestamps: true,
    strict: false,
    toJSON: { virtuals: true }
  }
);

module.exports = mongoose.model('Products', productsSchema);
