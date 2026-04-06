import React from 'react';
import { Zap, Sparkles, BarChart3, Cloud, Shield, Zap as Rocket } from 'lucide-react';

export const Features = () => {
  const items = [
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: 'Instant Scaling',
      description: 'From your first user to your first million. Our infrastructure grows with your ambition.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: 'Deep Analytics',
      description: 'Understand every user behavior with our AI-powered dashboards and heatmaps.',
    },
    {
      icon: <Cloud className="w-8 h-8 text-primary" />,
      title: 'Edge Deployment',
      description: 'Low-latency delivery across the globe using our decentralized edge server network.',
    },
  ];

  return (
    <section id="features" className="py-32 px-6 bg-black/20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight animate-fade-in">
            Platform <span className="bg-clip-text text-transparent bg-gradient-primary">Ecosystem.</span>
          </h2>
          <p className="text-xl text-muted-dark-foreground max-w-2xl mx-auto">
            Experience the future of SaaS development with our cutting-edge feature set.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="group p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow"
            >
              <div className="mb-8 p-4 w-fit rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-muted-dark-foreground leading-relaxed font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
