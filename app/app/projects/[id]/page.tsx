'use client';
import { useState } from 'react';
import { useTasks } from '@/hooks/use-tasks';
import { useParams } from 'next/navigation';
import { 
  Plus, CheckCircle2, Circle, ArrowLeft, 
  Trash2, Loader2, LayoutIcon 
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SingleProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { project, tasks, isLoading, createTask, updateTask } = useTasks(projectId);
  
  const [taskTitle, setTaskTitle] = useState('');
  const [addingTask, setAddingTask] = useState(false);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    setAddingTask(true);
    try {
      await createTask(taskTitle);
      setTaskTitle('');
    } finally {
      setAddingTask(false);
    }
  };

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE';
    await updateTask(taskId, nextStatus);
    toast.success(`Task marked as ${nextStatus.toLowerCase()}`);
  };

  if (isLoading && !project) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <Loader2 size={40} className="animate-spin" color="#6366f1" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Link href="/app/projects" className="btn-back" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#f1f5f9', marginBottom: 12, letterSpacing: '-0.03em' }}>
              {project?.name ?? 'Project Name'}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.0625rem', lineHeight: 1.6, maxWidth: 640 }}>
              {project?.description ?? 'No description provided.'}
            </p>
          </div>
          <div style={{ 
            display: 'flex', gap: 16, padding: '16px 24px', borderRadius: 20, 
            background: 'var(--bg-elevated)', border: '1px solid var(--border)' 
          }}>
            <div style={{ textAlign: 'center', padding: '0 12px' }}>
              <p style={{ color: '#475569', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Tasks</p>
              <p style={{ color: '#f1f5f9', fontSize: '1.125rem', fontWeight: 800 }}>{tasks.length}</p>
            </div>
            <div style={{ width: 1, height: 36, background: 'var(--border)' }} />
            <div style={{ textAlign: 'center', padding: '0 12px' }}>
              <p style={{ color: '#475569', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Done</p>
               <p style={{ color: '#34d399', fontSize: '1.125rem', fontWeight: 800 }}>
                 {tasks.filter((t: any) => t.status === 'DONE').length}
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Creation */}
      <div className="card" style={{ padding: 24 }}>
        <form onSubmit={handleAddTask} className="stack-mobile" style={{ display: 'flex', gap: 12 }}>
          <input 
            className="input" placeholder="What needs to be done? Enter task name..."
            value={taskTitle} onChange={e => setTaskTitle(e.target.value)}
            style={{ fontSize: '1rem', flex: 1 }}
          />
          <button type="submit" className="btn btn-primary" disabled={addingTask || !taskTitle.trim()} style={{ whiteSpace: 'nowrap', padding: '0 24px' }}>
            {addingTask ? <Loader2 size={18} className="animate-spin" /> : <><Plus size={18} /> Add Task</>}
          </button>
        </form>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px', background: 'rgba(255,255,255,0.01)', borderRadius: 24, border: '2px dashed var(--border)' }}>
            <LayoutIcon size={40} style={{ color: '#334155', marginBottom: 16 }} />
            <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>No tasks found in this project. Start by adding one above!</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item" style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px', borderRadius: 16, background: 'var(--bg-card)',
              border: '1px solid var(--border)', transition: 'all 0.2s',
              opacity: task.status === 'DONE' ? 0.7 : 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                <button 
                  onClick={() => toggleTaskStatus(task.id, task.status)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {task.status === 'DONE' 
                    ? <CheckCircle2 size={22} color="#34d399" />
                    : <Circle size={22} color="#475569" />
                  }
                </button>
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    fontSize: '1rem', fontWeight: 600, color: '#f1f5f9',
                    textDecoration: task.status === 'DONE' ? 'line-through' : 'none',
                    marginBottom: 2
                  }}>
                    {task.title}
                  </p>
                  {task.description && (
                    <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>{task.description}</p>
                  )}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ 
                  display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                  borderRadius: 20, background: 'var(--bg-elevated)', border: '1px solid var(--border)'
                }}>
                  <span className={`status-dot status-${task.status.toLowerCase().replace('_', '-')}`} />
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
                <button 
                  style={{ background: 'none', border: 'none', color: '#334155', cursor: 'pointer' }}
                  className="hover-text-red"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .btn-back:hover { color: #f1f5f9 !important; }
        .task-item:hover { border-color: rgba(99,102,241,0.3) !important; transform: translateY(-2px); box-shadow: 0 10px 20px -10px rgba(0,0,0,0.4); }
        .hover-text-red:hover { color: #f43f5e !important; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }
        .status-todo { background: #64748b; }
        .status-in-progress { background: #8b5cf6; }
        .status-done { background: #34d399; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
