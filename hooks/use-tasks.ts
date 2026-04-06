import useSWR, { useSWRConfig } from 'swr';
import { projectService, Task, Project } from '../lib/services/project.service';
import { useAuthStore } from '../lib/auth-store';
import toast from 'react-hot-toast';

export function useTasks(projectId: string) {
  const { user } = useAuthStore();
  const { mutate } = useSWRConfig();

  const { data: project, error, isLoading } = useSWR<Project & { tasks: Task[] }>(
    user ? `/projects/${projectId}` : null,
    () => projectService.getProject(projectId)
  );

  const tasks: Task[] = project?.tasks ?? [];

  const createTask = async (title: string, description?: string) => {
    if (!user) return;

    const optimisticTask: Task = {
      id: Math.random().toString(),
      title,
      description,
      status: 'TODO',
      project_id: projectId,
      user_id: user.id
    };

    mutate(`/projects/${projectId}`, { ...project!, tasks: [...tasks, optimisticTask] }, false);

    try {
      await projectService.createTask(projectId, { title, description });
      toast.success('Task created!');
    } catch (err: any) {
      toast.error('Failed to create task: ' + err.message);
      mutate(`/projects/${projectId}`, project, false);
    } finally {
      mutate(`/projects/${projectId}`);
    }
  };

  const updateTask = async (taskId: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
    if (!user) return;

    const currentProject = project!;
    const updatedTasks = tasks.map((t: Task) => t.id === taskId ? { ...t, status } : t);

    mutate(`/projects/${projectId}`, { ...currentProject, tasks: updatedTasks }, false);

    try {
      await projectService.updateTask(taskId, { status });
    } catch (err: any) {
      toast.error('Failed to update task: ' + err.message);
      mutate(`/projects/${projectId}`, currentProject, false);
    } finally {
      mutate(`/projects/${projectId}`);
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!user) return;

    const currentProject = project!;
    const updatedTasks = tasks.filter((t: Task) => t.id !== taskId);

    mutate(`/projects/${projectId}`, { ...currentProject, tasks: updatedTasks }, false);

    try {
      await projectService.deleteTask(taskId);
      toast.success('Task deleted');
    } catch (err: any) {
      toast.error('Failed to delete task: ' + err.message);
      mutate(`/projects/${projectId}`, currentProject, false);
    } finally {
      mutate(`/projects/${projectId}`);
    }
  };

  return { project, tasks, error, isLoading, createTask, updateTask, deleteTask };
}
