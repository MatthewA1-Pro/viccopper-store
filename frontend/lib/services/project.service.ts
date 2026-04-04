import { createClient } from '../supabase';

export interface Project {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  updated_at: string;
  // Computed fields when joined
  _count?: { tasks: number };
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  project_id: string;
  user_id: string;
}

export const projectService = {
  // ── Projects ────────────────────────────────────────────────────────────────
  async getProjects() {
    const supabase = createClient();
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*, tasks(count)')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    
    // Transform to match existing UI
    return (projects as any[]).map(p => ({
      ...p,
      updatedAt: p.updated_at,
      _count: { tasks: p.tasks[0].count }
    })) as Project[];
  },

  async getProject(id: string) {
    const supabase = createClient();
    const { data: project, error } = await supabase
      .from('projects')
      .select('*, tasks(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return project as Project & { tasks: Task[] };
  },

  async createProject(data: { name: string; description?: string }) {
    const supabase = createClient();
    const { data: project, error } = await supabase
      .from('projects')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return project as Project;
  },

  async deleteProject(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // ── Tasks ───────────────────────────────────────────────────────────────────
  async createTask(project_id: string, data: { title: string; description?: string }) {
    const supabase = createClient();
    const { data: task, error } = await supabase
      .from('tasks')
      .insert([{ ...data, project_id }])
      .select()
      .single();

    if (error) throw error;
    return task as Task;
  },

  async updateTask(id: string, data: Partial<Task>) {
    const supabase = createClient();
    const { data: task, error } = await supabase
      .from('tasks')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return task as Task;
  },

  async deleteTask(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
