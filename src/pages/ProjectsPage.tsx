import { useState } from 'react';
import { useProjects, useCreateProject, useDeleteProject } from '#/features/project-list';
import { ProjectTable } from '#/widgets/project-table';
import { Button } from '#/components/ui/button';

export default function ProjectsPage() {
  const [page, setPage] = useState(1);
  const { projects, isLoading, lastPage } = useProjects(page);
  const { createProject } = useCreateProject();
  const { deleteProject } = useDeleteProject();

  const handleCreate = () => {
    const name = prompt('Project name:');
    if (name) createProject({ name });
  };

  const handleDelete = (id: number) => {
    deleteProject(id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Projects</h1>
        <Button onClick={handleCreate}>+ New Project</Button>
      </header>

      <ProjectTable projects={projects} onDelete={handleDelete} />

      {lastPage > 1 && (
        <div style={{ marginTop: '1rem' }}>
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
          <span style={{ margin: '0 1rem' }}>{page} / {lastPage}</span>
          <Button variant="outline" disabled={page >= lastPage} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
}
