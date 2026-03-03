import { projectApi, useProjectStore } from '#/domain/project';

export function useDeleteProject() {
  const removeProject = useProjectStore((s) => s.removeProject);

  async function deleteProject(id: number) {
    await projectApi.delete(id);
    removeProject(id);
  }

  return { deleteProject };
}
