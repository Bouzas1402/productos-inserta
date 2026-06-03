const mongoose = require('mongoose');
const app = require('./src/app');

const userRepository = require('./src/repositories/userRepository');

const config = require('./src/config/config');

// Connect to the MongoDB database
async function connectDatabase() {
  try {
    await mongoose.connect(config.DATABASE_URL, { socketTimeoutMS: 45000 });
    console.log('✅ MongoDB connected successfully');
    console.log(`📡 Database: ${mongoose.connection.name}`);
    console.log(`🏠 Host: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

// Start the HTTP server and application
async function startServer() {
  try {
    await connectDatabase();

    const PORT = config.PORT;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${config.NODE_ENV}`);
      console.log(`API URL: http://localhost:${PORT}/`);
    });

    server.on('error', error => {
      console.error('Server error:', error);
      process.exit(1);
    });

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

mongoose.connection.on('connected', async () => {
  // On DB connected: ensure admin user exists
  console.log('� Mongoose connected to MongoDB');
  try {
    const adminExists = await userRepository.findOne({
      email: process.env.ADMIN_EMAIL
    });

    if (!adminExists) {
      await userRepository.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'ADMIN_ROLE'
      });
    }
    console.log('Usuario administrador creado');
  } catch (error) {
    console.error('Error creando admin:', error);
  }
});

mongoose.connection.on('error', err => {
  // Log mongoose connection errors
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  // Log mongoose disconnection events

  console.log('Mongoose disconnected');
});

// Init aplication
startServer().catch(error => {
  console.error('❌ Application startup failed:', error);
  process.exit(1);
});
