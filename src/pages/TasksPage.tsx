import { useParams } from 'react-router-dom';
import { useTasks, useCompleteTask } from '#/features/task-board';
import { useTaskStore } from '#/domain/task';
import { TaskTable, StatusFilter } from '#/widgets/task-table';

export default function TasksPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const id = Number(projectId);

  const { tasks, isLoading, statusFilter } = useTasks(id);
  const { completeTask } = useCompleteTask(id);
  const setStatusFilter = useTaskStore((s) => s.setStatusFilter);

  const handleComplete = (taskId: number) => {
    completeTask(taskId);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Tasks</h1>

      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <StatusFilter current={statusFilter} onChange={setStatusFilter} />
      </div>

      <TaskTable tasks={tasks} onComplete={handleComplete} />
    </div>
  );
}
