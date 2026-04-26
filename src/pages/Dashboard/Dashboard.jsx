import { BarChart2, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import SummaryCard from '../../components/dashboard/SummaryCard/SummaryCard';
import VisitorInsights from '../../components/dashboard/VisitorInsights/VisitorInsights';
import TotalRevenue from '../../components/dashboard/TotalRevenue/TotalRevenue';
import CustomerSatisfaction from '../../components/dashboard/CustomerSatisfaction/CustomerSatisfaction';
import TargetReality from '../../components/dashboard/TargetReality/TargetReality';
import TopProducts from '../../components/dashboard/TopProducts/TopProducts';
import SalesMapping from '../../components/dashboard/SalesMapping/SalesMapping';
import VolumeService from '../../components/dashboard/VolumeService/VolumeService';
import { summaryData } from '../../utils/mockData';
import './Dashboard.css';

const iconMap = {
  BarChart2: <BarChart2 size={20} className="icon-red"/>,
  ShoppingCart: <ShoppingCart size={20} className="icon-orange"/>,
  Package: <Package size={20} className="icon-green"/>,
  TrendingUp: <TrendingUp size={20} className="icon-purple"/>,
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Today's Sales Section */}
      <div className="sales-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Today's Sales</h2>
            <p className="section-subtitle">Sales Summary</p>
          </div>
          <div className="export-button-wrapper">
            <button className="export-button">Export</button>    
            <span className="tooltip">Export Today's Sales Data</span>
          </div>
        </div>
        <div className="summary-grid"> 
          {summaryData.map((data, index) => (
            <SummaryCard 
              key={index} 
              {...data} 
              icon={iconMap[data.iconType]}
            />
          ))}
        </div>
      </div>

      {/* Visitor Insights */}
      <VisitorInsights />

      {/* Charts Row 2 */}
      <TotalRevenue />
      <CustomerSatisfaction />
      <TargetReality />

      {/* Charts Row 3 */}
      <TopProducts />
      <SalesMapping />
      <VolumeService />
    </div>
  );
};

export default Dashboard;
