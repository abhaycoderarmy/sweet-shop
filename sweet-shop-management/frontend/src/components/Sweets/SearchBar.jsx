import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['', 'chocolate', 'candy', 'gummy', 'lollipop', 'toffee', 'other'];

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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Search Bar */}
        <div className="glass rounded-2xl p-4 shadow-xl">
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-500 text-xl" />
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleChange}
                placeholder="Search for your favorite sweets..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-transparent bg-white/50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 outline-none text-lg"
              />
            </div>
            
            <motion.button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                showFilters
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-white text-primary-600 border-2 border-primary-500'
              }`}
            >
              <FiFilter className="text-xl" />
              <span className="hidden sm:inline">Filters</span>
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <span className="hidden sm:inline">Search</span>
              <FiSearch className="sm:hidden text-xl" />
            </motion.button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold gradient-text flex items-center gap-2">
                <FiFilter />
                Advanced Filters
              </h3>
              <motion.button
                type="button"
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
              >
                <FiX />
                Reset
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🍬 Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 Min Price
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  placeholder="$0.00"
                  min="0"
                  step="0.01"
                  className="input-field"
                />
              </div>

              {/* Max Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💎 Max Price
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  placeholder="$999.99"
                  min="0"
                  step="0.01"
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default SearchBar;
