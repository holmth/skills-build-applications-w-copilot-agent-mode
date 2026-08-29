import { useEffect, useState } from 'react';
import api from '../api.js';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const payload = await api.getJson('/leaderboard');
        if (leaderboardEndpoint.includes('localhost')) {
          console.debug('Using localhost leaderboard endpoint');
        }
        setEntries(api.getArrayData(payload));
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title h4 mb-3">Leaderboard</h2>

        {loading && <p className="text-muted">Loading leaderboard…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <ol className="list-group list-group-numbered">
            {entries.map((entry) => (
              <li key={entry._id || entry.user?._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{entry.user?.name ?? 'Unknown user'}</span>
                <span className="badge bg-primary rounded-pill">{entry.points ?? 0} pts</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
