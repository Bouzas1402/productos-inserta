require('dotenv').config();

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,

  // CORS - Múltiples orígenes
  CORS_ORIGIN: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(url => url.trim())
    : ['https://miapp.com'],

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  JWT_ISSUER: process.env.JWT_ISSUER || 'MiEmpresa.API',
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'miapp.com',

  // Database (MongoDB)
  MONGO_URI: process.env.MONGO_URI || '',

  // Bcrypt salt rounds
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || 10
};

module.exports = config;
