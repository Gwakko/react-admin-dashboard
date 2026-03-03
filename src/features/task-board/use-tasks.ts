import { useEffect } from 'react';
import { taskApi, useTaskStore, selectTasks, selectIsLoading, selectStatusFilter } from '#/domain/task';

export function useTasks(projectId: number) {
  const tasks = useTaskStore(selectTasks);
  const isLoading = useTaskStore(selectIsLoading);
  const statusFilter = useTaskStore(selectStatusFilter);
  const setTasks = useTaskStore((s) => s.setTasks);
  const setLoading = useTaskStore((s) => s.setLoading);

  useEffect(() => {
    let cancelled = false;

    async function fetchTasks() {
      setLoading(true);
      try {
        const result = await taskApi.list(projectId, {
          status: statusFilter || undefined,
        });
        if (!cancelled) {
          setTasks(result.data);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTasks();
    return () => { cancelled = true; };
  }, [projectId, statusFilter, setTasks, setLoading]);

  return { tasks, isLoading, statusFilter };
}
