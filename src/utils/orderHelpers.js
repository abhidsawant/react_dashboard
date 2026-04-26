// Transform API data to match our table format
export const transformOrderData = (apiOrders) => {
  // Mock customer names (since API doesn't provide them)
  const customerNames = [
    'Wade Warren',
    'Esther Howard',
    'Jenny Wilson',
    'Guy Hawkins',
    'Jacob Jones',
    'Kristin Watson',
    'Robert Fox',
    'Marvin McKinney',
    'Courtney Henry',
    'Eleanor Pena'
  ];

  return apiOrders.map((order, index) => {
    // Map API status to our payment/fulfillment status
    const getPaymentStatus = (status) => {
      if (status === 'Delivered' || status === 'Shipped') return 'Success';
      return 'Pending';
    };

    const getFulfillmentStatus = (status) => {
      if (status === 'Delivered' || status === 'Shipped') return 'Fulfilled';
      return 'Unfulfilled';
    };

    // Format date (you can customize this)
    const formatDate = () => {
      const date = new Date();
      date.setDate(date.getDate() - (apiOrders.length - index));
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return {
      id: `#${String(order.order_id).padStart(4, '0')}`,
      date: formatDate(),
      customer: customerNames[index % customerNames.length],
      payment: getPaymentStatus(order.status),
      total: `$${order.total_price.toFixed(2)}`,
      delivery: order.status === 'Delivered' ? 'Delivered' : 'N/A',
      items: `${order.items.reduce((sum, item) => sum + item.quantity, 0)} items`,
      fulfillment: getFulfillmentStatus(order.status),
      status: order.status,
      userId: order.user_id,
      rawItems: order.items
    };
  });
};

// Calculate order statistics
export const calculateOrderStats = (orders) => {
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0);
  const returnedOrders = orders.filter(order => order.status === 'Returned').length;
  const fulfilledOrders = orders.filter(order => 
    order.status === 'Delivered' || order.status === 'Shipped'
  ).length;

  return [
    { 
      label: 'Total Orders', 
      value: String(totalOrders), 
      change: '+ 25.2%', 
      color: 'orange', 
      trend: 'up' 
    },
    { 
      label: 'Order items over time', 
      value: String(totalItems), 
      change: '+ 18.2%', 
      color: 'blue', 
      trend: 'up' 
    },
    { 
      label: 'Returns Orders', 
      value: String(returnedOrders), 
      change: '- 1.2%', 
      color: 'red', 
      trend: 'down' 
    },
    { 
      label: 'Fulfilled orders over time', 
      value: String(fulfilledOrders), 
      change: '+ 12.2%', 
      color: 'green', 
      trend: 'up' 
    },
  ];
};
