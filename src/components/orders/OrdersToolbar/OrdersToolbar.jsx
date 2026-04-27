import { useState } from 'react';
import { Calendar, Upload, Plus, ChevronDown } from 'lucide-react';
import './OrdersToolbar.css';

const OrdersToolbar = ({ onExport, onCreateOrder }) => {
  const [showMoreActions, setShowMoreActions] = useState(false);

  const handleMoreAction = (action) => {
    console.log(`Action: ${action}`);
    setShowMoreActions(false);
  };

  return (
    <div className="orders-toolbar">
      <div className="toolbar-left">
        <div className="date-range-picker">
          <Calendar size={18} className="calendar-icon" />
          <span className="date-range-text">Jan 1 - Jan 30, 2024</span>
          <ChevronDown size={16} className="chevron-icon" />
        </div>
      </div>

      <div className="toolbar-right">
        <button className="toolbar-btn export-btn" onClick={onExport}>
          <Upload size={18} />
          <span>Export</span>
        </button>

        <div className="more-actions-wrapper">
          <button 
            className="toolbar-btn more-actions-btn"
            onClick={() => setShowMoreActions(!showMoreActions)}
          >
            <span>More actions</span>
            <ChevronDown size={16} />
          </button>
          {showMoreActions && (
            <div className="more-actions-dropdown">
              <button 
                className="dropdown-item"
                onClick={() => handleMoreAction('bulk-edit')}
              >
                Bulk Edit
              </button>
              <button 
                className="dropdown-item"
                onClick={() => handleMoreAction('delete')}
              >
                Delete Selected
              </button>
              <button 
                className="dropdown-item"
                onClick={() => handleMoreAction('mark-shipped')}
              >
                Mark as Shipped
              </button>
            </div>
          )}
        </div>

        <button className="toolbar-btn create-order-btn" onClick={onCreateOrder}>
          <Plus size={18} />
          <span>Create order</span>
        </button>
      </div>
    </div>
  );
};

export default OrdersToolbar;
