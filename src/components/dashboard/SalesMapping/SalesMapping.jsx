import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './SalesMapping.css';

const countryCoordinates = {
  'United States': [37.0902, -95.7129],
  'Brazil': [-14.2350, -51.9253],
  'Australia': [-25.2744, 133.7751],
  'India': [20.5937, 78.9629],
  'China': [35.8617, 104.1954],
  'United Kingdom': [55.3781, -3.4360],
  'Germany': [51.1657, 10.4515],
  'Japan': [36.2048, 138.2529],
  'Canada': [56.1304, -106.3468],
  'France': [46.2276, 2.2137],
  'South Africa': [-30.5595, 22.9375],
};

const getMarkerSize = (percentage) => Math.max(15, percentage * 2);
const getMarkerColor = (percentage) => {
  if (percentage >= 20) return '#dc2626';
  if (percentage >= 15) return '#ea580c';
  if (percentage >= 10) return '#d97706';
  return '#65a30d';
};

const SalesMapping = ({ data }) => {
  return (
    <div className="chart-card">
      <h2 className="card-title">Sales Mapping by Country</h2>
      
      <div className="leaflet-map-container">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {data
            .filter(item => countryCoordinates[item.country])
            .map((item, index) => (
              <CircleMarker
                key={index}
                center={countryCoordinates[item.country]}
                radius={getMarkerSize(item.percentage)}
                pathOptions={{
                  color: '#ffffff',
                  weight: 3,
                  fillColor: getMarkerColor(item.percentage),
                  fillOpacity: 0.8
                }}
              >
                <Popup>
                  <div className="popup-content">
                    <h4>{item.country}</h4>
                    <p>Sales: ${item.sales.toLocaleString()}</p>
                    <p>Percentage: {item.percentage}%</p>
                  </div>
                </Popup>
                <Tooltip permanent direction="top" offset={[0, -10]}>
                  <span className="tooltip-text">{item.percentage}%</span>
                </Tooltip>
              </CircleMarker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SalesMapping;
