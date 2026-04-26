import axios from 'axios';

const API_BASE_URL = 'https://fake-store-api.mock.beeceptor.com/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
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
    return;
  }
};

export default apiClient;
