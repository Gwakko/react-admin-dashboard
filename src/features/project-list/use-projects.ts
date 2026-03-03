import { useEffect } from 'react';
import { projectApi, useProjectStore, selectProjects, selectIsLoading, selectCurrentPage, selectLastPage } from '#/domain/project';

export function useProjects(page = 1) {
  const projects = useProjectStore(selectProjects);
  const isLoading = useProjectStore(selectIsLoading);
  const currentPage = useProjectStore(selectCurrentPage);
  const lastPage = useProjectStore(selectLastPage);
  const setProjects = useProjectStore((s) => s.setProjects);
  const setLoading = useProjectStore((s) => s.setLoading);

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      setLoading(true);
      try {
        const result = await projectApi.list(page);
        if (!cancelled) {
          setProjects(result.data, result.current_page, result.last_page, result.total);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProjects();
    return () => { cancelled = true; };
  }, [page, setProjects, setLoading]);

  return { projects, isLoading, currentPage, lastPage };
}
