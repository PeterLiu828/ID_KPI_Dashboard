/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ModuleStatus = 'Pending' | 'In Progress' | 'Completed' | 'Delayed';

export interface KPIIndicator {
  name: string;
  target: string;
  current?: string;
  progress: number; // 0-100
}

export interface ProjectModule {
  id: string;
  name: string;
  code: string;
  objective: string;
  outputs: {
    name: string;
    isProduced: boolean;
    type: 'checklist' | 'table' | 'quadrant' | 'gallery' | 'calculator' | 'document';
  }[];
  acceptanceCriteria: string;
  kpis: KPIIndicator[];
  status: ModuleStatus;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  overallProgress: number;
  modules: ProjectModule[];
}
