import { type FormEvent, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { Button } from '#/components/ui/button';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (payload: { email: string; password: string }) => void;
  error: string | null;
  loading: boolean;
}

export function AuthForm({ mode, onSubmit, error, loading }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ email, password });
  }

  const title = mode === 'login' ? 'Sign In' : 'Create Account';
  const buttonLabel = mode === 'login' ? 'Log In' : 'Register';

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <Label htmlFor="email" style={{ marginBottom: '0.25rem' }}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Label htmlFor="password" style={{ marginBottom: '0.25rem' }}>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Please wait...' : buttonLabel}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
