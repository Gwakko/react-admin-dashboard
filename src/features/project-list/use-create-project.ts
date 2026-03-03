import { projectApi, useProjectStore } from '#/domain/project';
import type { CreateProjectPayload } from '#/domain/project';

export function useCreateProject() {
  const addProject = useProjectStore((s) => s.addProject);

  async function createProject(payload: CreateProjectPayload) {
    const project = await projectApi.create(payload);
    addProject(project);
    return project;
  }

  return { createProject };
}
