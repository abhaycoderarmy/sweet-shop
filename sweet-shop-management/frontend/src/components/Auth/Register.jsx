import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)' }}>
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(25, 118, 210, 0.12)', padding: '2.5rem 2rem', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ color: '#1976d2', fontWeight: 700, marginBottom: '0.5rem' }}>✨ Join Our Sweet Community!</h2>
        <p style={{ fontSize: '0.95rem', marginBottom: '2rem', color: '#1976d2' }}>Create an account to start shopping</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', color: '#1976d2', fontWeight: 500 }}>👤 Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
              minLength="3"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1976d2', fontSize: '1rem' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#1976d2', fontWeight: 500 }}>📧 Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="name@example.com"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1976d2', fontSize: '1rem' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#1976d2', fontWeight: 500 }}>🔑 Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password"
              minLength="6"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1976d2', fontSize: '1rem' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', color: '#1976d2', fontWeight: 500 }}>🔐 Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter your password"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #1976d2', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.75rem', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(21,101,192,0.15)', cursor: 'pointer' }} disabled={loading}>
            {loading ? '⏳ Creating Account...' : '🎉 Create Account'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#1976d2' }}>
          Already have an account? <Link to="/login" style={{ color: '#1565c0', fontWeight: '600' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;