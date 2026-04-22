/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import ModuleView from './components/ModuleView';
import ProjectStatusView from './components/ProjectStatusView';
import AnalysisView from './components/AnalysisView';
import { Bell, Search, User, ChevronDown, RefreshCw } from 'lucide-react';
import { fetchProjectsFromNotion } from './services/notionService';
import type { Project } from './types';
import { PROJECTS_DATA } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedOutput, setSelectedOutput] = useState<{ name: string; module: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [useNotion, setUseNotion] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 從 Notion 載入資料
  const loadFromNotion = async () => {
    if (!import.meta.env.VITE_NOTION_API_KEY) {
      setError('請先設定 NOTION_API_KEY 環境變數');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const notionProjects = await fetchProjectsFromNotion();
      setProjects(notionProjects);
      setUseNotion(true);
      if (notionProjects.length > 0) {
        setSelectedProjectId(notionProjects[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入 Notion 資料失敗');
      setUseNotion(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化選擇第一個專案
  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const selectedProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId) || projects[0]
  , [selectedProjectId, projects]);

  const handleOutputClick = (outputName: string, moduleName: string) => {
    setSelectedOutput({ name: outputName, module: moduleName });
    setActiveTab('analysis-detail');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview projects={projects} onSelectProject={(id) => {
          setSelectedProjectId(id);
          setActiveTab('modules');
        }} />;
      case 'modules':
        return <ModuleView project={selectedProject} onOutputClick={handleOutputClick} />;
      case 'project-status':
        return <ProjectStatusView projects={projects} />;
      case 'analysis-detail':
        return selectedOutput ? (
          <AnalysisView 
            outputName={selectedOutput.name} 
            moduleName={selectedOutput.module} 
            onBack={() => setActiveTab('modules')} 
          />
        ) : <ModuleView project={selectedProject} onOutputClick={handleOutputClick} />;
      default:
        return <DashboardOverview projects={projects} onSelectProject={setSelectedProjectId} />;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'ID KPI 總覽儀表板';
      case 'modules': return `${selectedProject?.name || ''} 模組詳情`;
      case 'project-status': return '專案執行狀態檢視';
      case 'analysis-detail': return '項目深度分析';
      default: return '儀表板';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{getTabTitle()}</h2>
              {useNotion && (
                <span className="px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full">
                  Notion 同步中
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-slate-400">ID_KPI_2026-2027 專案管理系統</p>
            {error && (
              <p className="text-sm font-medium text-red-500 mt-1">{error}</p>
            )}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={loadFromNotion}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              {isLoading ? '同步中...' : '從 Notion 同步'}
            </button>

            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="搜尋模組或 KPI..." 
                className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all w-64"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              
              <div className="h-8 w-[1px] bg-slate-200 mx-2" />

              <button className="flex items-center gap-3 p-1 pr-3 rounded-xl hover:bg-white transition-colors group">
                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-brand-100">
                  PL
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-bold text-slate-800">Project Leader</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID Department</p>
                </div>
                <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
