import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiSettings, FiLogOut, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('👋 Logged out successfully');
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass border-b border-white/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-primary p-3 rounded-xl shadow-lg"
            >
              <span className="text-3xl">🍬</span>
            </motion.div>
            <span className="text-2xl font-black gradient-text hidden sm:block">
              Sweet Shop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <NavLink to="/" icon={<FiHome />} text="Home" />
            {isAdmin && <NavLink to="/admin" icon={<FiSettings />} text="Admin" />}
            
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                  <FiUser className="text-primary-600" />
                  <span className="font-semibold text-gray-700">{user?.username}</span>
                </div>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">Login</Link>
                <Link to="/register" className="btn-primary">Register</Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden glass p-3 rounded-xl"
          >
            {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/20"
          >
            <div className="px-4 py-6 space-y-3">
              <MobileNavLink to="/" icon={<FiHome />} text="Home" onClick={() => setMobileMenuOpen(false)} />
              {isAdmin && <MobileNavLink to="/admin" icon={<FiSettings />} text="Admin" onClick={() => setMobileMenuOpen(false)} />}
              
              {isAuthenticated ? (
                <>
                  <div className="glass px-4 py-3 rounded-xl flex items-center gap-2">
                    <FiUser className="text-primary-600" />
                    <span className="font-semibold">{user?.username}</span>
                  </div>
                  <button onClick={handleLogout} className="w-full btn-secondary flex items-center justify-center gap-2">
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full btn-secondary text-center">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block w-full btn-primary text-center">
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/50 transition-all font-semibold text-gray-700"
    >
      {icon}
      <span>{text}</span>
    </motion.div>
  </Link>
);

const MobileNavLink = ({ to, icon, text, onClick }) => (
  <Link to={to} onClick={onClick} className="block">
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/50 transition-all font-semibold text-gray-700"
    >
      {icon}
      <span>{text}</span>
    </motion.div>
  </Link>
);

export default Header;
