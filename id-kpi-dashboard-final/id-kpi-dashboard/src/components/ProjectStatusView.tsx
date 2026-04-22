/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS_DATA } from '../constants';
import { CheckCircle2, AlertCircle, Clock, FileText, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectStatusViewProps {
  projects: Project[];
}

export default function ProjectStatusView({ projects }: ProjectStatusViewProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                  {project.name}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    project.overallProgress > 70 ? 'bg-emerald-100 text-emerald-700' : 
                    project.overallProgress > 30 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {project.overallProgress}% 完成
                  </span>
                </h3>
                <p className="text-sm text-slate-400 mt-1">{project.description}</p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">模組狀態</p>
                  <div className="flex gap-1">
                    {project.modules.map((m, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${
                          m.status === 'Completed' ? 'bg-emerald-500' : 
                          m.status === 'In Progress' ? 'bg-brand-500' : 'bg-slate-200'
                        }`} 
                        title={m.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">模組名稱</th>
                    <th className="px-6 py-4">KPI 達成狀況</th>
                    <th className="px-6 py-4">產出文件檢視</th>
                    <th className="px-6 py-4">狀態</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {project.modules.map((module) => (
                    <tr key={module.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-5">
                        <p className="font-bold text-slate-700 text-sm">{module.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{module.code}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2 max-w-[200px]">
                          {module.kpis.map((kpi, i) => (
                            <div key={i} className="flex flex-col gap-1">
                              <div className="flex justify-between text-[10px]">
                                <span className="text-slate-500 truncate">{kpi.name}</span>
                                <span className="font-bold text-brand-600">{kpi.progress}%</span>
                              </div>
                              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${kpi.progress >= 80 ? 'bg-emerald-500' : 'bg-brand-500'}`} 
                                  style={{ width: `${kpi.progress}%` }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          {module.outputs.map((output, i) => (
                            <div 
                              key={i}
                              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-bold ${
                                output.isProduced 
                                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                                  : 'bg-slate-50 border-slate-100 text-slate-400'
                              }`}
                            >
                              {output.isProduced ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                              {output.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase ${
                          module.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                          module.status === 'In Progress' ? 'bg-brand-100 text-brand-700' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {module.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
