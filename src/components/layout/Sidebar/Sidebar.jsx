import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, BarChart2, ShoppingCart, 
  Package, TrendingUp, MessageSquare, Settings, LogOut 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="logo-icon">K</div>
          <span className="logo-text">Kilwar</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="nav-item">
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/leaderboard" className="nav-item">
            <BarChart2 size={20} /> Leaderboard
          </NavLink>
          <NavLink to="/orders" className="nav-item">
            <ShoppingCart size={20} /> Orders
          </NavLink>
          <NavLink to="/products" className="nav-item">
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
  );
};

export default Sidebar;
