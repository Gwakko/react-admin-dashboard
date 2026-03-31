import { Link } from 'react-router-dom';
import { useAuth } from '#/features/auth';
import { AuthForm } from '#/widgets/auth-form';

export default function RegisterPage() {
  const { handleRegister, error, loading } = useAuth();

  return (
    <>
      <AuthForm mode="register" onSubmit={handleRegister} error={error} loading={loading} />
      <p style={{ textAlign: 'center' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </>
  );
}
