import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import SweetCard from './SweetCard';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { FiInbox } from 'react-icons/fi';

const SweetList = ({ onEdit }) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async (filters = {}) => {
    setLoading(true);
    try {
      let url = '/sweets';
      
      const queryParams = new URLSearchParams();
      if (filters.name) queryParams.append('name', filters.name);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      
      if (queryParams.toString()) {
        url = `/sweets/search?${queryParams.toString()}`;
      }

      const response = await api.get(url);
      setSweets(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch sweets');
      console.error('Error fetching sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    fetchSweets(filters);
  };

  const handlePurchase = async (sweet) => {
    if (!isAuthenticated) {
      toast.error('🔐 Please login to purchase');
      return;
    }

    const quantity = prompt(`🛒 How many ${sweet.name}(s) would you like? (Available: ${sweet.quantity})`, '1');
    
    if (quantity === null) return;
    
    const purchaseQuantity = parseInt(quantity);
    
    if (isNaN(purchaseQuantity) || purchaseQuantity < 1) {
      toast.error('Please enter a valid quantity');
      return;
    }

    if (purchaseQuantity > sweet.quantity) {
      toast.error(`❌ Only ${sweet.quantity} items available`);
      return;
    }

    try {
      await api.post(`/sweets/${sweet._id}/purchase`, { quantity: purchaseQuantity });
      toast.success(`✅ Successfully purchased ${purchaseQuantity} ${sweet.name}(s)!`);
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Purchase failed');
    }
  };

  const handleDelete = async (sweetId) => {
    if (!window.confirm('🗑️ Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await api.delete(`/sweets/${sweetId}`);
      toast.success('✅ Sweet deleted successfully');
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete sweet');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mb-4"
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xl font-bold gradient-text"
        >
          Loading delicious sweets...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-4"
        >
          🎯 Explore Our Collection
        </motion.h2>
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
          Discover the finest selection of delicious sweets and treats
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Sweet Grid */}
      <AnimatePresence mode="wait">
        {sweets.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              <FiInbox className="mx-auto text-gray-300" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-700 mb-3">
              No sweets found
            </h3>
            <p className="text-lg text-gray-500">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-8"
            >
              {sweets.map((sweet, index) => (
                <motion.div
                  key={sweet._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SweetCard
                    sweet={sweet}
                    onPurchase={handlePurchase}
                    onEdit={onEdit}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="inline-block glass rounded-full px-8 py-4">
                <span className="text-lg font-bold gradient-text">
                  Showing {sweets.length} delicious {sweets.length === 1 ? 'sweet' : 'sweets'} 🍬
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SweetList;
