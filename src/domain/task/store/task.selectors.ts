import type { Task } from '../types/task.types';

export const selectTasks = (state: { tasks: Task[] }) => state.tasks;
export const selectIsLoading = (state: { isLoading: boolean }) => state.isLoading;
export const selectStatusFilter = (state: { statusFilter: string }) => state.statusFilter;
