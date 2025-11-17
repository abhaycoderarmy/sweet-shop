import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiPackage, FiAlertCircle } from 'react-icons/fi';
import api from '../../services/api';
import SweetForm from '../Sweets/SweetForm';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [sweets, setSweets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
      return;
    }
    fetchSweets();
  }, [isAdmin, navigate]);

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const response = await api.get('/sweets');
      setSweets(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingSweet(null);
    setShowForm(true);
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingSweet(null);
    fetchSweets();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSweet(null);
  };

  const handleRestock = async (sweet) => {
    const quantity = prompt(`📦 How many ${sweet.name}(s) to restock?`, '10');
    
    if (quantity === null) return;
    
    const restockQuantity = parseInt(quantity);
    
    if (isNaN(restockQuantity) || restockQuantity < 1) {
      toast.error('Please enter a valid quantity');
      return;
    }

    try {
      await api.post(`/sweets/${sweet._id}/restock`, { quantity: restockQuantity });
      toast.success(`✅ Restocked ${restockQuantity} ${sweet.name}(s)!`);
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Restock failed');
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
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full"
        />
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl shadow-2xl p-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-black gradient-text mb-2">
                ⚙️ Admin Dashboard
              </h2>
              <p className="text-gray-600">Manage your sweet inventory</p>
            </div>
            <motion.button
              onClick={handleAddNew}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus className="text-xl" />
              <span>Add New Sweet</span>
            </motion.button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-primary text-white">
                  <th className="px-6 py-4 text-left rounded-tl-xl">Name</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Stock</th>
                  <th className="px-6 py-4 text-left">Description</th>
                  <th className="px-6 py-4 text-center rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sweets.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <FiAlertCircle className="mx-auto text-6xl text-gray-300 mb-4" />
                      <p className="text-xl font-bold text-gray-600 mb-2">No sweets yet!</p>
                      <p className="text-gray-500">Start by adding your first sweet</p>
                    </td>
                  </tr>
                ) : (
                  sweets.map((sweet, index) => (
                    <motion.tr
                      key={sweet._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">{sweet.name}</td>
                      <td className="px-6 py-4 capitalize text-gray-600">{sweet.category}</td>
                      <td className="px-6 py-4 font-bold text-primary-600">${sweet.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                          sweet.quantity === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        }`}>
                          <FiPackage />
                          {sweet.quantity === 0 ? 'Out' : sweet.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                        {sweet.description || <em className="text-gray-400">No description</em>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <motion.button
                            onClick={() => handleEdit(sweet)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Edit"
                          >
                            <FiEdit />
                          </motion.button>
                          <motion.button
                            onClick={() => handleRestock(sweet)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                            title="Restock"
                          >
                            <FiPackage />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(sweet._id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
