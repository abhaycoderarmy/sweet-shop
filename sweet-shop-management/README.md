# 🍬 Sweet Shop Management System

A modern, full-stack web application for managing a sweet shop with a beautiful, responsive UI built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

### Frontend
- 🎨 **Modern UI/UX** - Beautiful gradient designs with glassmorphism effects
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Smooth Animations** - Powered by Framer Motion
- 🎯 **Tailwind CSS** - Utility-first styling for rapid development
- 🔍 **Advanced Search** - Filter sweets by name, category, and price range
- 🛒 **Shopping Features** - Add to cart, purchase tracking
- 👤 **User Authentication** - Secure login and registration
- 🔐 **Admin Dashboard** - Manage inventory, restock, and CRUD operations

### Backend
- 🚀 **RESTful API** - Built with Express.js
- 🗄️ **MongoDB** - NoSQL database for data storage
- 🔒 **JWT Authentication** - Secure token-based auth
- 📸 **Image Upload** - Cloudinary integration for product images
- ✅ **Input Validation** - Express-validator for data integrity
- 🧪 **Comprehensive Testing** - Jest test suite with high coverage
- 🛡️ **Security** - Helmet.js for security headers

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📦 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Icons** - Icon library
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image hosting
- **Multer** - File upload handling
- **Express Validator** - Input validation
- **Jest** - Testing framework

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Sweets
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets with filters
- `GET /api/sweets/:id` - Get single sweet
- `POST /api/sweets` - Create sweet (Protected)
- `PUT /api/sweets/:id` - Update sweet (Protected)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet (Protected)
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only)

## 🧪 Testing

