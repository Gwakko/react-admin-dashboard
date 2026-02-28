import type { Project } from '../types/project.types';

export const selectProjects = (state: { projects: Project[] }) => state.projects;
export const selectIsLoading = (state: { isLoading: boolean }) => state.isLoading;
export const selectCurrentPage = (state: { currentPage: number }) => state.currentPage;
export const selectLastPage = (state: { lastPage: number }) => state.lastPage;
