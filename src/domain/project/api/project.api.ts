import { client } from '#/lib/api';
import type { Project, CreateProjectPayload } from '../types/project.types';

interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}

interface ProjectDTO {
  id: number;
  name: string;
  description: string | null;
  status: string;
  tasks_count?: number;
  created_at: string;
}

function mapDTO(dto: ProjectDTO): Project {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    status: dto.status as Project['status'],
    tasksCount: dto.tasks_count ?? 0,
    createdAt: dto.created_at,
  };
}

export const projectApi = {
  list: async (page = 1) => {
    const { data } = await client.get<PaginatedResponse<ProjectDTO>>('/projects', { params: { page } });
    return {
      ...data,
      data: data.data.map(mapDTO),
    };
  },

  get: async (id: number) => {
    const { data } = await client.get<ProjectDTO>(`/projects/${id}`);
    return mapDTO(data);
  },

  create: async (payload: CreateProjectPayload) => {
    const { data } = await client.post<ProjectDTO>('/projects', payload);
    return mapDTO(data);
  },

  update: async (id: number, payload: Partial<CreateProjectPayload>) => {
    const { data } = await client.put<ProjectDTO>(`/projects/${id}`, payload);
    return mapDTO(data);
  },

  delete: async (id: number) => {
    await client.delete(`/projects/${id}`);
  },
};
