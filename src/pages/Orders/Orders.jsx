import { useState, useEffect } from 'react';
import OrderStats from '../../components/orders/OrderStats/OrderStats';
import OrdersTable from '../../components/orders/OrdersTable/OrdersTable';
import OrdersToolbar from '../../components/orders/OrdersToolbar/OrdersToolbar';
import { fetchOrders } from '../../services/api';
import { transformOrderData, calculateOrderStats } from '../../utils/orderHelpers';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiOrders = await fetchOrders();
      const transformedOrders = transformOrderData(apiOrders);
      const calculatedStats = calculateOrderStats(apiOrders);
      
      setOrders(transformedOrders);
      setStats(calculatedStats);
    } catch (err) {
      setError('Failed to load orders. Please try again later.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    console.log('Export orders');
  };

  const handleCreateOrder = () => {
    console.log('Create new order');
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={loadOrders} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      {/* Action Toolbar */}
      <OrdersToolbar 
        onExport={handleExport}
        onCreateOrder={handleCreateOrder}
      />
      {/* Stats Overview */}
      <div className="orders-stats-grid">
        {stats.map((stat, index) => (
          <OrderStats 
            key={index}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            color={stat.color}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Orders Table */}
      <OrdersTable orders={orders} />
    </div>
  );
};

export default Orders;
