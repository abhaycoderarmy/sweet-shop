require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const sweetRoutes = require('./routes/sweetRoutes');

// Initialize express app
const app = express();


// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logger

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Sweet Shop API',
    version: '1.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start server only when this file is run directly. This allows test
// suites to `require('./src/server')` without the app starting a
// network listener (which causes EADDRINUSE when tests spawn many
// instances).
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      const server = app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      });

      // Handle unhandled promise rejections when running as a process
      process.on('unhandledRejection', (err) => {
        console.log(`Error: ${err.message}`);
        server.close(() => process.exit(1));
      });
    } catch (err) {
      console.error(`Failed to start server: ${err.message}`);
      process.exit(1);
    }
  })();
}

module.exports = app;