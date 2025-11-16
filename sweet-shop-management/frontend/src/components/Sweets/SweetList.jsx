import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import SweetCard from './SweetCard';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

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

    const quantity = prompt(`🛒 How many ${sweet.name}(s) to add to your cart? (Available: ${sweet.quantity})`, '1');
    
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: '3rem'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(102, 126, 234, 0.2)',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }} />
        <p style={{ fontSize: '1.2rem', color: '#667eea', fontWeight: 600 }}>🍬 Loading sweets...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      padding: '3rem 2rem',
      maxWidth: '1600px',
      margin: '0 auto'
    }}>
      {/* Section Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '3rem',
        animation: 'fadeIn 0.6s ease-out'
      }}>
        <h2 style={{ 
          color: '#667eea', 
          fontWeight: 800, 
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
          marginBottom: '0.5rem',
          textShadow: '0 2px 10px rgba(102, 126, 234, 0.1)'
        }}>
          🎯 Explore Our Collection
        </h2>
        <p style={{ 
          color: '#764ba2', 
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          fontWeight: 500
        }}>
          Discover the finest selection of delicious sweets and treats
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '3rem' }}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Sweet Grid */}
      {sweets.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '0.5rem', 
            color: '#667eea',
            fontWeight: 700
          }}>
            No sweets found
          </h3>
          <p style={{ color: '#764ba2', fontSize: '1.1rem' }}>
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {sweets.map(sweet => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={handlePurchase}
                onEdit={onEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Results Count */}
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#667eea',
            fontWeight: 600,
            fontSize: '1.1rem'
          }}>
            Showing {sweets.length} delicious {sweets.length === 1 ? 'sweet' : 'sweets'} 🍬
          </div>
        </>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SweetList;