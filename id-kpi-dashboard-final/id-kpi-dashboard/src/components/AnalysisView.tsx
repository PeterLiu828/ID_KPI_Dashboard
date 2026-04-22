/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, LabelList, Cell
} from 'recharts';
import { 
  ArrowLeft, FileText, CheckSquare, Table as TableIcon, LayoutGrid, 
  Calculator, ShieldCheck, Map as MapIcon, Image as ImageIcon,
  Save, Plus, Trash2, Info, AlertCircle, CheckCircle2
} from 'lucide-react';

interface AnalysisViewProps {
  outputName: string;
  moduleName: string;
  onBack: () => void;
}

export default function AnalysisView({ outputName, moduleName, onBack }: AnalysisViewProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Determine UI Template based on output name
  const templateType = useMemo(() => {
    if (outputName.includes('規範') || outputName.includes('標準') || outputName.includes('檢查表')) return 'checklist';
    if (outputName.includes('表') || outputName.includes('對比') || outputName.includes('優劣')) return 'table';
    if (outputName.includes('圖') || outputName.includes('地圖') || outputName.includes('定位')) return 'quadrant';
    if (outputName.includes('庫') || outputName.includes('場景') || outputName.includes('素材')) return 'gallery';
    if (outputName.includes('模型') || outputName.includes('策略')) return 'calculator';
    return 'document';
  }, [outputName]);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // --- Template Components ---

  const ChecklistTemplate = () => {
    const [items, setItems] = useState([
      { id: 1, text: '符合人體工學握持規範', checked: true },
      { id: 2, text: '按鍵回饋力道符合標準 (2.5N)', checked: false },
      { id: 3, text: '表面材質耐磨等級達 3H', checked: true },
      { id: 4, text: '品牌 Logo 放置位置正確', checked: true },
    ]);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <CheckSquare size={18} className="text-brand-500" />
            檢驗清單
          </h3>
          <span className="text-xs font-bold text-slate-400">完成度: {Math.round((items.filter(i => i.checked).length / items.length) * 100)}%</span>
        </div>
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-200 transition-colors cursor-pointer" onClick={() => {
              setItems(items.map(i => i.id === item.id ? { ...i, checked: !i.checked } : i));
            }}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.checked ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-300 bg-white'}`}>
                {item.checked && <CheckCircle2 size={14} />}
              </div>
              <span className={`text-sm font-medium ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TableTemplate = () => {
    const data = outputName.includes('價格') ? [
      { category: '旗艦級', range: '$500 - $800', target: '專業用戶', status: '已更新' },
      { category: '主流級', range: '$300 - $499', target: '一般企業', status: '審核中' },
      { category: '入門級', range: '$150 - $299', target: '教育市場', status: '待定' },
    ] : [
      { category: '痛點 A', range: '操作繁瑣', target: '簡化 UI 流程', status: '高優先' },
      { category: '痛點 B', range: '續航力不足', target: '優化電池管理', status: '中優先' },
      { category: '痛點 C', range: '外殼易刮傷', target: '導入 CMF 新材質', status: '高優先' },
    ];

    return (
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <TableIcon size={18} className="text-brand-500" />
          數據對照表
        </h3>
        <div className="overflow-hidden border border-slate-100 rounded-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-4 py-3">類別/項目</th>
                <th className="px-4 py-3">現狀/區間</th>
                <th className="px-4 py-3">目標/策略</th>
                <th className="px-4 py-3">狀態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4 font-bold text-slate-700">{row.category}</td>
                  <td className="px-4 py-4 text-slate-600">{row.range}</td>
                  <td className="px-4 py-4 text-slate-600">{row.target}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-brand-50 text-brand-700 rounded text-[10px] font-bold">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const QuadrantTemplate = () => {
    const data = [
      { x: 80, y: 70, name: '欣技產品', type: 'self' },
      { x: 30, y: 40, name: '競品 A', type: 'comp' },
      { x: 60, y: 20, name: '競品 B', type: 'comp' },
      { x: 20, y: 80, name: '競品 C', type: 'comp' },
      { x: 90, y: 30, name: '競品 D', type: 'comp' },
    ];

    return (
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <MapIcon size={18} className="text-brand-500" />
          市場定位象限圖
        </h3>
        <div className="h-[400px] w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase">高功能性</div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase">低功能性</div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-400 uppercase">低成本</div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-bold text-slate-400 uppercase">高成本</div>
          
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" dataKey="x" name="成本" domain={[0, 100]} hide />
              <YAxis type="number" dataKey="y" name="功能" domain={[0, 100]} hide />
              <ZAxis type="number" range={[100, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <ReferenceLine x={50} stroke="#cbd5e1" />
              <ReferenceLine y={50} stroke="#cbd5e1" />
              <Scatter name="定位" data={data}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.type === 'self' ? '#0ea5e9' : '#94a3b8'} />
                ))}
                <LabelList dataKey="name" position="top" style={{ fontSize: '10px', fontWeight: 'bold', fill: '#475569' }} />
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const GalleryTemplate = () => {
    const items = [
      { title: '場景 A: 倉庫盤點', desc: '極端環境下的單手操作模擬', img: 'https://picsum.photos/seed/warehouse/400/300' },
      { title: '場景 B: 零售結帳', desc: '高頻率掃描與人機互動流程', img: 'https://picsum.photos/seed/retail/400/300' },
      { title: '場景 C: 戶外物流', desc: '強光環境下的螢幕可視度檢驗', img: 'https://picsum.photos/seed/logistics/400/300' },
    ];

    return (
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <LayoutGrid size={18} className="text-brand-500" />
          視覺化資產展示
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div key={i} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="p-2 bg-white rounded-full text-slate-900 shadow-xl">
                    <ImageIcon size={20} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
          <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-brand-500 hover:border-brand-200 hover:bg-brand-50/30 transition-all min-h-[200px]">
            <Plus size={24} />
            <span className="text-xs font-bold uppercase">新增資產</span>
          </button>
        </div>
      </div>
    );
  };

  const CalculatorTemplate = () => {
    const [params, setParams] = useState({
      impact: 80,
      feasibility: 60,
      cost: 40,
    });

    const score = Math.round((params.impact * 0.5 + params.feasibility * 0.3 + (100 - params.cost) * 0.2));

    return (
      <div className="space-y-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Calculator size={18} className="text-brand-500" />
          影響力評估模型
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {Object.entries(params).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase">{key === 'impact' ? '市場影響力' : key === 'feasibility' ? '技術可行性' : '開發成本'}</label>
                  <span className="text-xs font-bold text-brand-600">{value}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={value} 
                  onChange={(e) => setParams({ ...params, [key]: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>
            ))}
          </div>
          <div className="bg-brand-600 rounded-3xl p-8 text-white flex flex-col items-center justify-center text-center shadow-xl shadow-brand-100">
            <p className="text-brand-200 text-xs font-bold uppercase tracking-widest mb-2">綜合評估得分</p>
            <div className="text-6xl font-black mb-4">{score}</div>
            <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase ${score > 75 ? 'bg-emerald-400' : score > 50 ? 'bg-amber-400' : 'bg-red-400'}`}>
              {score > 75 ? '高度推薦' : score > 50 ? '值得嘗試' : '需重新評估'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DocumentTemplate = () => {
    return (
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <FileText size={18} className="text-brand-500" />
          文件閱覽
        </h3>
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 mb-4">
            <FileText size={32} />
          </div>
          <p className="text-slate-500 max-w-xs">
            此項目為純文本規範文件，您可以點擊下方按鈕預覽完整內容或下載 PDF。
          </p>
          <button className="mt-6 px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            開啟文件預覽
          </button>
        </div>
      </div>
    );
  };

  // --- Main Render ---

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          返回模組詳情
        </button>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <ShieldCheck size={14} />
          互動工作區
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-brand-600 text-xs font-bold uppercase tracking-widest">{moduleName}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">ID_KPI_2026</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{outputName}</h2>
            <p className="text-slate-500">
              {templateType === 'checklist' ? '規範檢核與標準對照工作區' : 
               templateType === 'table' ? '數據矩陣與策略對照表' : 
               templateType === 'quadrant' ? '市場競爭力與定位分析' : 
               templateType === 'gallery' ? '視覺資產與場景庫' : 
               '決策評估與戰略模型'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                isSaved ? 'bg-emerald-500 text-white' : 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-100'
              }`}
            >
              {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
              {isSaved ? '儲存變更' : '儲存當前狀態'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={outputName}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {templateType === 'checklist' && <ChecklistTemplate />}
                {templateType === 'table' && <TableTemplate />}
                {templateType === 'quadrant' && <QuadrantTemplate />}
                {templateType === 'gallery' && <GalleryTemplate />}
                {templateType === 'calculator' && <CalculatorTemplate />}
                {templateType === 'document' && <DocumentTemplate />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Info size={16} className="text-brand-500" />
                執行指引
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                請根據專案實際進度更新此頁面的內容。所有的變更都將同步至總體 KPI 儀表板。如果是規範類文件，請確保每一項檢核點都經過實體 Mock-up 或文件審查。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle size={16} className="text-amber-500" />
                待辦事項
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>需在 04/15 前完成初步審核</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span>上傳最新的 CMF 樣板照片</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center gap-2">
              <Plus size={20} className="text-slate-300" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">新增關聯文件</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
