import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const categories = ['chocolate', 'candy', 'gummy', 'lollipop', 'toffee', 'other'];

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

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      name: '',
      category: '',
      minPrice: '',
      maxPrice: ''
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  return (
    <div style={{ 
      background: '#fff',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 40px rgba(102, 126, 234, 0.15)',
      border: '2px solid rgba(102, 126, 234, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <span style={{ fontSize: '1.5rem' }}>🔍</span>
        <h3 style={{ 
          color: '#667eea', 
          fontWeight: 700, 
          fontSize: '1.3rem',
          margin: 0
        }}>
          Search & Filter
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* Name Search */}
          <div style={{ position: 'relative' }}>
            <label 
              htmlFor="name"
              style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              Sweet Name
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem'
              }}>
                🍬
              </span>
              <input
                type="text"
                id="name"
                name="name"
                value={filters.name}
                onChange={handleChange}
                placeholder="Search by name..."
                style={{ 
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
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

          {/* Category Select */}
          <div style={{ position: 'relative' }}>
            <label 
              htmlFor="category"
              style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              Category
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem',
                pointerEvents: 'none'
              }}>
                📂
              </span>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleChange}
                style={{ 
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(102, 126, 234, 0.2)',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23667eea\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center'
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
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {getCategoryEmoji(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Min Price */}
          <div style={{ position: 'relative' }}>
            <label 
              htmlFor="minPrice"
              style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              Min Price
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem'
              }}>
                💰
              </span>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                style={{ 
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
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

          {/* Max Price */}
          <div style={{ position: 'relative' }}>
            <label 
              htmlFor="maxPrice"
              style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              Max Price
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem'
              }}>
                💵
              </span>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="999.99"
                min="0"
                step="0.01"
                style={{ 
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
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
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button 
            type="submit" 
            style={{ 
              flex: '1 1 200px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff', 
              border: 'none', 
              borderRadius: '12px', 
              padding: '1rem 2rem', 
              fontWeight: 700, 
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
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
            <span style={{ fontSize: '1.2rem' }}>🔍</span>
            <span>Search Sweets</span>
          </button>
          
          <button 
            type="button" 
            onClick={handleReset} 
            style={{ 
              flex: '1 1 200px',
              background: '#fff',
              color: '#667eea', 
              border: '2px solid #667eea', 
              borderRadius: '12px', 
              padding: '1rem 2rem', 
              fontWeight: 700, 
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#667eea';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#667eea';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>↻</span>
            <span>Reset Filters</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;