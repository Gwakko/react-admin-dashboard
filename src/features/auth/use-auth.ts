import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '#/domain/auth';
import type { LoginPayload, RegisterPayload } from '#/domain/auth';

export function useAuth() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(payload: LoginPayload) {
    setError(null);
    setLoading(true);
    try {
      const res = await login(payload);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(payload: RegisterPayload) {
    setError(null);
    setLoading(true);
    try {
      const res = await register(payload);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return { handleLogin, handleRegister, logout, error, loading };
}
