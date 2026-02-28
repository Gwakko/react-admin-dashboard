import { createScopedStore, type ImmerStateCreator } from '#/lib/zustand';
import type { Project } from '../types/project.types';

interface ProjectState {
  projects: Project[];
  currentPage: number;
  lastPage: number;
  total: number;
  isLoading: boolean;

  setProjects: (projects: Project[], page: number, lastPage: number, total: number) => void;
  setLoading: (loading: boolean) => void;
  removeProject: (id: number) => void;
  addProject: (project: Project) => void;
}

interface ProjectStore extends ProjectState {}

const initializer: ImmerStateCreator<ProjectStore> = (set) => ({
  projects: [],
  currentPage: 1,
  lastPage: 1,
  total: 0,
  isLoading: false,

  setProjects: (projects, page, lastPage, total) =>
    set((state) => {
      state.projects = projects;
      state.currentPage = page;
      state.lastPage = lastPage;
      state.total = total;
    }),

  setLoading: (loading) =>
    set((state) => {
      state.isLoading = loading;
    }),

  removeProject: (id) =>
    set((state) => {
      state.projects = state.projects.filter((p) => p.id !== id);
    }),

  addProject: (project) =>
    set((state) => {
      state.projects.unshift(project);
    }),
});

export const useProjectStore = createScopedStore(initializer);
