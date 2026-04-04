import { api } from '../api';

export interface Project {
  id: string;
  name: string;
  description?: string;
  _count?: { tasks: number };
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  projectId: string;
}

export const projectService = {
  // ── Projects ────────────────────────────────────────────────────────────────
  async getProjects(token: string) {
    const res = await api.get<{ projects: Project[] }>('/projects', token);
    return res.projects;
  },

  async getProject(id: string, token: string) {
    const res = await api.get<{ project: Project & { tasks: Task[] } }>(`/projects/${id}`, token);
    return res.project;
  },

  async createProject(data: { name: string; description?: string }, token: string) {
    const res = await api.post<{ project: Project }>('/projects', data, token);
    return res.project;
  },

  async deleteProject(id: string, token: string) {
    await api.delete(`/projects/${id}`, token);
  },

  // ── Tasks ───────────────────────────────────────────────────────────────────
  async createTask(projectId: string, data: { title: string; description?: string }, token: string) {
    const res = await api.post<{ task: Task }>(`/projects/${projectId}/tasks`, data, token);
    return res.task;
  },

  async updateTask(taskId: string, data: Partial<Task>, token: string) {
    const res = await api.patch<{ task: Task }>(`/api/projects/tasks/${taskId}`, data, token);
    return res.task;
  },

  async deleteTask(taskId: string, token: string) {
    await api.delete(`/api/projects/tasks/${taskId}`, token);
  },
};
