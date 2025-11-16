const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const API = process.env.API_URL || 'http://localhost:5000/api';

async function run() {
  try {
    // Write tiny 1x1 PNG
    const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
    fs.writeFileSync('test-image.png', Buffer.from(base64, 'base64'));

    const rand = Math.random().toString(36).substring(2, 10);
    const registerBody = {
      username: `test${rand}`,
      email: `test${rand}@example.com`,
      password: 'Password123!'
    };

    console.log('Registering user...');
    const regRes = await axios.post(`${API}/auth/register`, registerBody);
    const token = regRes.data.data.token;
    console.log('Registered. Token length:', token.length);

    console.log('Uploading sweet with image...');
    const form = new FormData();
    form.append('name', `TestCandy${rand}`);
    form.append('category', 'candy');
    form.append('price', '2.50');
    form.append('quantity', '10');
    form.append('description', 'Uploaded via test script');
    form.append('image', fs.createReadStream('test-image.png'));

    const uploadRes = await axios.post(`${API}/sweets`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Upload response:', JSON.stringify(uploadRes.data, null, 2));
  } catch (err) {
    console.error('Error during test upload:', err.response?.data || err.message || err);
    process.exit(1);
  }
}

run();
