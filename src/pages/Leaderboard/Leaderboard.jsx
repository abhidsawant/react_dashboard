import PodiumCard from '../../components/leaderboard/PodiumCard/PodiumCard';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable/LeaderboardTable';
import { topThreeData, leaderboardTableData } from '../../utils/leaderboardData';
import './Leaderboard.css';

const Leaderboard = () => {
  return (
    <div className="leaderboard-page">
      {/* Header */}
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">LEADERBOARD</h1>
        <p className="leaderboard-subtitle">
          Provide liquidity to the house by purchasing $DGN and <br />
          earning yield from the losses of the players.
        </p>
      </div>

      {/* Podium Section */}
      <div className="podium-container">
        {topThreeData.map((player) => (
          <PodiumCard 
            key={player.rank}
            rank={player.rank}
            name={player.name}
            volume={player.volume}
            avatar={player.avatar}
          />
        ))}
      </div>

      {/* Table Section */}
      <LeaderboardTable data={leaderboardTableData} />
    </div>
  );
};

export default Leaderboard;
