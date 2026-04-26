import './PodiumCard.css';

const PodiumCard = ({ rank, name, volume, avatar }) => {
  return (
    <div className={`podium-wrapper ${rank === 1 ? 'rank-first' : rank === 2 ? 'rank-second' : 'rank-third'}`}>
      <div className={`podium-card ${rank === 1 ? 'podium-first' : ''}`}>
        <div className="podium-rank-badge">
          <span className="rank-number">{rank}</span>
        </div>
        <div className="podium-avatar-container">
          <div className="avatar-glow"></div>
          <div className="podium-avatar">
            {avatar}
          </div>
        </div>
        <p className={`podium-name ${rank === 1 ? 'first-place' : ''}`}>
          [{rank}] {name}
        </p>
        <div className="podium-volume">
          <span className="volume-icon">Ⓢ</span>
          <span className="volume-value">{volume}</span>
        </div>
        <p className="volume-label">VOLUME</p>
      </div>
      <div className="podium-base">
        <div className="podium-base-top"></div>
        <div className="podium-base-front">
          <div className="base-rank-number">{rank}</div>
          <div className="base-grid"></div>
        </div>
        <div className="podium-base-side"></div>
      </div>
    </div>
  );
};

export default PodiumCard;
