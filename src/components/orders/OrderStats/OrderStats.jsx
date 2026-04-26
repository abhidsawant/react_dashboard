import { TrendingUp, TrendingDown } from 'lucide-react';
import './OrderStats.css';

const OrderStats = ({ label, value, change, color, trend }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className={`order-stat-card stat-${color}`}>
      <div className="stat-header">
        <div className={`stat-icon-wrapper ${color}`}>
          {isPositive ? (
            <TrendingUp size={20} className="stat-icon" />
          ) : (
            <TrendingDown size={20} className="stat-icon" />
          )}
        </div>
        <p className="stat-label">{label}</p>
      </div>
      
      <div className="stat-content">
        <div className="stat-info">
          <h3 className="stat-value">{value}</h3>
          <div className="stat-change-wrapper">
            <span className={`stat-change ${color} ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '↑' : '↓'} {change}
            </span>
            <span className="stat-period">vs last week</span>
          </div>
        </div>
        
        <div className="stat-chart">
          <svg viewBox="0 0 100 40" className="mini-chart">
            {/* Sparkline path - you can make this dynamic */}
            <path
              d={isPositive 
                ? "M 0 35 Q 25 30, 50 20 T 100 5"
                : "M 0 5 Q 25 15, 50 25 T 100 35"
              }
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`chart-line ${color}`}
            />
            {/* Gradient fill under line */}
            <path
              d={isPositive 
                ? "M 0 35 Q 25 30, 50 20 T 100 5 L 100 40 L 0 40 Z"
                : "M 0 5 Q 25 15, 50 25 T 100 35 L 100 40 L 0 40 Z"
              }
              fill="currentColor"
              className={`chart-fill ${color}`}
              opacity="0.2"
            />
          </svg>
        </div>
      </div>
      
      {/* Progress bar at bottom */}
      <div className="stat-progress">
        <div className={`stat-progress-bar ${color}`} style={{ width: `${Math.min(parseInt(value) * 5, 100)}%` }}></div>
      </div>
    </div>
  );
};

export default OrderStats;
