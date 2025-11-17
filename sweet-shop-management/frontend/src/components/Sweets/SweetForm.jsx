import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiX, FiSave, FiImage } from 'react-icons/fi';
import api from '../../services/api';
import { toast } from 'react-toastify';

const SweetForm = ({ sweet, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'chocolate',
    price: '',
    quantity: '',
    description: '',
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const categories = ['chocolate', 'candy', 'gummy', 'lollipop', 'toffee', 'other'];

  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name || '',
        category: sweet.category || 'chocolate',
        price: sweet.price || '',
        quantity: sweet.quantity || '',
        description: sweet.description || '',
        imageUrl: sweet.imageUrl || ''
      });
      setPreviewUrl(sweet.imageUrl || '');
    }
  }, [sweet]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (file) => {
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('category', formData.category);
      payload.append('price', formData.price);
      payload.append('quantity', formData.quantity);
      payload.append('description', formData.description);

      if (imageFile) {
        payload.append('image', imageFile);
      } else if (formData.imageUrl) {
        payload.append('imageUrl', formData.imageUrl);
      }

      if (sweet) {
        await api.put(`/sweets/${sweet._id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('✅ Sweet updated successfully!');
      } else {
        await api.post('/sweets', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('✅ Sweet created successfully!');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block bg-gradient-primary rounded-2xl p-4 mb-4"
            >
              <span className="text-5xl">
                {sweet ? '✏️' : '➕'}
              </span>
            </motion.div>
            <h2 className="text-4xl font-black gradient-text mb-2">
              {sweet ? 'Edit Sweet' : 'Add New Sweet'}
            </h2>
            <p className="text-gray-600 text-lg">
              {sweet ? 'Update the details below' : 'Fill in the details to add a new sweet'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              {previewUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto"
                >
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setPreviewUrl('');
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <FiX className="text-xl" />
                  </button>
                </motion.div>
              )}

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-4 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                  dragActive
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400 bg-white/50'
                }`}
              >
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-gradient-primary text-white p-6 rounded-full"
                  >
                    {imageFile ? <FiImage className="text-4xl" /> : <FiUpload className="text-4xl" />}
                  </motion.div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-700">
                      {imageFile ? imageFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Sweet Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Chocolate Delight"
                  className="input-field"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input-field"
                />
              </div>

              {/* Quantity */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="0"
                  className="input-field"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your sweet product..."
                  rows="4"
                  className="input-field resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className={`btn-primary flex items-center justify-center gap-3 text-lg ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiSave className="text-xl" />
                <span>{loading ? 'Saving...' : (sweet ? 'Update Sweet' : 'Add Sweet')}</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={onCancel}
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className={`btn-secondary flex items-center justify-center gap-3 text-lg ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiX className="text-xl" />
                <span>Cancel</span>
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SweetForm;
