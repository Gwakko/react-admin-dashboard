import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '#/layouts/MainLayout';
import HomePage from '#/pages/HomePage';
import ProjectsPage from '#/pages/ProjectsPage';
import TasksPage from '#/pages/TasksPage';
import LoginPage from '#/pages/LoginPage';
import RegisterPage from '#/pages/RegisterPage';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<TasksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
