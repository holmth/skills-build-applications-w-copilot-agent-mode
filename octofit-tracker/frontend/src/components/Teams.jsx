import { useEffect, useState } from 'react';
import api from '../api.js';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const payload = await api.getJson('/teams');
        if (teamsEndpoint.includes('localhost')) {
          console.debug('Using localhost teams endpoint');
        }
        setTeams(api.getArrayData(payload));
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title h4 mb-3">Teams</h2>

        {loading && <p className="text-muted">Loading teams…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {teams.map((team) => (
              <div className="col-md-6" key={team._id || team.name}>
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h3 className="h5">{team.name}</h3>
                    <p className="mb-0 text-muted">
                      {Array.isArray(team.members) ? team.members.length : 0} members
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
