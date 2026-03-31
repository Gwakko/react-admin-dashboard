import { Link } from 'react-router-dom';
import { useAuth } from '#/features/auth';
import { AuthForm } from '#/widgets/auth-form';

export default function LoginPage() {
  const { handleLogin, error, loading } = useAuth();

  return (
    <>
      <AuthForm mode="login" onSubmit={handleLogin} error={error} loading={loading} />
      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </>
  );
}
