/**
 * Orders model.
 *
 * Mongoose schema representing an order placed by a user. References the `Users`
 * collection via `user_id` and references `Products` within the `product.product_id`.
 * Contains order-level `total_amount` and product-specific `quantity` and `unit_price`.
 *
 * @module models/Orders
 */

const mongoose = require('mongoose');

const productRepository = require('../productsRepository');

const ordersSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    total_amount: { type: Number },
    product: {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
      },
      quantity: { type: Number },
      unit_price: { type: Number }
    }
  },
  {
    timestamps: true,
    strict: false,
    toJSON: { virtuals: true }
  }
);

// Middleware to validate product stock before saving the order
ordersSchema.pre('save', async function (next) {
  const product_id = this.product.product_id;
  const quantity = this.product.quantity;

  const product = await productRepository.findOne({ _id: product_id });
  if (!product) throw new Error('Product not found');

  if (product.stock < quantity) throw new Error('Insufficient stock');

  await productRepository.updateOne(
    { _id: product_id },
    { $inc: { stock: -quantity } }
  );
});

module.exports = mongoose.model('Orders', ordersSchema);
