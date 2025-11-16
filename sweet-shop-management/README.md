# Sweet Shop Management System

## Overview
A full-stack, test-driven Sweet Shop Management System for managing sweets inventory, user authentication, and admin operations. Built with Node.js (Express, MongoDB) and React, following modern development workflows and AI-assisted coding.

---

## Features
### Backend (Node.js, Express, MongoDB)
- **User Authentication:** Register, login, JWT-based protected routes
- **Sweets API:** CRUD for sweets, search/filter, purchase, restock
- **Admin Controls:** Only admins can delete/restock sweets
- **Validation & Security:** Input validation, helmet, CORS, error handling
- **Test Coverage:** Unit and integration tests with Jest & Supertest

### Frontend (React, Vite)
- **Modern SPA:** Responsive UI, blue/purple theme, mobile-friendly
- **Auth Forms:** Register/login, protected routes
- **Sweet Dashboard:** List, search, filter, purchase sweets
- **Admin Panel:** Add, edit, delete, restock sweets
- **Toast Notifications:** User feedback for all actions

---

## Setup Instructions
### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the Repository
```sh
git clone https://github.com/abhaycoderarmy/sweet-shop.git
cd sweet-shop-management
```

### 2. Backend Setup
```sh
cd backend
cp .env.example .env # Edit with your MongoDB URI and JWT secret
npm install
npm run dev # or npm start
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```

### 4. Running Tests
#### Backend
```sh
npm test # Runs Jest unit/integration tests
```

#### Frontend
Manual testing recommended (React Testing Library can be added).

---

## API Endpoints
### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current user (protected)

### Sweets
- `GET /api/sweets` — List all sweets
- `GET /api/sweets/search` — Search sweets
- `POST /api/sweets` — Add sweet (protected)
- `PUT /api/sweets/:id` — Update sweet (protected)
- `DELETE /api/sweets/:id` — Delete sweet (admin only)
- `POST /api/sweets/:id/purchase` — Purchase sweet (protected)
- `POST /api/sweets/:id/restock` — Restock sweet (admin only)

---



## My AI Usage
### Tools Used
- **GitHub Copilot (GPT-4.1):** For generating boilerplate, refactoring, writing tests, and debugging.
- **ChatGPT:** For brainstorming API structures and validation logic.

### How AI Was Used
- Generated initial backend and frontend boilerplate
- Wrote and refactored React components and Express routes
- Created unit/integration tests for backend
- Debugged errors and improved UI/UX

### Reflection
AI tools accelerated development, improved code quality, and helped maintain TDD discipline. All code was reviewed and customized for project needs. AI was credited as co-author in relevant commits.

---

## License
MIT
