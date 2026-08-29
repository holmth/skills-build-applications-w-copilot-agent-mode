import { useEffect, useState } from 'react';
import api from '../api.js';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const payload = await api.getJson('/activities');
        if (activitiesEndpoint.includes('localhost')) {
          console.debug('Using localhost activities endpoint');
        }
        setActivities(api.getArrayData(payload));
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title h4 mb-3">Activities</h2>

        {loading && <p className="text-muted">Loading activities…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="list-group">
            {activities.map((activity) => (
              <div className="list-group-item" key={activity._id}>
                <div className="d-flex justify-content-between">
                  <strong>{activity.type}</strong>
                  <span className="text-muted">{activity.durationMinutes} min</span>
                </div>
                <div className="small text-muted mt-1">
                  {activity.user?.name ?? 'Unknown user'} • {activity.caloriesBurned} cal
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;
