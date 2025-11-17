import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <span className="text-3xl">🍬</span>
              </div>
              <span className="text-2xl font-black">Sweet Shop</span>
            </div>
            <p className="text-white/80 mb-4 leading-relaxed">
              Your one-stop destination for all things sweet. Quality treats delivered with love.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FiFacebook />, href: '#' },
                { icon: <FiTwitter />, href: '#' },
                { icon: <FiInstagram />, href: '#' },
                { icon: <FiYoutube />, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all"
                >
                  {React.cloneElement(social.icon, { className: 'text-xl' })}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-white/80 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {['Help Center', 'Shipping Info', 'Returns', 'FAQ'].map((link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-white/80 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-white/80 mb-4">
              Subscribe to get special offers!
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:bg-white/30 focus:border-white/50 transition-all outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-primary-600 font-bold py-3 rounded-xl hover:shadow-xl transition-all"
              >
                Subscribe ✨
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <Link
                  key={link}
                  to="/"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
            <p className="text-white/80 text-sm flex items-center gap-2">
              © {currentYear} Sweet Shop. Made with <FiHeart className="text-red-400" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
