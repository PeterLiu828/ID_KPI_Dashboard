/**
 * Notion API Service
 * 負責與 Notion Database 進行資料同步
 */

import { Client } from '@notionhq/client';
import type { Project, ProjectModule } from '../types';

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

/**
 * 從 Notion 資料庫獲取所有專案資料
 */
export async function fetchProjectsFromNotion(): Promise<Project[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Name',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: properties.ID?.rich_text?.[0]?.plain_text || page.id,
        name: properties.Name?.title?.[0]?.plain_text || 'Untitled',
        description: properties.Description?.rich_text?.[0]?.plain_text || '',
        overallProgress: properties.Progress?.number || 0,
        modules: parseModules(properties.Modules?.rich_text?.[0]?.plain_text),
      };
    });
  } catch (error) {
    console.error('Error fetching from Notion:', error);
    throw new Error('Failed to fetch projects from Notion');
  }
}

/**
 * 解析模組資料（從 JSON 字串或其他格式）
 */
function parseModules(modulesData: string | undefined): ProjectModule[] {
  if (!modulesData) return [];
  
  try {
    return JSON.parse(modulesData);
  } catch {
    return [];
  }
}

/**
 * 更新專案進度到 Notion
 */
export async function updateProjectProgress(
  projectId: string,
  progress: number
): Promise<void> {
  try {
    // 先查找對應的 page
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'ID',
        rich_text: {
          equals: projectId,
        },
      },
    });

    if (response.results.length === 0) {
      throw new Error(`Project ${projectId} not found`);
    }

    const pageId = response.results[0].id;

    await notion.pages.update({
      page_id: pageId,
      properties: {
        Progress: {
          number: progress,
        },
      },
    });
  } catch (error) {
    console.error('Error updating Notion:', error);
    throw new Error('Failed to update project progress');
  }
}

/**
 * 新增專案到 Notion
 */
export async function createProjectInNotion(
  project: Omit<Project, 'id'>
): Promise<string> {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: project.name,
              },
            },
          ],
        },
        Description: {
          rich_text: [
            {
              text: {
                content: project.description,
              },
            },
          ],
        },
        Progress: {
          number: project.overallProgress,
        },
        Modules: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(project.modules),
              },
            },
          ],
        },
      },
    });

    return response.id;
  } catch (error) {
    console.error('Error creating project in Notion:', error);
    throw new Error('Failed to create project');
  }
}
