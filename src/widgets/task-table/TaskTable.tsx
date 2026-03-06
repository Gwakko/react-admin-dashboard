import type { Task } from '#/domain/task';

interface TaskTableProps {
  tasks: Task[];
  onComplete: (taskId: number) => void;
}

const PRIORITY_COLORS: Record<string, string> = {
  low: '#6b7280',
  medium: '#3b82f6',
  high: '#f59e0b',
  urgent: '#ef4444',
};

export function TaskTable({ tasks, onComplete }: TaskTableProps) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Due</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td style={{ color: PRIORITY_COLORS[task.priority] }}>{task.priority}</td>
            <td>{task.status}</td>
            <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</td>
            <td>
              {task.status !== 'done' && (
                <button onClick={() => onComplete(task.id)}>Complete</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
