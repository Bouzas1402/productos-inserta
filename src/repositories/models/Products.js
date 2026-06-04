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
      min: [1, 'The stock must be at least 1']
    }
  },
  {
    timestamps: true,
    strict: false,
    toJSON: { virtuals: true }
  }
);

productsSchema.pre('findOneAndUpdate', async function () {
  console.log(this);
  const updateData = this.getUpdate();
  if (updateData.$inc?.stock) {
    const updateData = this.getUpdate();

    const conditions = this.getQuery();
    const currentData = await this.model.findOne(conditions);

    const currentStock = currentData.stock;
    const updateStock = updateData.$inc?.stock;
    console.log('ok', updateData.$inc?.stock, currentData.stock);
    if (currentStock + updateStock < 0) throw new Error('Insufficient stock');
  }
});

module.exports = mongoose.model('Products', productsSchema);
