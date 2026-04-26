import './SummaryCard.css';

const SummaryCard = ({ title, value, change, icon, bgColor }) => {
  return (
    <div className={`summary-card ${bgColor}`}>
      <div className={`summary-icon ${bgColor}`}>
        {icon}
      </div>
      <h3 className="summary-value">{value}</h3>
      <p className="summary-title">{title}</p>
      <p className="summary-change">{change}</p>
    </div>
  );
};

export default SummaryCard;
