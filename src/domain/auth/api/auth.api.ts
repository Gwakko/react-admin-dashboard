import client from '#/lib/api/client';
import type { LoginPayload, RegisterPayload, AuthResponse } from '../types/auth.types';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/login', payload);
  return data;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await client.post<AuthResponse>('/register', payload);
  return data;
}
