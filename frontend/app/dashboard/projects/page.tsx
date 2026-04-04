'use client';
import { useState } from 'react';
import { useProjects } from '@/hooks/use-projects';
import { FolderKanban, Plus, Clock, MoreVertical, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import ProjectModal from '@/components/dashboard/ProjectModal';
import { formatDate } from '@/lib/utils';

export default function ProjectsPage() {
  const { projects, isLoading, createProject, deleteProject } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 6, letterSpacing: '-0.02em' }}>
            My Projects
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Organize your work into manageable containers.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={18} /> New Project
        </button>
      </div>

      {isLoading ? (
        <div style={{ 
          minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.02)', borderRadius: 20, border: '2px dashed var(--border)'
        }}>
          <p style={{ color: '#64748b' }}>Loading projects...</p>
        </div>
      ) : projects?.length === 0 ? (
        <div style={{ 
          minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.02)', borderRadius: 24, border: '2px dashed var(--border)',
          textAlign: 'center', padding: 40
        }}>
          <div style={{ 
            width: 64, height: 64, borderRadius: 16, background: 'rgba(99,102,241,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1',
            marginBottom: 24
          }}>
            <FolderKanban size={32} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>No projects yet</h2>
          <p style={{ color: '#64748b', maxWidth: 320, marginBottom: 32, lineHeight: 1.6 }}>
            Create your first project to start tracking your tasks and boosting your productivity.
          </p>
          <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
            <Plus size={18} /> Create First Project
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {projects?.map(p => (
            <div key={p.id} className="card glass-hover" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#6366f1', border: '1px solid rgba(99,102,241,0.1)'
                }}>
                  <FolderKanban size={24} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button 
                    onClick={() => deleteProject(p.id)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 6, borderRadius: 8 }}
                    className="hover-bg-red"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div>
                <Link 
                  href={`/dashboard/projects/${p.id}`}
                  style={{ fontSize: '1.125rem', fontWeight: 800, color: '#f1f5f9', textDecoration: 'none', display: 'block', marginBottom: 8 }}
                  className="hover-text-indigo"
                >
                  {p.name}
                </Link>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6, minHeight: 44, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {p.description || 'No description provided.'}
                </p>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: '0.75rem' }}>
                  <Clock size={14} />
                  <span>{formatDate(p.updated_at)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1' }}>
                    {p._count?.tasks ?? 0} Tasks
                  </span>
                  <Link href={`/dashboard/projects/${p.id}`} className="btn-link" style={{ fontSize: '0.875rem' }}>
                    Open <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmit={async (data) => createProject(data.name, data.description)}
        title="Create New Project"
      />

      <style>{`
        .hover-bg-red:hover { background: rgba(244,63,94,0.1) !important; color: #f43f5e !important; }
        .hover-text-indigo:hover { color: #6366f1 !important; }
        .btn-link { 
          color: #64748b; text-decoration: none; display: flex; gap: 4; align-items: center; font-weight: 600;
          transition: color 0.2s;
        }
        .btn-link:hover { color: #f1f5f9; }
      `}</style>
    </div>
  );
}
