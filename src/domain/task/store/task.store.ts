import { createScopedStore, type ImmerStateCreator } from '#/lib/zustand';
import type { Task } from '../types/task.types';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  statusFilter: string;

  setTasks: (tasks: Task[]) => void;
  setLoading: (loading: boolean) => void;
  setStatusFilter: (status: string) => void;
  updateTask: (taskId: number, updates: Partial<Task>) => void;
  addTask: (task: Task) => void;
}

interface TaskStore extends TaskState {}

const initializer: ImmerStateCreator<TaskStore> = (set) => ({
  tasks: [],
  isLoading: false,
  statusFilter: '',

  setTasks: (tasks) =>
    set((state) => {
      state.tasks = tasks;
    }),

  setLoading: (loading) =>
    set((state) => {
      state.isLoading = loading;
    }),

  setStatusFilter: (status) =>
    set((state) => {
      state.statusFilter = status;
    }),

  updateTask: (taskId, updates) =>
    set((state) => {
      const idx = state.tasks.findIndex((t) => t.id === taskId);
      if (idx !== -1) {
        Object.assign(state.tasks[idx], updates);
      }
    }),

  addTask: (task) =>
    set((state) => {
      state.tasks.unshift(task);
    }),
});

export const useTaskStore = createScopedStore(initializer);
