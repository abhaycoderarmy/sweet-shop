// Mock Cloudinary before requiring the app so controllers use the mock
jest.mock('../../src/config/cloudinary', () => {
  const stream = require('stream');
  return {
    uploader: {
      upload_stream: (options, cb) => {
        const pass = new stream.PassThrough();
        // When the stream finishes, invoke callback with a fake upload result
        pass.on('finish', () => {
          cb(null, {
            secure_url: 'https://res.cloudinary.com/demo/image/upload/v123/test.png',
            public_id: 'sweet-shop/test123'
          });
        });
        return pass;
      },
      destroy: jest.fn().mockResolvedValue({ result: 'ok' })
    }
  };
});

const request = require('supertest');
const app = require('../../src/server');
const Sweet = require('../../src/models/Sweet');

describe('Integration test - multipart upload to Cloudinary (mocked)', () => {
  test('register -> create sweet with image -> imageUrl and imagePublicId saved', async () => {
    // Register a user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ username: 'uploaduser', email: 'upload@example.com', password: 'password123' })
      .expect(201);

    expect(registerRes.body.success).toBe(true);
    const token = registerRes.body.data.token;

    // Tiny 1x1 PNG (base64)
    const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=';
    const buffer = Buffer.from(pngBase64, 'base64');

    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Upload Test Sweet')
      .field('category', 'candy')
      .field('price', '2.50')
      .field('quantity', '10')
      .field('description', 'Test upload sweet')
      .attach('image', buffer, 'test.png')
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('imageUrl');
    expect(res.body.data).toHaveProperty('imagePublicId');
    expect(res.body.data.imagePublicId).toBe('sweet-shop/test123');

    // Verify persisted in DB
    const created = await Sweet.findById(res.body.data._id).lean();
    expect(created).toBeTruthy();
    expect(created.imagePublicId).toBe('sweet-shop/test123');
    expect(created.imageUrl).toBe('https://res.cloudinary.com/demo/image/upload/v123/test.png');
  });
});
