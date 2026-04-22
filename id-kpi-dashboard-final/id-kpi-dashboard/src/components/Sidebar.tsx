/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, ClipboardCheck, Settings, BarChart3, ChevronRight, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: '總覽儀表板', icon: LayoutDashboard },
    { id: 'modules', label: '專案模組詳情', icon: Target },
    { id: 'project-status', label: '專案執行狀態', icon: ClipboardCheck },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-100">
            <BarChart3 size={18} />
          </div>
          <h1 className="font-bold text-slate-800 tracking-tight">ID_KPI 2026</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className={activeTab === item.id ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'} />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {activeTab === item.id && (
              <motion.div layoutId="active-pill" className="w-1.5 h-1.5 bg-brand-600 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase text-slate-400">總體進度</span>
            <span className="text-xs font-bold text-brand-600">65%</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand-500 h-full rounded-full" style={{ width: '65%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
