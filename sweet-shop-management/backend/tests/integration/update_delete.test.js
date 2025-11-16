// Mock Cloudinary to return sequential public_ids and capture destroy calls
jest.mock('../../src/config/cloudinary', () => {
  const stream = require('stream');
  let call = 0;
  const ids = ['sweet-shop/old-id', 'sweet-shop/new-id'];
  return {
    uploader: {
      upload_stream: (options, cb) => {
        const pass = new stream.PassThrough();
        pass.on('finish', () => {
          const id = ids[call++] || `sweet-shop/auto-${Date.now()}`;
          cb(null, {
            secure_url: `https://res.cloudinary.com/demo/image/upload/v123/${id}.png`,
            public_id: id
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
const cloudinaryMock = require('../../src/config/cloudinary');

describe('Integration tests - update/delete image lifecycle (Cloudinary mocked)', () => {
  test('create sweet with image, update with new image -> old image destroyed', async () => {
    // Register user (creator)
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ username: 'upduser', email: 'upd@example.com', password: 'password123' })
      .expect(201);

    const token = registerRes.body.data.token;

    const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=';
    const buffer = Buffer.from(pngBase64, 'base64');

    // Create sweet with first image (mock returns 'sweet-shop/old-id')
    const createRes = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Update Test Sweet')
      .field('category', 'chocolate')
      .field('price', '3.00')
      .field('quantity', '5')
      .field('description', 'initial image')
      .attach('image', buffer, 'initial.png')
      .expect(201);

    expect(createRes.body.success).toBe(true);
    const sweetId = createRes.body.data._id;
    expect(createRes.body.data.imagePublicId).toBe('sweet-shop/old-id');

    // Update sweet with a new image (mock returns 'sweet-shop/new-id')
    const updateRes = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Update Test Sweet')
      .attach('image', buffer, 'replacement.png')
      .expect(200);

    expect(updateRes.body.success).toBe(true);
    expect(updateRes.body.data.imagePublicId).toBe('sweet-shop/new-id');

    // Ensure destroy was called with the old id
    expect(cloudinaryMock.uploader.destroy).toHaveBeenCalled();
    expect(cloudinaryMock.uploader.destroy).toHaveBeenCalledWith('sweet-shop/old-id');
  });

  test('admin delete sweet -> cloudinary.destroy called for stored imagePublicId', async () => {
    // Register admin user
    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({ username: 'admuser', email: 'adm@example.com', password: 'password123', role: 'admin' })
      .expect(201);

    const adminToken = adminRes.body.data.token;

    // Create a sweet as admin (reuse buffer)
    const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=';
    const buffer = Buffer.from(pngBase64, 'base64');

    const createRes = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .field('name', 'Delete Test Sweet')
      .field('category', 'gummy')
      .field('price', '1.00')
      .field('quantity', '2')
      .field('description', 'to be deleted')
      .attach('image', buffer, 'del.png')
      .expect(201);

    const sweetId = createRes.body.data._id;
    const storedId = createRes.body.data.imagePublicId;

    // Delete as admin
    const delRes = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(delRes.body.success).toBe(true);
    // Ensure destroy called for that id
    expect(cloudinaryMock.uploader.destroy).toHaveBeenCalledWith(storedId);

    // Ensure sweet no longer in DB
    const found = await Sweet.findById(sweetId);
    expect(found).toBeNull();
  });
});
