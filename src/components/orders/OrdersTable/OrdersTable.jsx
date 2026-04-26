import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, MoreHorizontal, FileText, MessageSquare, Plus } from 'lucide-react';
import './OrdersTable.css';

const OrdersTable = ({ orders }) => {
  const tabs = ['All', 'Unfulfilled', 'Unpaid', 'Open', 'Closed'];
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter orders based on active tab and search
  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Filter by tab
    if (activeTab === 'Unfulfilled') {
      filtered = filtered.filter(order => order.fulfillment === 'Unfulfilled');
    } else if (activeTab === 'Unpaid') {
      filtered = filtered.filter(order => order.payment === 'Pending');
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [orders, activeTab, searchQuery]);

  return (
    <div className="orders-table-container">
      {/* Filter & Actions Bar */}
      <div className="orders-filter-bar">
        <div className="filter-content">
          {/* Tabs */}
          <div className="orders-tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              >
                {tab === 'Closed' ? (
                  <span className="tab-with-icon">
                    {tab} <Plus size={12}/>
                  </span>
                ) : tab}
              </button>
            ))}
          </div>

          {/* Search & Icons */}
          <div className="filter-actions">
            <div className="search-wrapper">
              <Search className="search-icon-orders" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input-orders"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="action-button"><Filter size={16}/></button>
            <button className="action-button"><ArrowUpDown size={16}/></button>
            <button className="action-button"><MoreHorizontal size={16}/></button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th><input type="checkbox" className="table-checkbox" /></th>
                <th>Order</th>
                <th className="sortable-header">
                  Date <ArrowUpDown size={10}/>
                </th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Delivery</th>
                <th>Items</th>
                <th>Fulfilment</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, idx) => (
                <tr key={idx}>
                  <td><input type="checkbox" className="table-checkbox" /></td>
                  <td className="order-id">{order.id}</td>
                  <td className="order-date">{order.date}</td>
                  <td className="customer-name">{order.customer}</td>
                  <td>
                    <span className={`status-badge ${order.payment === 'Success' ? 'success' : 'pending'}`}>
                      ● {order.payment}
                    </span>
                  </td>
                  <td className="order-total">{order.total}</td>
                  <td className="delivery-status">{order.delivery}</td>
                  <td className="order-items">{order.items}</td>
                  <td>
                    <span className={`status-badge ${order.fulfillment === 'Fulfilled' ? 'fulfilled' : 'unfulfilled'}`}>
                      ● {order.fulfillment}
                    </span>
                  </td>
                  <td>
                    <div className="action-icons">
                      <FileText size={16} className="action-icon" />
                      <MessageSquare size={16} className="action-icon" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;
