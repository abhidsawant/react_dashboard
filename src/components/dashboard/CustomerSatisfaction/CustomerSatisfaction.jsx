import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { satisfactionData } from '../../../utils/dashboardData';
import './CustomerSatisfaction.css';

const CustomerSatisfaction = () => {
  // Calculate totals
  const lastMonthTotal = satisfactionData.reduce((sum, item) => sum + item.lastMonth, 0);
  const thisMonthTotal = satisfactionData.reduce((sum, item) => sum + item.thisMonth, 0);

  return (
    <div className="chart-card">
      <div className="satisfaction-header">
        <h2 className="card-title">Customer Satisfaction</h2>
        <div className="satisfaction-legend">
          <span className="legend-item">
            <div className="legend-dot last-month"></div>
            <div className="legend-text">
              <span className="legend-label">Last Month</span>
              <span className="legend-count">{lastMonthTotal}</span>
            </div>
          </span>
          <span className="legend-item">
            <div className="legend-dot this-month"></div>
            <div className="legend-text">
              <span className="legend-label">This Month</span>
              <span className="legend-count">{thisMonthTotal}</span>
            </div>
          </span>
        </div>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={satisfactionData} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorThisMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="lastMonth" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorLastMonth)" 
            />
            <Area 
              type="monotone" 
              dataKey="thisMonth" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorThisMonth)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;
