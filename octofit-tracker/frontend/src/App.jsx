import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const navItems = [
  { label: 'Users', to: '/users' },
  { label: 'Teams', to: '/teams' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Workouts', to: '/workouts' },
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase text-muted mb-1">Octofit Tracker</p>
            <h1 className="mb-0">Fitness dashboard</h1>
          </div>
        </div>

        <nav className="nav nav-pills flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
