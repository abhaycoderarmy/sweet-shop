import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiEdit, FiTrash2, FiPackage } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const SweetCard = ({ sweet, onPurchase, onEdit, onDelete }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  const getCategoryEmoji = (category) => {
    const emojis = {
      chocolate: '🍫',
      candy: '🍬',
      gummy: '🐻',
      lollipop: '🍭',
      toffee: '🍮',
      other: '🍰'
    };
    return emojis[category] || '🍬';
  };

  const getCategoryGradient = (category) => {
    const gradients = {
      chocolate: 'from-amber-600 to-orange-700',
      candy: 'from-pink-500 to-rose-600',
      gummy: 'from-purple-500 to-pink-500',
      lollipop: 'from-red-500 to-orange-500',
      toffee: 'from-yellow-600 to-amber-700',
      other: 'from-blue-500 to-purple-600'
    };
    return gradients[category] || 'from-primary-500 to-secondary-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden"
    >
      {/* Category Badge */}
      <div className={`absolute top-4 right-4 z-10 bg-gradient-to-r ${getCategoryGradient(sweet.category)} text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold text-sm`}>
        <span className="text-lg">{getCategoryEmoji(sweet.category)}</span>
        <span className="capitalize">{sweet.category}</span>
      </div>

      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {sweet.imageUrl ? (
          <motion.img
            src={sweet.imageUrl}
            alt={sweet.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl opacity-40"
            >
              {getCategoryEmoji(sweet.category)}
            </motion.span>
          </div>
        )}

        {/* Stock Badge */}
        <div className={`absolute bottom-4 left-4 ${
          sweet.quantity > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'
        } text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold text-sm`}>
          <FiPackage />
          <span>{sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of Stock'}</span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {sweet.name}
        </h3>

        {/* Description */}
        {sweet.description && (
          <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
            {sweet.description}
          </p>
        )}

        {/* Price Tag */}
        <div className="bg-gradient-primary rounded-2xl p-4 text-center transform group-hover:scale-105 transition-transform">
          <div className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-1">
            Price
          </div>
          <div className="text-white text-3xl font-black">
            ${sweet.price.toFixed(2)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {isAuthenticated && (
            <motion.button
              onClick={() => onPurchase(sweet)}
              disabled={sweet.quantity === 0}
              whileHover={sweet.quantity > 0 ? { scale: 1.02 } : {}}
              whileTap={sweet.quantity > 0 ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                sweet.quantity === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              <FiShoppingCart className="text-xl" />
              <span>{sweet.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            </motion.button>
          )}

          {isAdmin && (
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={() => onEdit(sweet)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <FiEdit />
                <span>Edit</span>
              </motion.button>

              <motion.button
                onClick={() => onDelete(sweet._id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <FiTrash2 />
                <span>Delete</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export default SweetCard;
