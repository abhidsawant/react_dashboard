import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, BarChart2, ShoppingCart, 
  Package, TrendingUp, MessageSquare, Settings, LogOut, X 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="logo-icon">K</div>
              <span className="logo-text">Kilwar</span>
            </div>
            <button className="sidebar-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <nav className="sidebar-nav">
            <NavLink to="/dashboard" className="nav-item" onClick={onClose}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            <NavLink to="/leaderboard" className="nav-item" onClick={onClose}>
              <BarChart2 size={20} /> Leaderboard
            </NavLink>
            <NavLink to="/orders" className="nav-item" onClick={onClose}>
              <ShoppingCart size={20} /> Orders
            </NavLink>
            <NavLink to="/products" className="nav-item" onClick={onClose}>
              <Package size={20} /> Products
            </NavLink>
            <a href="#" className="nav-item">
              <TrendingUp size={20} /> Sales Report
            </a>
            <a href="#" className="nav-item">
              <MessageSquare size={20} /> Messages
            </a>
            <a href="#" className="nav-item">
              <Settings size={20} /> Settings
            </a>
          </nav>
        </div>
        <div className="sidebar-footer">
          <button className="signout-button">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
