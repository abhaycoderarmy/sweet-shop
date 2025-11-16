import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import SweetList from './components/Sweets/SweetList';
import SweetForm from './components/Sweets/SweetForm';
import AdminPanel from './components/Admin/AdminPanel';

import './styles/App.css';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid #fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

// Home Page Component
const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const { isAuthenticated } = useAuth();

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingSweet(null);
    window.location.reload();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSweet(null);
  };

  if (showForm) {
    return (
      <SweetForm
        sweet={editingSweet}
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      minHeight: 'calc(100vh - 140px)',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '1rem 2rem',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ fontSize: '3rem' }}>🍬</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 800, 
            marginBottom: '1rem', 
            color: '#fff',
            textShadow: '0 2px 20px rgba(0,0,0,0.1)'
          }}>
            Welcome to Sweet Shop
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', 
            fontWeight: 500, 
            marginBottom: '2rem', 
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Your one-stop destination for all things sweet! Discover delicious treats and candies.
          </p>
          
          {!isAuthenticated && (
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a 
                href="/login" 
                style={{ 
                  background: '#fff', 
                  color: '#667eea', 
                  borderRadius: '12px', 
                  padding: '1rem 2.5rem', 
                  fontWeight: 700, 
                  fontSize: '1.1rem', 
                  textDecoration: 'none', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                }}
              >
                <span>🔐</span> Login
              </a>
              <a 
                href="/register" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  color: '#fff', 
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px', 
                  padding: '1rem 2.5rem', 
                  fontWeight: 700, 
                  fontSize: '1.1rem', 
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>✨</span> Register
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Sweet List Section */}
      <SweetList onEdit={handleEdit} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
          <Header />
          <main style={{ flex: 1, width: '100%' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{ zIndex: 9999 }}
          />
        </div>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </AuthProvider>
    </Router>
  );
}

export default App;