Run backend tests:
```bash
cd backend
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 🎨 UI Features

- **Glassmorphism Effects** - Modern frosted glass design
- **Gradient Backgrounds** - Beautiful color transitions
- **Smooth Animations** - Page transitions and micro-interactions
- **Responsive Grid Layouts** - Adapts to all screen sizes
- **Interactive Cards** - Hover effects and animations
- **Loading States** - Elegant loading spinners
- **Toast Notifications** - User-friendly feedback
- **Form Validation** - Real-time input validation

## 👥 User Roles

### Regular User
- Browse sweets catalog
- Search and filter products
- Purchase sweets
- View product details

### Admin
- All user permissions
- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock inventory
- Access admin dashboard

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Role-based access control
- Input validation and sanitization
- Security headers with Helmet
- CORS configuration

## 📱 Responsive Design

The application is fully responsive and works perfectly on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Laptops (1024px and up)
- 🖥️ Desktops (1280px and up)

## 🎭 Design Highlights

- **Color Palette**: Purple, pink, and blue gradients
- **Typography**: Bold, modern fonts with clear hierarchy
- **Spacing**: Consistent padding and margins
- **Shadows**: Layered shadows for depth
- **Borders**: Rounded corners throughout
- **Icons**: React Icons for consistent iconography

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤖 My AI Usage

### AI Tools Used
I extensively used **Kiro AI** (an AI-powered IDE assistant) throughout this project to accelerate development and implement modern best practices.

### How I Used AI

#### 1. Frontend Modernization (Major Contribution)
**What**: Complete UI/UX redesign with modern frameworks and responsive design  
**How Kiro AI Helped**:
- Set up Tailwind CSS configuration and custom theme
- Implemented Framer Motion animations and transitions
- Created responsive component designs with mobile-first approach
- Generated glassmorphism effects and gradient backgrounds
- Built modern card layouts with hover effects and interactions
- Designed search and filter components with advanced functionality

#### 2. Component Development
**What**: React components with animations and state management  
**How Kiro AI Helped**:
- Component structure following React best practices
- Tailwind utility class combinations for complex designs
- Framer Motion animation variants and transitions
- Responsive design patterns across all breakpoints
- Accessibility improvements (ARIA labels, keyboard navigation)
- Form validation and error handling patterns

#### 3. Documentation Creation
**What**: Comprehensive project documentation  
**How Kiro AI Helped**:
- Installation guides with step-by-step instructions
- Feature documentation and API endpoint descriptions
- Deployment guides for multiple platforms
- Design system documentation with color palettes and typography
- Customization guides for easy modifications
- Troubleshooting sections and FAQs

#### 4. Code Review and Optimization
**What**: Code quality improvements and best practices  
**How Kiro AI Helped**:
- Best practice suggestions for React and Node.js
- Performance optimization tips (lazy loading, code splitting)
- Security recommendations (input validation, JWT handling)
- Code organization and file structure advice
- Error handling patterns and edge case coverage

### What I Did Myself

While AI was a powerful assistant, I maintained full control over:

- 🧠 **All Architectural Decisions**: Chose MongoDB, Express, React stack
- 🎯 **Feature Planning**: Defined requirements and user stories
- 🔍 **Code Review**: Validated all AI suggestions for correctness
- 🧪 **Testing Strategy**: Designed test cases and TDD approach
- 🎨 **Design Direction**: Made all UX/UI decisions and branding choices
- 🚀 **Integration**: Connected frontend to backend, handled deployment
- 🐛 **Debugging**: Identified and fixed issues independently
- 📊 **Database Design**: Created schemas and relationships

### My Reflection on AI Impact

**Positive Impact:**
- ⚡ **Development Speed**: Reduced development time by ~60% for frontend modernization
- 🎨 **Quality**: Helped implement modern design patterns I was learning (Tailwind, Framer Motion)
- 📚 **Learning Curve**: Accelerated learning of new technologies through practical examples
- 🐛 **Debugging**: Quick identification and resolution of syntax and logic errors
- 📖 **Documentation**: Created comprehensive, professional documentation efficiently
- 🎯 **Best Practices**: Learned industry-standard patterns and conventions

**What Made It Effective:**
- I used AI as a **pair programmer**, not a replacement for thinking
- Always **understood the code** before accepting suggestions
- Made **conscious decisions** about what to implement
- **Customized** AI suggestions to fit project needs
- **Validated** all code through testing and manual review

**Challenges Faced:**
- Had to verify AI suggestions for correctness and security
- Needed to understand generated code deeply, not just copy-paste
- Sometimes AI suggested overly complex solutions that needed simplification
- Required careful integration of AI-generated code with existing codebase
- Had to ensure consistency across AI-assisted and manually written code

**Learning Experience:**
Using Kiro AI was transformative. It felt like having an experienced senior developer available 24/7. However, the key was maintaining a **critical mindset** - I treated AI suggestions as recommendations from a colleague, not absolute truth. This approach helped me:
- Learn faster by seeing working examples
- Understand modern best practices
- Implement features I was conceptually familiar with but hadn't coded before
- Focus on architecture and business logic while AI handled boilerplate

**Specific Examples:**
1. **Tailwind CSS**: I knew the concepts but AI helped me learn the utility class patterns quickly
2. **Framer Motion**: AI provided animation variants that I then customized for my needs
3. **Responsive Design**: AI suggested breakpoint patterns that I adapted to my design
4. **Documentation**: AI helped structure comprehensive docs that I then personalized

**Conclusion:**
AI significantly enhanced my productivity and learning, but the project's success came from combining AI assistance with my own understanding, decision-making, and quality control. I view AI as a powerful tool that amplifies human capability rather than replaces it. The architecture, testing strategy, and final product quality reflect my decisions and understanding, accelerated by AI assistance.

**Honesty Statement:**
I used AI extensively and transparently. Every AI-assisted component was reviewed, understood, and often modified by me. The backend was primarily my own work with minimal AI assistance, while the frontend modernization heavily leveraged AI for implementing modern design patterns. I'm prepared to explain and defend every line of code in this project.

---

## 👨‍💻 Author

**ABHAY KUMAR JAISWAL**

---

Made with 💜 and lots of 🍬 (and a little help from AI 🤖)
