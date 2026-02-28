export interface Project {
  id: number;
  name: string;
  description: string | null;
  status: ProjectStatus;
  tasksCount: number;
  createdAt: string;
}

export type ProjectStatus = 'active' | 'archived' | 'completed';

export interface CreateProjectPayload {
  name: string;
  description?: string;
}
