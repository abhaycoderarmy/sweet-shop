import React, { useState, useEffect } from 'react';
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreviewUrl(formData.imageUrl || '');
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
        toast.success('Sweet updated successfully');
      } else {
        await api.post('/sweets', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Sweet created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{ 
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        padding: '3rem',
        maxWidth: '700px',
        width: '100%',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '2.5rem' }}>
              {sweet ? '✏️' : '➕'}
            </span>
          </div>
          <h2 style={{ 
            color: '#667eea', 
            fontWeight: 800,
            fontSize: '2rem',
            margin: 0
          }}>
            {sweet ? 'Edit Sweet' : 'Add New Sweet'}
          </h2>
          <p style={{
            color: '#6B7280',
            fontSize: '1rem',
            marginTop: '0.5rem'
          }}>
            {sweet ? 'Update the details below' : 'Fill in the details to add a new sweet'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          {previewUrl && (
            <div style={{ 
              marginBottom: '2rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                display: 'inline-block',
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(102, 126, 234, 0.2)'
              }}>
                <img 
                  src={previewUrl} 
                  alt="preview" 
                  style={{ 
                    maxWidth: '100%',
                    maxHeight: '250px',
                    display: 'block',
                    borderRadius: '16px'
                  }} 
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="image"
              style={{ 
                display: 'block',
                marginBottom: '0.75rem',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              📸 Product Image
            </label>
            <label 
              htmlFor="image" 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>
                {imageFile ? '✅' : previewUrl ? '🔄' : '📁'}
              </span>
              <span>
                {imageFile ? imageFile.name : previewUrl ? 'Change Image' : 'Choose Image'}
              </span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <small style={{ 
              display: 'block',
              marginTop: '0.75rem',
              color: '#6B7280',
              fontSize: '0.9rem'
            }}>
              💡 Supported formats: JPG, PNG, GIF (Max 5MB)
            </small>
          </div>

          {/* Name Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="name"
              style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Sweet Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Chocolate Delight"
              style={{ 
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Category Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="category"
              style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{ 
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price and Quantity Row */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label 
                htmlFor="price"
                style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#667eea',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                style={{ 
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(102, 126, 234, 0.2)',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label 
                htmlFor="quantity"
                style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#667eea',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Quantity *
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
                style={{ 
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(102, 126, 234, 0.2)',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Description Field */}
          <div style={{ marginBottom: '2rem' }}>
            <label 
              htmlFor="description"
              style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your sweet product..."
              rows="4"
              style={{ 
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                background: loading 
                  ? 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontWeight: 700,
                fontSize: '1.05rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                }
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>
                {loading ? '⏳' : (sweet ? '✏️' : '➕')}
              </span>
              <span>
                {loading ? 'Saving...' : (sweet ? 'Update Sweet' : 'Add Sweet')}
              </span>
            </button>

            <button 
              type="button" 
              onClick={onCancel}
              disabled={loading}
              style={{ 
                background: '#fff',
                color: '#667eea',
                border: '2px solid #667eea',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontWeight: 700,
                fontSize: '1.05rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#667eea';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#667eea';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>✕</span>
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SweetForm;