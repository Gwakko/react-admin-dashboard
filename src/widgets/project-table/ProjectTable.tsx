import { Link } from 'react-router-dom';
import type { Project } from '#/domain/project';

interface ProjectTableProps {
  projects: Project[];
  onDelete: (id: number) => void;
}

export function ProjectTable({ projects, onDelete }: ProjectTableProps) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Tasks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.status}</td>
            <td>{project.tasksCount}</td>
            <td>
              <button onClick={() => onDelete(project.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
