import { useState } from 'react';
import { BarChart2, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import SummaryCard from '../../components/dashboard/SummaryCard/SummaryCard';
import VisitorInsights from '../../components/dashboard/VisitorInsights/VisitorInsights';
import TotalRevenue from '../../components/dashboard/TotalRevenue/TotalRevenue';
import CustomerSatisfaction from '../../components/dashboard/CustomerSatisfaction/CustomerSatisfaction';
import TargetReality from '../../components/dashboard/TargetReality/TargetReality';
import TopProducts from '../../components/dashboard/TopProducts/TopProducts';
import SalesMapping from '../../components/dashboard/SalesMapping/SalesMapping';
import VolumeService from '../../components/dashboard/VolumeService/VolumeService';
import ExportModal from '../../components/common/ExportModal/ExportModal';
import { useRealtimeDashboard } from '../../hooks/useRealtimeDashboard';
import {
  exportDashboardSummaryToCSV,
  exportDashboardSummaryToExcel,
  exportDashboardSummaryToPDF,
  exportFullDashboard
} from '../../utils/exportUtils';
import './Dashboard.css';

const iconMap = {
  BarChart2: <BarChart2 size={20} className="icon-red"/>,
  ShoppingCart: <ShoppingCart size={20} className="icon-orange"/>,
  Package: <Package size={20} className="icon-green"/>,
  TrendingUp: <TrendingUp size={20} className="icon-purple"/>,
};

const Dashboard = () => {
  const { dashboardData, isLive, lastUpdated, toggleLive, refreshData } = useRealtimeDashboard(10000);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleExport = (format, type) => {
    if (type === 'summary') {
      if (format === 'csv') {
        exportDashboardSummaryToCSV(dashboardData.summary);
      } else if (format === 'excel') {
        exportDashboardSummaryToExcel(dashboardData.summary);
      } else if (format === 'pdf') {
        exportDashboardSummaryToPDF(dashboardData.summary);
      }
    } else if (type === 'full') {
      exportFullDashboard(dashboardData, format);
    }
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
            <button className="action-button export-btn" onClick={() => setIsExportModalOpen(true)}>
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

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default Dashboard;
