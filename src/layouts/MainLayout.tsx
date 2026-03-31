import { Link, Outlet, useNavigate } from 'react-router-dom';

export function MainLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '1rem' }}>
      <nav style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ fontWeight: 'bold', marginRight: '1rem' }}>Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <button
          type="button"
          onClick={handleLogout}
          style={{ marginLeft: 'auto', padding: '0.25rem 0.75rem', cursor: 'pointer' }}
        >
          Logout
        </button>
      </nav>
      <Outlet />
    </div>
  );
}
