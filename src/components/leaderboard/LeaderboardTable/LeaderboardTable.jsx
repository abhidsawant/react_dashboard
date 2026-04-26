import './LeaderboardTable.css';

const LeaderboardTable = ({ data }) => {
  return (
    <div className="leaderboard-table-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Won</th>
            <th>Trades</th>
            <th>Win Rate</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr 
              key={idx} 
              className={row.isUser ? 'user-row' : ''}
            >
              <td className={row.rank === '[1]' ? 'first-rank' : ''}>
                {row.rank}
              </td>
              <td className={row.isUser ? 'user-name' : ''}>
                {row.player}
              </td>
              <td>
                {row.won} <span className="currency-badge">s</span>
              </td>
              <td>{row.trades}</td>
              <td>{row.winRate}</td>
              <td>
                {row.volume} <span className="currency-badge">s</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
