import { useState, useEffect } from 'react';
import ProductFilters from '../../components/products/ProductFilters/ProductFilters';
import ProductsTable from '../../components/products/ProductsTable/ProductsTable';
import { fetchProducts } from '../../services/api';
import { 
  transformProductData, 
  getUniqueCategories, 
  getUniqueBrands,
  getPriceRanges,
  filterProducts
} from '../../utils/productHelpers';
import './Products.css';

const Products = () => {
  const [viewMode, setViewMode] = useState('list');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Filter options from API
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRanges] = useState(getPriceRanges());
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    brand: 'all',
    priceRange: null,
    status: 'all'
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = filterProducts(products, filters);
    setFilteredProducts(filtered);
  }, [products, filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProducts(30, 0);
      
      const transformedProducts = transformProductData(response.products);
      
      setProducts(transformedProducts);
      setFilteredProducts(transformedProducts);
      setTotalProducts(response.total);
      
      // Extract filter options from products
      setCategories(getUniqueCategories(transformedProducts));
      setBrands(getUniqueBrands(transformedProducts));
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleAddProduct = () => {
    console.log('Add new product clicked');
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-card">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="products-card">
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={loadProducts} className="retry-button">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-card">
        <ProductFilters 
          onAddProduct={handleAddProduct}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalProducts={totalProducts}
          categories={categories}
          brands={brands}
          priceRanges={priceRanges}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <ProductsTable products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;
