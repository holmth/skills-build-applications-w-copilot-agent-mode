import { useEffect, useState } from 'react';
import api from '../api.js';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const payload = await api.getJson('/workouts');
        if (workoutsEndpoint.includes('localhost')) {
          console.debug('Using localhost workouts endpoint');
        }
        setWorkouts(api.getArrayData(payload));
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title h4 mb-3">Workouts</h2>

        {loading && <p className="text-muted">Loading workouts…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.name}>
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <h3 className="h5 mb-1">{workout.name}</h3>
                      <span className="badge bg-secondary">{workout.difficulty}</span>
                    </div>
                    <p className="text-muted small mb-2">{workout.category}</p>
                    <p className="mb-0">{workout.description}</p>
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

export default Workouts;
