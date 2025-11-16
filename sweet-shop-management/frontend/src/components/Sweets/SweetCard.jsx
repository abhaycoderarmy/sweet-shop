import React from 'react';
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

  const getCategoryColor = (category) => {
    const colors = {
      chocolate: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
      candy: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
      gummy: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)',
      lollipop: 'linear-gradient(135deg, #FF6347 0%, #FF4500 100%)',
      toffee: 'linear-gradient(135deg, #D2691E 0%, #CD853F 100%)',
      other: 'linear-gradient(135deg, #DEB887 0%, #D2B48C 100%)'
    };
    return colors[category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(102, 126, 234, 0.15)',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 15px 50px rgba(102, 126, 234, 0.25)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.15)';
    }}
    >
      {/* Category Badge */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: getCategoryColor(sweet.category),
        borderRadius: '12px',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        zIndex: 2
      }}>
        <span style={{ fontSize: '1.2rem' }}>{getCategoryEmoji(sweet.category)}</span>
        <span style={{ 
          color: '#fff', 
          fontWeight: 700, 
          fontSize: '0.85rem',
          textTransform: 'capitalize'
        }}>
          {sweet.category}
        </span>
      </div>

      {/* Image Container */}
      <div style={{
        width: '100%',
        height: '200px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {sweet.imageUrl ? (
          <img 
            src={sweet.imageUrl} 
            alt={sweet.name} 
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{ 
            fontSize: '5rem',
            opacity: 0.5,
            transition: 'transform 0.4s ease'
          }}>
            {getCategoryEmoji(sweet.category)}
          </div>
        )}
        
        {/* Stock Badge */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          background: sweet.quantity > 0 
            ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
            : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
          borderRadius: '12px',
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}>
          <span style={{ fontSize: '1rem' }}>
            {sweet.quantity > 0 ? '📦' : '❌'}
          </span>
          <span style={{ 
            color: '#fff', 
            fontWeight: 700, 
            fontSize: '0.85rem'
          }}>
            {sweet.quantity > 0 ? `${sweet.quantity} left` : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ 
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 style={{ 
          color: '#667eea', 
          fontWeight: 800, 
          fontSize: '1.4rem',
          marginBottom: '0.5rem',
          lineHeight: 1.3
        }}>
          {sweet.name}
        </h3>

        {sweet.description && (
          <p style={{ 
            color: '#6B7280', 
            fontSize: '0.95rem', 
            lineHeight: 1.6,
            marginBottom: '1rem',
            flex: 1
          }}>
            {sweet.description}
          </p>
        )}

        {/* Price */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '0.25rem'
          }}>
            Price
          </div>
          <div style={{ 
            color: '#fff', 
            fontWeight: 800, 
            fontSize: '2rem'
          }}>
            ${sweet.price.toFixed(2)}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem',
          flexDirection: 'column'
        }}>
          {isAuthenticated && (
            <button
              onClick={() => onPurchase(sweet)}
              disabled={sweet.quantity === 0}
              style={{
                background: sweet.quantity === 0 
                  ? 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)'
                  : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '0.875rem 1.5rem',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: sweet.quantity === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                opacity: sweet.quantity === 0 ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (sweet.quantity > 0) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (sweet.quantity > 0) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>
                {sweet.quantity === 0 ? '❌' : '🛒'}
              </span>
              <span>{sweet.quantity === 0 ? 'Out of Stock' : 'Purchase Now'}</span>
            </button>
          )}

          {isAdmin && (
            <div style={{ 
              display: 'flex', 
              gap: '0.75rem'
            }}>
              <button
                onClick={() => onEdit(sweet)}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                <span>✏️</span>
                <span>Edit</span>
              </button>
              
              <button
                onClick={() => onDelete(sweet._id)}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                <span>🗑️</span>
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;