import React, { useState, useEffect } from 'react';
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
    const quantity = prompt(`📦 How many ${sweet.name}(s) to restock? (current: ${sweet.quantity})`, '10');
    
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
    if (!window.confirm('🗑️ Are you sure you want to delete this sweet? This action cannot be undone.')) {
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
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading admin panel...</p>
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
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '24px', boxShadow: '0 4px 24px rgba(25, 118, 210, 0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1976d2', fontWeight: 800, fontSize: '2rem' }}>⚙️ Admin Dashboard</h2>
        <button onClick={handleAddNew} style={{ background: '#1976d2', color: '#fff', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(21,101,192,0.15)', border: 'none', cursor: 'pointer' }}>
          ➕ Add New Sweet
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(25,118,210,0.08)' }}>
          <thead>
            <tr style={{ background: '#e3f2fd', color: '#1976d2', fontWeight: 700 }}>
              <th style={{ padding: '1rem', borderBottom: '2px solid #1976d2' }}>🍬 Name</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid #1976d2' }}>📂 Category</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid #1976d2' }}>💰 Price</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid #1976d2' }}>📦 Quantity</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid #1976d2' }}>📝 Description</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid #1976d2' }}>⚡ Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                  <div>
                    <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1976d2' }}>📭 No sweets yet!</p>
                    <p style={{ color: '#1565c0' }}>Start by adding your first sweet to the collection.</p>
                  </div>
                </td>
              </tr>
            ) : (
              sweets.map(sweet => (
                <tr key={sweet._id} style={{ borderBottom: '1px solid #e3f2fd' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{sweet.name}</td>
                  <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{sweet.category}</td>
                  <td style={{ padding: '1rem', color: '#FF6B9D', fontWeight: 700 }}>${sweet.price.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: sweet.quantity === 0 ? '#EF4444' : '#10B981', fontWeight: 600 }}>
                      {sweet.quantity === 0 ? '❌ Out' : `✅ ${sweet.quantity}`}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', color: '#374151' }}>
                    {sweet.description || <em style={{ color: '#9CA3AF' }}>-</em>}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEdit(sweet)}
                        style={{ background: '#1565c0', color: '#fff', borderRadius: '8px', padding: '0.5rem 1rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                        title="Edit sweet"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleRestock(sweet)}
                        style={{ background: '#10B981', color: '#fff', borderRadius: '8px', padding: '0.5rem 1rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                        title="Restock"
                      >
                        📦 Restock
                      </button>
                      <button
                        onClick={() => handleDelete(sweet._id)}
                        style={{ background: '#EF4444', color: '#fff', borderRadius: '8px', padding: '0.5rem 1rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                        title="Delete sweet"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;