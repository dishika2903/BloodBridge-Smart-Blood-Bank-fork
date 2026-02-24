import { Outlet, NavLink } from 'react-router-dom';

export default function Layout() {
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
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
