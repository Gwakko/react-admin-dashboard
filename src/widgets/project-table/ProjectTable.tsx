import { Link } from 'react-router-dom';
import type { Project } from '#/domain/project';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '#/components/ui/table';
import { Button } from '#/components/ui/button';

interface ProjectTableProps {
  projects: Project[];
  onDelete: (id: number) => void;
}

export function ProjectTable({ projects, onDelete }: ProjectTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tasks</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </TableCell>
            <TableCell>{project.status}</TableCell>
            <TableCell>{project.tasksCount}</TableCell>
            <TableCell>
              <Button variant="destructive" onClick={() => onDelete(project.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
