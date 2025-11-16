require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Use an in-memory MongoDB for tests to make them fast and isolated.
let mongoServer;

// Set test environment
process.env.NODE_ENV = 'test';

// Setup before all tests
beforeAll(async () => {
  // Retry starting the in-memory MongoDB a few times to mitigate
  // transient platform-specific failures (antivirus, leftover processes).
  const maxAttempts = 3;
  let attempt = 0;
  let lastErr;
  while (attempt < maxAttempts) {
    try {
      mongoServer = await MongoMemoryServer.create();
      break;
    } catch (err) {
      lastErr = err;
      attempt += 1;
      console.warn(`MongoMemoryServer start attempt ${attempt} failed:`, err.message || err);
      if (attempt < maxAttempts) {
        // small backoff before retrying
        await new Promise((res) => setTimeout(res, 1000 * attempt));
      }
    }
  }

  if (!mongoServer) {
    // Re-throw the last error so Jest reports a meaningful failure
    throw lastErr || new Error('Failed to start MongoMemoryServer');
  }

  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri;

  // Connect to in-memory test database
  await mongoose.connect(uri, {
    // options kept for compatibility; driver may ignore deprecated flags
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Cleanup after each test
afterEach(async () => {
  // Clear all collections
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Cleanup after all tests
afterAll(async () => {
  // Close mongoose connection and stop in-memory MongoDB
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) await mongoServer.stop();
});