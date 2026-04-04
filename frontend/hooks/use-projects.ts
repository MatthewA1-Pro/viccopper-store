import useSWR, { useSWRConfig } from 'swr';
import { projectService, Project } from '../lib/services/project.service';
import { useAuthStore } from '../lib/auth-store';
import toast from 'react-hot-toast';

export function useProjects() {
  const { accessToken } = useAuthStore();
  const { mutate } = useSWRConfig();
  
  const { data: projects, error, isLoading } = useSWR<Project[]>(
    accessToken ? ['/projects', accessToken] : null,
    ([_, token]: [string, string]) => projectService.getProjects(token)
  );

  const createProject = async (name: string, description?: string) => {
    if (!accessToken) return;

    // Optimistic Update
    const optimisticProject: Project = {
      id: Math.random().toString(),
      name,
      description,
      updatedAt: new Date().toISOString(),
      _count: { tasks: 0 }
    };

    const currentProjects = projects || [];
    mutate(['/projects', accessToken], [...currentProjects, optimisticProject], false);

    try {
      await projectService.createProject({ name, description }, accessToken);
      toast.success('Project created!');
    } catch (err) {
      toast.error('Failed to create project');
      mutate(['/projects', accessToken], currentProjects, false);
    } finally {
      mutate(['/projects', accessToken]);
    }
  };

  const deleteProject = async (id: string) => {
    if (!accessToken) return;

    const currentProjects = projects || [];
    mutate(['/projects', accessToken], currentProjects.filter(p => p.id !== id), false);

    try {
      await projectService.deleteProject(id, accessToken);
      toast.success('Project deleted');
    } catch (err) {
      toast.error('Failed to delete project');
      mutate(['/projects', accessToken], currentProjects, false);
    } finally {
      mutate(['/projects', accessToken]);
    }
  };

  return { projects, error, isLoading, createProject, deleteProject };
}
