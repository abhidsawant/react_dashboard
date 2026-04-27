import { topProductsData } from '../../../utils/mockData';
import './TopProducts.css';

const TopProducts = () => {
  // Color schemes for each product
  const colorSchemes = [
    { bar: '#3b82f6', bg: '#eff6ff', badge: '#3b82f6', badgeBg: '#dbeafe' }, // Blue
    { bar: '#10b981', bg: '#f0fdf4', badge: '#10b981', badgeBg: '#d1fae5' }, // Green
    { bar: '#8b5cf6', bg: '#f5f3ff', badge: '#8b5cf6', badgeBg: '#ede9fe' }, // Purple
    { bar: '#f59e0b', bg: '#fffbeb', badge: '#f59e0b', badgeBg: '#fef3c7' }, // Orange
    { bar: '#ef4444', bg: '#fef2f2', badge: '#ef4444', badgeBg: '#fee2e2' }, // Red
    { bar: '#06b6d4', bg: '#ecfeff', badge: '#06b6d4', badgeBg: '#cffafe' }, // Cyan
    { bar: '#ec4899', bg: '#fdf2f8', badge: '#ec4899', badgeBg: '#fce7f3' }, // Pink
    { bar: '#84cc16', bg: '#f7fee7', badge: '#84cc16', badgeBg: '#ecfccb' }, // Lime
    { bar: '#6366f1', bg: '#eef2ff', badge: '#6366f1', badgeBg: '#e0e7ff' }, // Indigo
    { bar: '#f97316', bg: '#fff7ed', badge: '#f97316', badgeBg: '#ffedd5' }, // Orange-Red
  ];

  return (
    <div className="chart-card top-products-card">
      <h2 className="card-title">Top Products</h2>
      
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr className="table-header">
              <th className="header-index">#</th>
              <th className="header-name">Name</th>
              <th className="header-popularity">Popularity</th>
              <th className="header-sales">Sales</th>
            </tr>
          </thead>
          <tbody className="products-list">
            {topProductsData.map((product, index) => {
              const colors = colorSchemes[index % colorSchemes.length];
              return (
                <tr key={product.id} className="product-row">
                  <td className="product-index">
                    {String(product.id).padStart(2, '0')}
                  </td>
                  <td className="product-name-wrapper">
                    <span className="product-name" title={product.name}>
                      {product.name}
                    </span>
                  </td>
                  <td className="product-popularity">
                    <div 
                      className="popularity-track"
                      style={{ backgroundColor: colors.bg }}
                    >
                      <div 
                        className="popularity-bar"
                        style={{ 
                          width: `${product.popularity}%`,
                          backgroundColor: colors.bar
                        }}
                      ></div>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="product-sales"
                      style={{ 
                        color: colors.badge,
                        backgroundColor: colors.badgeBg,
                        borderColor: colors.badge
                      }}
                    >
                      {product.sales}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
