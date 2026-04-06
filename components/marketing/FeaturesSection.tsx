'use client';
import { Zap, Shield, BarChart3, Globe, Lock, Rocket, Bell, RefreshCw, Users } from 'lucide-react';

const FEATURES = [
  {
    icon: <BarChart3 size={24} />, color: '#6366f1',
    title: 'Real-time Analytics',
    desc: 'Get granular insights with live dashboards, custom reports, and predictive analytics powered by AI.',
  },
  {
    icon: <Shield size={24} />, color: '#8b5cf6',
    title: 'Enterprise Security',
    desc: 'SOC 2 Type II certified. End-to-end encryption, SSO, RBAC, and audit logs built-in from day one.',
  },
  {
    icon: <Zap size={24} />, color: '#22d3ee',
    title: 'Workflow Automation',
    desc: 'Build powerful automations with our visual flow builder. No code required, infinite possibilities.',
  },
  {
    icon: <Globe size={24} />, color: '#34d399',
    title: 'Global CDN',
    desc: 'Lightning-fast delivery with 99.99% uptime SLA across 40+ edge locations worldwide.',
  },
  {
    icon: <Users size={24} />, color: '#f59e0b',
    title: 'Team Collaboration',
    desc: 'Real-time collaboration, roles & permissions, shared workspaces, and threaded comments.',
  },
  {
    icon: <RefreshCw size={24} />, color: '#f43f5e',
    title: 'API-First Design',
    desc: 'Robust REST and GraphQL APIs with webhooks, SDKs for 10+ languages, and OpenAPI docs.',
  },
  {
    icon: <Bell size={24} />, color: '#6366f1',
    title: 'Smart Notifications',
    desc: 'Intelligent alerting via Slack, email, SMS, and PagerDuty. Never miss a critical event.',
  },
  {
    icon: <Lock size={24} />, color: '#8b5cf6',
    title: 'Compliance Ready',
    desc: 'GDPR, HIPAA, and CCPA compliance tools built-in. Data residency controls for every region.',
  },
  {
    icon: <Rocket size={24} />, color: '#22d3ee',
    title: 'One-click Deploy',
    desc: 'Deploy to any cloud provider in seconds. Docker, Kubernetes, or our managed cloud — your choice.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="badge badge-indigo" style={{ marginBottom: 16 }}>Features</span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800,
            letterSpacing: '-0.02em', marginBottom: 16,
          }}>
            Everything you need to{' '}
            <span className="text-gradient">move fast</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: 560, margin: '0 auto', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            From prototype to production in record time. NovaSaaS handles the infrastructure
            so your team can focus on what matters.
          </p>
        </div>

        {/* Grid */}
        <div className="responsive-grid">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="card glass-hover"
              style={{
                display: 'flex', flexDirection: 'column', gap: 14,
                animation: `fade-up 0.5s ease ${i * 0.05}s both`,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${f.color}1a`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: f.color,
                border: `1px solid ${f.color}30`,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#f1f5f9' }}>{f.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
