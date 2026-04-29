// Transform API data to match our table format
export const transformProductData = (apiProducts) => {
  return apiProducts.map((product) => {
    const soldPercentage = Math.random() * 0.9 + 0.1;
    const sold = Math.floor(product.stock * soldPercentage);

    return {
      id: product.sku || `P${product.id}`,
      name: product.title,
      price: product.price,
      stock: product.stock,
      sold: sold,
      status: product.availabilityStatus !== 'Out of Stock',
      category: product.category,
      img: product.thumbnail || '📦',
      brand: product.brand,
      rating: product.rating,
      description: product.description,
      images: product.images,
      discountPercentage: product.discountPercentage,
      availabilityStatus: product.availabilityStatus
    };
  });
};

// Calculate product statistics
export const calculateProductStats = (products) => {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockProducts = products.filter(product => product.stock < 10).length;
  const activeProducts = products.filter(product => product.status).length;

  return {
    totalProducts,
    totalStock,
    lowStockProducts,
    activeProducts
  };
};

// Extract unique categories from products
export const getUniqueCategories = (products) => {
  const categories = [...new Set(products.map(p => p.category))];
  return categories.sort();
};

// Extract unique brands from products
export const getUniqueBrands = (products) => {
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
  return brands.sort();
};

// Generate price ranges
export const getPriceRanges = () => {
  return [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: 'Over $1000', min: 1000, max: Infinity }
  ];
};

// Filter products based on criteria
export const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Search filter
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    // Brand filter
    if (filters.brand && filters.brand !== 'all' && product.brand !== filters.brand) {
      return false;
    }

    // Price filter
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      if (filters.status === 'active' && !product.status) return false;
      if (filters.status === 'inactive' && product.status) return false;
    }

    return true;
  });
};
