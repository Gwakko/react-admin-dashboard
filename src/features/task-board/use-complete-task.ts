import { taskApi, useTaskStore } from '#/domain/task';

export function useCompleteTask(projectId: number) {
  const updateTask = useTaskStore((s) => s.updateTask);

  async function completeTask(taskId: number) {
    const updated = await taskApi.update(projectId, taskId, { status: 'done' });
    updateTask(taskId, updated);
  }

  return { completeTask };
}
