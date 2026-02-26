import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-layout">
      <nav className="main-nav">
        <NavLink to="/" className="nav-brand">
          <span className="brand-icon">🩸</span> BloodBridge
        </NavLink>
        <div className="nav-links">
          <NavLink to="/app" end>Dashboard</NavLink>
          <NavLink to="/app/donors">Donors</NavLink>
          <NavLink to="/app/inventory">Inventory</NavLink>
          <NavLink to="/app/request">Request Blood</NavLink>
        </div>
        {user && (
          <div className="nav-user">
            <div className="nav-user-info">
              <span className="nav-user-name">{user.name}</span>
              <span className="nav-user-role">{user.role}</span>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
