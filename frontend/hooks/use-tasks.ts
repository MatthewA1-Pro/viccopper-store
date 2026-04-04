import useSWR, { useSWRConfig } from 'swr';
import { projectService, Task } from '../lib/services/project.service';
import { useAuthStore } from '../lib/auth-store';
import toast from 'react-hot-toast';

export function useTasks(projectId: string) {
  const { accessToken } = useAuthStore();
  const { mutate } = useSWRConfig();

  const { data: project, error, isLoading } = useSWR<Project & { tasks: Task[] }>(
    accessToken ? [`/projects/${projectId}`, accessToken] : null,
    ([_, token]: [string, string]) => projectService.getProject(projectId, token)
  );

  const tasks = project?.tasks ?? [];

  const createTask = async (title: string, description?: string) => {
    if (!accessToken) return;

    const optimisticTask: Task = {
      id: Math.random().toString(),
      title,
      description,
      status: 'TODO',
      projectId,
    };

    mutate([`/projects/${projectId}`, accessToken], { ...project!, tasks: [...tasks, optimisticTask] }, false);

    try {
      await projectService.createTask(projectId, { title, description }, accessToken);
      toast.success('Task created!');
    } catch (err) {
      toast.error('Failed to create task');
      mutate([`/projects/${projectId}`, accessToken], project, false);
    } finally {
      mutate([`/projects/${projectId}`, accessToken]);
    }
  };

  const updateTask = async (taskId: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
    if (!accessToken) return;

    const currentProject = project!;
    const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, status } : t);

    mutate([`/projects/${projectId}`, accessToken], { ...currentProject, tasks: updatedTasks }, false);

    try {
      await projectService.updateTask(taskId, { status }, accessToken);
    } catch (err) {
      toast.error('Failed to update task');
      mutate([`/projects/${projectId}`, accessToken], currentProject, false);
    } finally {
      mutate([`/projects/${projectId}`, accessToken]);
    }
  };

  return { project, tasks, error, isLoading, createTask, updateTask };
}
