import { client } from '#/lib/api';
import type { Task, CreateTaskPayload } from '../types/task.types';

interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}

interface TaskDTO {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
}

function mapDTO(dto: TaskDTO): Task {
  return {
    id: dto.id,
    projectId: dto.project_id,
    title: dto.title,
    description: dto.description,
    status: dto.status as Task['status'],
    priority: dto.priority as Task['priority'],
    dueDate: dto.due_date,
    completedAt: dto.completed_at,
    createdAt: dto.created_at,
  };
}

export const taskApi = {
  list: async (projectId: number, params?: { status?: string; priority?: string; page?: number }) => {
    const { data } = await client.get<PaginatedResponse<TaskDTO>>(`/projects/${projectId}/tasks`, { params });
    return {
      ...data,
      data: data.data.map(mapDTO),
    };
  },

  get: async (projectId: number, taskId: number) => {
    const { data } = await client.get<TaskDTO>(`/projects/${projectId}/tasks/${taskId}`);
    return mapDTO(data);
  },

  create: async (projectId: number, payload: CreateTaskPayload) => {
    const { data } = await client.post<TaskDTO>(`/projects/${projectId}/tasks`, payload);
    return mapDTO(data);
  },

  update: async (projectId: number, taskId: number, payload: Partial<CreateTaskPayload & { status: string }>) => {
    const { data } = await client.put<TaskDTO>(`/projects/${projectId}/tasks/${taskId}`, payload);
    return mapDTO(data);
  },

  delete: async (projectId: number, taskId: number) => {
    await client.delete(`/projects/${projectId}/tasks/${taskId}`);
  },
};
