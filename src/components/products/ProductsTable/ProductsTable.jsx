import { ArrowUpDown } from 'lucide-react';
import './ProductsTable.css';

const ProductsTable = ({ products }) => {
  const getProgressColor = (sold, stock) => {
    const percentage = (sold / stock) * 100;
    if (percentage >= 80) return 'high';
    if (percentage >= 50) return 'medium';
    return 'low';
  };

  return (
    <div className="products-table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th className="checkbox-col">
              <input type="checkbox" className="table-checkbox" />
            </th>
            <th className="sortable-col">
              <div className="th-content">
                Product info <ArrowUpDown size={12}/>
              </div>
            </th>
            <th className="sortable-col">
              <div className="th-content">
                Price <ArrowUpDown size={12}/>
              </div>
            </th>
            <th>Stock</th>
            <th>Statistic</th>
            <th className="text-right">Active</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, idx) => (
            <tr key={idx}>
              <td>
                <input type="checkbox" className="table-checkbox" />
              </td>
              <td>
                <div className="product-info">
                  <div className="product-image">
                    {typeof item.img === 'string' && item.img.startsWith('http') ? (
                      <img src={item.img} alt={item.name} className="product-thumbnail" />
                    ) : (
                      <span className="product-emoji">{item.img}</span>
                    )}
                  </div>
                  <div className="product-details">
                    <div className="product-name" title={item.name}>
                      {item.name.length > 35 ? `${item.name.substring(0, 35)}...` : item.name}
                    </div>
                    <div className="product-id">ID : {item.id}</div>
                  </div>
                </div>
              </td>
              <td className="product-price">${item.price.toFixed(2)}</td>
              <td className="product-stock">
                <span className={item.stock < 10 ? 'low-stock' : ''}>{item.stock}</span>
              </td>
              <td className="statistic-col">
                <div className="statistic-wrapper">
                  <div className="statistic-label">
                    <span>{item.sold}/{item.stock}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${getProgressColor(item.sold, item.stock)}`}
                      style={{ width: `${Math.min((item.sold / item.stock) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </td>
              <td className="text-right">
                <button className={`toggle-switch ${item.status ? 'active' : ''}`}>
                  <div className="toggle-slider"></div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
