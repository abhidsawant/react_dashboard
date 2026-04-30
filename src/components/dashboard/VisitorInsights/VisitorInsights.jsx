import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './VisitorInsights.css';

const VisitorInsights = ({ data }) => {
  return (
    <div className="visitor-insights">
      <h2 className="insights-title">Visitor Insights</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 10, fill: '#A0AEC0'}} 
            />
            <Tooltip 
              contentStyle={{ 
                background: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line type="monotone" dataKey="loyal" stroke="#8B5CF6" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="new" stroke="#EF4444" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="unique" stroke="#10B981" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-legend">
        <span className="legend-item">
          <div className="legend-dot purple"></div> Loyal Customers
        </span>
        <span className="legend-item">
          <div className="legend-dot red"></div> New Customers
        </span>
        <span className="legend-item">
          <div className="legend-dot green"></div> Unique Customers
        </span>
      </div>
    </div>
  );
};

export default VisitorInsights;
