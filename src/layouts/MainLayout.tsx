import { Link, Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '1rem' }}>
      <nav style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        <Link to="/" style={{ fontWeight: 'bold', marginRight: '1rem' }}>Dashboard</Link>
        <Link to="/projects">Projects</Link>
      </nav>
      <Outlet />
    </div>
  );
}
