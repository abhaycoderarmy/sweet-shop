const request = require('supertest');
const app = require('../../src/server');
const User = require('../../src/models/User');
const Sweet = require('../../src/models/Sweet');

describe('Sweet Management Tests', () => {
  let userToken;
  let adminToken;
  let userId;
  let adminId;

  beforeEach(async () => {
    // Create regular user
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'regularuser',
        email: 'user@example.com',
        password: 'password123'
      });
    userToken = userResponse.body.data.token;
    userId = userResponse.body.data.id;

    // Create admin user
    const adminResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'adminuser',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      });
    adminToken = adminResponse.body.data.token;
    adminId = adminResponse.body.data.id;
  });

  describe('POST /api/sweets', () => {
    test('should create a new sweet with valid data', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.5,
        quantity: 100,
        description: 'Delicious milk chocolate'
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send(sweetData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(sweetData.name);
      expect(response.body.data.price).toBe(sweetData.price);
    });

    test('should not create sweet without authentication', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: 2.5,
          quantity: 100
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('should not create sweet with duplicate name', async () => {
      // Create first sweet
      await Sweet.create({
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.5,
        quantity: 100,
        createdBy: userId
      });

      // Try to create duplicate
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: 3.0,
          quantity: 50
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });

    test('should not create sweet with invalid category', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'invalid',
          price: 2.5,
          quantity: 100
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should not create sweet with negative price', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: -2.5,
          quantity: 100
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/sweets', () => {
    beforeEach(async () => {
      // Create test sweets
      await Sweet.create([
        {
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: 2.5,
          quantity: 100,
          createdBy: userId
        },
        {
          name: 'Gummy Bears',
          category: 'gummy',
          price: 1.5,
          quantity: 200,
          createdBy: userId
        }
      ]);
    });

    test('should get all sweets', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.count).toBe(2);
    });

    test('should get single sweet by id', async () => {
      const sweet = await Sweet.findOne({ name: 'Chocolate Bar' });

      const response = await request(app)
        .get(`/api/sweets/${sweet._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Chocolate Bar');
    });

    test('should return 404 for non-existent sweet', async () => {
      const fakeId = '507f1f77bcf86cd799439011';

      const response = await request(app)
        .get(`/api/sweets/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/sweets/search', () => {
    beforeEach(async () => {
      await Sweet.create([
        {
          name: 'Milk Chocolate',
          category: 'chocolate',
          price: 2.5,
          quantity: 100,
          createdBy: userId
        },
        {
          name: 'Dark Chocolate',
          category: 'chocolate',
          price: 3.5,
          quantity: 50,
          createdBy: userId
        },
        {
          name: 'Gummy Bears',
          category: 'gummy',
          price: 1.5,
          quantity: 200,
          createdBy: userId
        }
      ]);
    });

    test('should search sweets by name', async () => {
      const response = await request(app)
        .get('/api/sweets/search?name=chocolate')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
    });

    test('should search sweets by category', async () => {
      const response = await request(app)
        .get('/api/sweets/search?category=gummy')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
      expect(response.body.data[0].name).toBe('Gummy Bears');
    });

    test('should search sweets by price range', async () => {
      const response = await request(app)
        .get('/api/sweets/search?minPrice=2&maxPrice=3')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
      expect(response.body.data[0].name).toBe('Milk Chocolate');
    });
  });

  describe('PUT /api/sweets/:id', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.5,
        quantity: 100,
        createdBy: userId
      });
      sweetId = sweet._id;
    });

    test('should update sweet with valid data', async () => {
      const response = await request(app)
        .put(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Premium Chocolate',
          price: 3.5
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Premium Chocolate');
      expect(response.body.data.price).toBe(3.5);
    });

    test('should not update sweet without authentication', async () => {
      const response = await request(app)
        .put(`/api/sweets/${sweetId}`)
        .send({ price: 3.5 })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.5,
        quantity: 100,
        createdBy: userId
      });
      sweetId = sweet._id;
    });

    test('should purchase sweet successfully', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 5 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(95);
    });

    test('should not purchase more than available quantity', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 150 })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Insufficient stock');
    });

    test('should not purchase without authentication', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .send({ quantity: 5 })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.5,
        quantity: 50,
        createdBy: userId
      });
      sweetId = sweet._id;
    });

    test('should restock sweet as admin', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 100 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(150);
    });

    test('should not restock sweet as regular user', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 100 })
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Admin privileges required');
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.5,
        quantity: 100,
        createdBy: userId
      });
      sweetId = sweet._id;
    });

    test('should delete sweet as admin', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify sweet is deleted
      const sweet = await Sweet.findById(sweetId);
      expect(sweet).toBeNull();
    });

    test('should not delete sweet as regular user', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});