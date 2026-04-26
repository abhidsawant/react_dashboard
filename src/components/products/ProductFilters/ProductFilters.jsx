import { useState } from 'react';
import { Search, Filter, Plus, LayoutGrid, List, ChevronDown, X } from 'lucide-react';
import './ProductFilters.css';

const ProductFilters = ({ 
  onAddProduct, 
  viewMode, 
  setViewMode, 
  categories = [],
  brands = [],
  priceRanges = [],
  filters,
  onFilterChange
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const handleSearchChange = (e) => {
    onFilterChange('search', e.target.value);
  };

  const handleCategorySelect = (category) => {
    onFilterChange('category', category);
    setShowCategoryDropdown(false);
  };

  const handleBrandSelect = (brand) => {
    onFilterChange('brand', brand);
    setShowBrandDropdown(false);
  };

  const handlePriceSelect = (priceRange) => {
    onFilterChange('priceRange', priceRange);
    setShowPriceDropdown(false);
  };

  const handleStatusSelect = (status) => {
    onFilterChange('status', status);
    setShowStatusDropdown(false);
  };

  const formatCategoryName = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getSelectedPriceLabel = () => {
    if (!filters.priceRange) return 'All Prices';
    return priceRanges.find(pr => 
      pr.min === filters.priceRange.min && pr.max === filters.priceRange.max
    )?.label || 'All Prices';
  };

  return (
    <div className="product-filters">
      {/* Top Search & Action Bar */}
      <div className="filters-top-bar">
        <div className="filters-left">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
          <div className="search-wrapper-products">
            <Search className="search-icon-products" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input-products"
              value={filters.search}
              onChange={handleSearchChange}
            />
            {filters.search && (
              <X 
                className="search-clear-icon" 
                size={16} 
                onClick={() => onFilterChange('search', '')}
              />
            )}
          </div>
        </div>

        <div className="filters-right">
          <button className="filter-btn">
            <Filter size={18} className="filter-icon" /> Filter
          </button>
          <button className="add-product-btn" onClick={onAddProduct}>
            <Plus size={18} /> Add new product
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="filters-row">
        {/* Category Filter */}
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <div 
            className="filter-select"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <span className="filter-value">
              {filters.category === 'all' ? 'All Categories' : formatCategoryName(filters.category)}
            </span>
            <ChevronDown size={16} className="filter-chevron" />
            {showCategoryDropdown && (
              <div className="filter-dropdown">
                <div 
                  className={`filter-option ${filters.category === 'all' ? 'selected' : ''}`}
                  onClick={() => handleCategorySelect('all')}
                >
                  All Categories
                </div>
                {categories.map(cat => (
                  <div 
                    key={cat}
                    className={`filter-option ${filters.category === cat ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(cat)}
                  >
                    {formatCategoryName(cat)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Price Filter */}
        <div className="filter-group">
          <label className="filter-label">Price</label>
          <div 
            className="filter-select"
            onClick={() => setShowPriceDropdown(!showPriceDropdown)}
          >
            <span className="filter-value">{getSelectedPriceLabel()}</span>
            <ChevronDown size={16} className="filter-chevron" />
            {showPriceDropdown && (
              <div className="filter-dropdown">
                <div 
                  className={`filter-option ${!filters.priceRange ? 'selected' : ''}`}
                  onClick={() => handlePriceSelect(null)}
                >
                  All Prices
                </div>
                {priceRanges.map((range, idx) => (
                  <div 
                    key={idx}
                    className={`filter-option ${
                      filters.priceRange?.min === range.min && 
                      filters.priceRange?.max === range.max ? 'selected' : ''
                    }`}
                    onClick={() => handlePriceSelect(range)}
                  >
                    {range.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <div 
            className="filter-select"
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          >
            <span className="filter-value">
              {filters.status === 'all' ? 'All Status' : 
               filters.status === 'active' ? 'Active' : 'Inactive'}
            </span>
            <ChevronDown size={16} className="filter-chevron" />
            {showStatusDropdown && (
              <div className="filter-dropdown">
                <div 
                  className={`filter-option ${filters.status === 'all' ? 'selected' : ''}`}
                  onClick={() => handleStatusSelect('all')}
                >
                  All Status
                </div>
                <div 
                  className={`filter-option ${filters.status === 'active' ? 'selected' : ''}`}
                  onClick={() => handleStatusSelect('active')}
                >
                  Active
                </div>
                <div 
                  className={`filter-option ${filters.status === 'inactive' ? 'selected' : ''}`}
                  onClick={() => handleStatusSelect('inactive')}
                >
                  Inactive
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="filter-group">
          <label className="filter-label">Brand</label>
          <div 
            className="filter-select"
            onClick={() => setShowBrandDropdown(!showBrandDropdown)}
          >
            <span className="filter-value">
              {filters.brand === 'all' ? 'All Brands' : filters.brand}
            </span>
            <ChevronDown size={16} className="filter-chevron" />
            {showBrandDropdown && (
              <div className="filter-dropdown">
                <div 
                  className={`filter-option ${filters.brand === 'all' ? 'selected' : ''}`}
                  onClick={() => handleBrandSelect('all')}
                >
                  All Brands
                </div>
                {brands.map(brand => (
                  <div 
                    key={brand}
                    className={`filter-option ${filters.brand === brand ? 'selected' : ''}`}
                    onClick={() => handleBrandSelect(brand)}
                  >
                    {brand}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
