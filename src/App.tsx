import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '#/layouts/MainLayout';
import HomePage from '#/pages/HomePage';
import ProjectsPage from '#/pages/ProjectsPage';
import TasksPage from '#/pages/TasksPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<TasksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
