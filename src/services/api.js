import axios from 'axios';

const API_BASE_URL = 'https://fake-store-api.mock.beeceptor.com/api';
const PRODUCTS_API_URL = 'https://dummyjson.com';

// Create axios instance for orders
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance for products
const productsApiClient = axios.create({
  baseURL: PRODUCTS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch orders
export const fetchOrders = async () => {
  try {
    const response = await apiClient.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Fetch products
export const fetchProducts = async (limit = 30, skip = 0) => {
  try {
    const response = await productsApiClient.get('/products', {
      params: { limit, skip }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default apiClient;
