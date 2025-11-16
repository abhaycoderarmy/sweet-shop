const request = require('supertest');
const app = require('../../src/server');

describe('Integration tests - full API flow', () => {
	test('register -> login -> create sweet -> list sweets', async () => {
		// Register
		const registerRes = await request(app)
			.post('/api/auth/register')
			.send({ username: 'intuser', email: 'int@example.com', password: 'password123' })
			.expect(201);

		expect(registerRes.body.success).toBe(true);
		const token = registerRes.body.data.token;

		// Login (should succeed)
		const loginRes = await request(app)
			.post('/api/auth/login')
			.send({ email: 'int@example.com', password: 'password123' })
			.expect(200);

		expect(loginRes.body.success).toBe(true);
		expect(loginRes.body.data).toHaveProperty('token');

		// Create a sweet using token
		const sweetPayload = {
			name: 'Integration Candy',
			category: 'chocolate',
			price: 1.99,
			quantity: 50,
			description: 'Integration test sweet'
		};

		const createRes = await request(app)
			.post('/api/sweets')
			.set('Authorization', `Bearer ${token}`)
			.send(sweetPayload)
			.expect(201);

		expect(createRes.body.success).toBe(true);
		expect(createRes.body.data.name).toBe(sweetPayload.name);

		// List sweets and verify created sweet is present
		const listRes = await request(app)
			.get('/api/sweets')
			.expect(200);

		expect(listRes.body.success).toBe(true);
		expect(Array.isArray(listRes.body.data)).toBe(true);
		const found = listRes.body.data.find(s => s.name === sweetPayload.name);
		expect(found).toBeTruthy();
	});
});
