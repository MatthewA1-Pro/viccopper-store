import useSWR, { useSWRConfig } from 'swr';
import { projectService, Project } from '../lib/services/project.service';
import { useAuthStore } from '../lib/auth-store';
import toast from 'react-hot-toast';

export function useProjects() {
  const { user } = useAuthStore();
  const { mutate } = useSWRConfig();
  
  const { data: projects, error, isLoading } = useSWR<Project[]>(
    user ? '/projects' : null,
    () => projectService.getProjects()
  );

  const createProject = async (name: string, description?: string) => {
    if (!user) return;

    // Optimistic Update
    const optimisticProject: any = {
      id: Math.random().toString(),
      name,
      description,
      updated_at: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _count: { tasks: 0 }
    };

    const currentProjects = projects || [];
    mutate('/projects', [...currentProjects, optimisticProject], false);

    try {
      await projectService.createProject({ name, description });
      toast.success('Project created!');
    } catch (err: any) {
      toast.error('Failed to create project: ' + err.message);
      mutate('/projects', currentProjects, false);
    } finally {
      mutate('/projects');
    }
  };

  const deleteProject = async (id: string) => {
    if (!user) return;

    const currentProjects = projects || [];
    mutate('/projects', currentProjects.filter(p => p.id !== id), false);

    try {
      await projectService.deleteProject(id);
      toast.success('Project deleted');
    } catch (err: any) {
      toast.error('Failed to delete project: ' + err.message);
      mutate('/projects', currentProjects, false);
    } finally {
      mutate('/projects');
    }
  };

  return { projects, error, isLoading, createProject, deleteProject };
}
