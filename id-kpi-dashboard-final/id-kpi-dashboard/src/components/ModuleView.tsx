/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Target, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ArrowRight,
  Info,
  ShieldCheck,
  Circle
} from 'lucide-react';
import { Project } from '../types';

interface ModuleViewProps {
  project: Project;
  onOutputClick: (outputName: string, moduleName: string) => void;
}

export default function ModuleView({ project, onOutputClick }: ModuleViewProps) {
  const [selectedModule, setSelectedModule] = useState(project.modules[0]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'In Progress': return <Clock size={16} className="text-amber-500" />;
      case 'Pending': return <Circle size={16} className="text-slate-300" />;
      case 'Delayed': return <AlertCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
      {/* Sidebar List */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">模組清單 ({project.name})</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {project.modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setSelectedModule(module)}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                selectedModule.id === module.id
                  ? 'bg-brand-50 text-brand-700'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  selectedModule.id === module.id ? 'bg-brand-200 text-brand-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {module.code}
                </span>
                <span className="text-sm font-medium truncate w-32">{module.name}</span>
              </div>
              {getStatusIcon(module.status)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-3 space-y-6 overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedModule.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2 py-1 rounded-lg">
                  Module {selectedModule.code}
                </span>
                <h2 className="text-2xl font-bold text-slate-900">{selectedModule.name}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed max-w-2xl">
                核心目標：{selectedModule.objective}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Outputs & Criteria */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-brand-600">
                    <FileText size={18} />
                    <h3 className="font-bold">產出內容檢視</h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedModule.outputs.map((output, i) => (
                      <li key={i}>
                        <button 
                          onClick={() => onOutputClick(output.name, selectedModule.name)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition-all group text-left border border-transparent hover:border-brand-100"
                        >
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                            output.isProduced ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-300'
                          }`}>
                            {output.isProduced ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          </div>
                          <span className="flex-1 font-medium">{output.name}</span>
                          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-emerald-600">
                    <ShieldCheck size={18} />
                    <h3 className="font-bold">驗收標準</h3>
                  </div>
                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                    <p className="text-sm text-emerald-800 leading-relaxed">
                      {selectedModule.acceptanceCriteria}
                    </p>
                  </div>
                </div>
              </div>

              {/* KPI Indicators */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-amber-600">
                  <Target size={18} />
                  <h3 className="font-bold">KPI 指標監控</h3>
                </div>
                <div className="space-y-6">
                  {selectedModule.kpis.map((kpi, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{kpi.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">目標: {kpi.target}</p>
                        </div>
                        <span className="text-sm font-bold text-brand-600">{kpi.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${kpi.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full rounded-full ${
                            kpi.progress >= 80 ? 'bg-emerald-500' : kpi.progress >= 40 ? 'bg-brand-500' : 'bg-amber-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
