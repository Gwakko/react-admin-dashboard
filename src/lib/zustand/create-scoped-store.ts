import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { StateCreator } from 'zustand';

export type ImmerStateCreator<T> = StateCreator<T, [['zustand/immer', never]]>;

export function createScopedStore<T>(initializer: ImmerStateCreator<T>) {
  return create<T>()(immer(initializer));
}
