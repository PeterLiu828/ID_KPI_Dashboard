/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, ProjectModule } from './types';

const BASE_MODULES: ProjectModule[] = [
  {
    id: '1',
    name: '設計決策系統',
    code: '_P',
    objective: '讓設計變成可複用的判斷標準',
    outputs: [
      { name: '各產品線設計規範', isProduced: true, type: 'checklist' },
      { name: '各產品線價格區間表', isProduced: true, type: 'table' },
      { name: '各類客戶價值設計原則', isProduced: false, type: 'document' }
    ],
    acceptanceCriteria: '依產出文件做初步設計決策',
    kpis: [
      { name: '設計規範達成率', target: '>90%', progress: 85 },
      { name: '決策溝通時間下降', target: 'RK26', progress: 60 },
    ],
    status: 'In Progress',
  },
  {
    id: '2',
    name: '使用場景模型',
    code: '_M',
    objective: '定義產品「怎麼被用」',
    outputs: [
      { name: '建立3-5個核心使用場景', isProduced: true, type: 'gallery' },
      { name: '操作流程圖', isProduced: true, type: 'gallery' },
      { name: '痛點→設計對應表', isProduced: false, type: 'table' }
    ],
    acceptanceCriteria: '每個設計案都能對應至少3個場景驗證',
    kpis: [
      { name: '設計變更次數下降', target: 'RK26', progress: 45 },
      { name: '客戶回饋問題數下降', target: 'RS20', progress: 30 },
    ],
    status: 'In Progress',
  },
  {
    id: '3',
    name: '模組化ID架構',
    code: '_R',
    objective: '建立產品延展能力、綁定配件',
    outputs: [
      { name: '模組設計規範', isProduced: true, type: 'checklist' },
      { name: '介面設計標準', isProduced: true, type: 'checklist' },
      { name: '配件共用規範', isProduced: false, type: 'checklist' },
      { name: '下一代配件戰略', isProduced: false, type: 'calculator' }
    ],
    acceptanceCriteria: '新產品沿用80%以上設計架構與配件',
    kpis: [
      { name: '產品共用率', target: '>60%', progress: 75 },
      { name: '開發時間縮短', target: 'RK26', progress: 50 },
    ],
    status: 'In Progress',
  },
  {
    id: '4',
    name: '競品視覺地圖',
    code: '_H',
    objective: '建立市場定位工具',
    outputs: [
      { name: '競品分析圖', isProduced: true, type: 'quadrant' },
      { name: '優劣分析表', isProduced: true, type: 'table' },
      { name: '欣技定位圖', isProduced: true, type: 'quadrant' }
    ],
    acceptanceCriteria: '業務可用於對外說明',
    kpis: [
      { name: '業務使用率', target: '提升', progress: 90 },
      { name: '提案勝率提升', target: 'RK', progress: 40 },
    ],
    status: 'Completed',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'rk26',
    name: 'Next RK26',
    description: '下一代核心手持終端開發專案',
    overallProgress: 75,
    modules: BASE_MODULES.map(m => ({ ...m, id: `rk26-${m.id}` })),
  },
  {
    id: 'rs39',
    name: 'RS39',
    description: '強固型平板電腦系列擴展',
    overallProgress: 45,
    modules: BASE_MODULES.map(m => ({ ...m, id: `rs39-${m.id}`, status: m.id === '4' ? 'Completed' : 'Pending' })),
  },
  {
    id: 'mind_free',
    name: 'Mind_Free',
    description: '穿戴式創新設計研究專案',
    overallProgress: 20,
    modules: BASE_MODULES.map(m => ({ ...m, id: `mind-free-${m.id}`, status: 'Pending' })),
  },
];
