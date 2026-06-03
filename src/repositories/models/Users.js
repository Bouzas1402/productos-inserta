/**
 * Users model.
 *
 * Mongoose schema for application users. Fields include `email`, `password`
 * and `role`. The schema enforces a unique index on `email`, hides `password`
 * from query results by default (`select: false`), and validates `role` against
 * a predefined list.
 *
 * @module models/Users
 */

const mongoose = require('mongoose');

const { roles } = require('../../staticData/staticData');
const { hashPassword } = require('../../utils/helpers');

const validRoles = {
  values: roles,
  message: '{VALUE} no es un rol valido'
};

const usersSchema = mongoose.Schema(
  {
    email: {
      type: String
    },
    password: {
      type: String,
      required: false,
      select: false
    },
    role: {
      type: String,
      default: 'CUSTOMER_ROLE',
      enum: validRoles
    }
  },
  {
    timestamps: true,
    strict: false,
    toJSON: { virtuals: true }
  }
);

// Indexes
usersSchema.index({ email: 1 }, { unique: true });

// Middleware encripting password before saving (save)
usersSchema.pre('save', async function () {
  const encryptedPassword = await hashPassword(this.password);
  this.password = encryptedPassword;
});

module.exports = mongoose.model('Users', usersSchema);
