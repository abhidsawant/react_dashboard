import { BarChart2, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import SummaryCard from '../../components/dashboard/SummaryCard/SummaryCard';
import VisitorInsights from '../../components/dashboard/VisitorInsights/VisitorInsights';
import TotalRevenue from '../../components/dashboard/TotalRevenue/TotalRevenue';
import CustomerSatisfaction from '../../components/dashboard/CustomerSatisfaction/CustomerSatisfaction';
import TargetReality from '../../components/dashboard/TargetReality/TargetReality';
import TopProducts from '../../components/dashboard/TopProducts/TopProducts';
import SalesMapping from '../../components/dashboard/SalesMapping/SalesMapping';
import VolumeService from '../../components/dashboard/VolumeService/VolumeService';
import { useRealtimeDashboard } from '../../hooks/useRealtimeDashboard';
import './Dashboard.css';

const iconMap = {
  BarChart2: <BarChart2 size={20} className="icon-red"/>,
  ShoppingCart: <ShoppingCart size={20} className="icon-orange"/>,
  Package: <Package size={20} className="icon-green"/>,
  TrendingUp: <TrendingUp size={20} className="icon-purple"/>,
};

const Dashboard = () => {
  const { dashboardData, isLive, lastUpdated, toggleLive, refreshData } = useRealtimeDashboard(5000);

  const handleExport = () => {
    const dataToExport = {
      summary: dashboardData.summary,
      timestamp: new Date().toISOString()
    };
    console.log('Exporting data:', dataToExport);
    alert('Export functionality - Data logged to console');
  };

  return (
    <div className="dashboard">
      {/* Today's Sales Section */}
      <div className="sales-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Today's Sales</h2>
            <p className="section-subtitle">
              Sales Summary {isLive && '• Live'} • Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <div className="button-group">
            <button className="action-button export-btn" onClick={handleExport}>
              Export
            </button>
            <button className="action-button pause-btn" onClick={toggleLive}>
              {isLive ? 'Pause' : 'Resume'}
            </button>
            <button className="action-button refresh-btn" onClick={refreshData}>
              Refresh
            </button>
          </div>
        </div>
        <div className="summary-grid"> 
          {dashboardData.summary.map((data, index) => (
            <SummaryCard 
              key={index} 
              {...data} 
              icon={iconMap[data.iconType]}
            />
          ))}
        </div>
      </div>

      {/* Pass data to child components */}
      <VisitorInsights data={dashboardData.visitors} />
      <TotalRevenue data={dashboardData.revenue} />
      <CustomerSatisfaction data={dashboardData.satisfaction} />
      <TargetReality data={dashboardData.targetReality} />
      <TopProducts data={dashboardData.topProducts} />
      <SalesMapping data={dashboardData.salesByCountry} />
      <VolumeService data={dashboardData.volumeService} />
    </div>
  );
};

export default Dashboard;
