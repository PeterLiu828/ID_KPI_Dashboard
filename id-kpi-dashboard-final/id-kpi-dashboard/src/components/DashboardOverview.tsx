/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Clock, AlertCircle, Target, TrendingUp, Briefcase, ChevronRight } from 'lucide-react';
import { Project } from '../types';

const COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899'];

interface DashboardOverviewProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
}

export default function DashboardOverview({ projects, onSelectProject }: DashboardOverviewProps) {
  const totalProjects = projects.length;
  const avgProgress = Math.round(projects.reduce((acc, p) => acc + p.overallProgress, 0) / totalProjects);
  
  const chartData = projects.map(p => ({
    name: p.name,
    progress: p.overallProgress,
    kpi: Math.round(p.modules.reduce((acc, m) => acc + m.kpis.reduce((kAcc, k) => kAcc + k.progress, 0) / m.kpis.length, 0) / p.modules.length)
  }));

  const stats = [
    { label: '主要專案數', value: totalProjects, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '平均進度', value: `${avgProgress}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'KPI 達成率', value: '68%', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: '待處理風險', value: '2', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Banner */}
      <div className="bg-brand-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-brand-100">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">ID KPI 總覽儀表板</h3>
            <p className="text-brand-100 max-w-md">
              目前三大核心專案 Next RK26、RS39、Mind_Free 執行狀況良好。RK26 已進入後期階段，請確保所有產出文件符合 KPI 標準。
            </p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-brand-200 text-xs font-bold uppercase tracking-widest mb-1">總體平均進度</p>
              <p className="text-5xl font-black">{avgProgress}%</p>
            </div>
            <div className="w-24 h-24 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-brand-700" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray={251.2} 
                  strokeDashoffset={251.2 * (1 - avgProgress / 100)} 
                  className="text-white transition-all duration-1000" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">專案進度與 KPI 對比</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="progress" name="執行進度" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="kpi" name="KPI 達成" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">專案快速切換</h3>
          <div className="space-y-3">
            {projects.map((project, i) => (
              <button 
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:border-brand-100 hover:bg-brand-50/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: COLORS[i % COLORS.length] }}>
                    {project.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{project.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{project.overallProgress}%</span>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
