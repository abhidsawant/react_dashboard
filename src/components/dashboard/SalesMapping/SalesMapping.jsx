import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { salesByCountry, countryCoordinates } from '../../../utils/mockData';
import 'leaflet/dist/leaflet.css';
import './SalesMapping.css';

const getMarkerSize = (percentage) => Math.max(15, percentage * 2);
const getMarkerColor = (percentage) => {
  if (percentage >= 20) return '#dc2626';
  if (percentage >= 15) return '#ea580c';
  if (percentage >= 10) return '#d97706';
  return '#65a30d';
};

const SalesMapping = () => {
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
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {salesByCountry
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
