#!/usr/bin/env node

/**
 * Notion Connection Test Tool
 * 用於快速測試 Notion API 連線
 */

import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 載入環境變數
dotenv.config({ path: join(__dirname, '.env') });

const API_KEY = process.env.VITE_NOTION_API_KEY;
const DATABASE_ID = process.env.VITE_NOTION_DATABASE_ID;

console.log('🔍 Notion 連線測試工具\n');
console.log('='.repeat(50));

// 檢查環境變數
if (!API_KEY) {
  console.error('❌ 錯誤：找不到 VITE_NOTION_API_KEY');
  console.log('請確認 .env 檔案存在且包含：');
  console.log('VITE_NOTION_API_KEY=secret_xxxxx\n');
  process.exit(1);
}

if (!DATABASE_ID) {
  console.error('❌ 錯誤：找不到 VITE_NOTION_DATABASE_ID');
  console.log('請確認 .env 檔案存在且包含：');
  console.log('VITE_NOTION_DATABASE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\n');
  process.exit(1);
}

console.log('✅ 環境變數檢查');
console.log(`   API Key: ${API_KEY.slice(0, 15)}...${API_KEY.slice(-4)}`);
console.log(`   Database ID: ${DATABASE_ID}`);
console.log('');

// 檢查 Database ID 格式
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
if (!uuidRegex.test(DATABASE_ID)) {
  console.warn('⚠️  警告：Database ID 格式可能不正確');
  console.log('   正確格式應為：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
  console.log('   你的格式：', DATABASE_ID);
  console.log('');
}

// 初始化 Notion Client
const notion = new Client({ auth: API_KEY });

async function testConnection() {
  console.log('🔌 開始測試連線...\n');
  
  try {
    // 測試 1: 獲取 Database 資訊
    console.log('測試 1/3: 獲取 Database 資訊...');
    const database = await notion.databases.retrieve({
      database_id: DATABASE_ID,
    });
    
    const dbTitle = database.title?.[0]?.plain_text || '(無標題)';
    console.log(`✅ 成功！Database 名稱：${dbTitle}`);
    console.log(`   建立時間：${database.created_time}`);
    console.log('');
    
    // 測試 2: 查詢 Database
    console.log('測試 2/3: 查詢 Database 資料...');
    const queryResponse = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: 5,
    });
    
    console.log(`✅ 成功！找到 ${queryResponse.results.length} 筆資料`);
    
    if (queryResponse.results.length > 0) {
      console.log('\n   前幾筆資料：');
      queryResponse.results.slice(0, 3).forEach((page, idx) => {
        const title = page.properties.Name?.title?.[0]?.plain_text || '(無標題)';
        console.log(`   ${idx + 1}. ${title}`);
      });
    } else {
      console.log('   ⚠️  Database 目前是空的');
    }
    console.log('');
    
    // 測試 3: 檢查 Schema
    console.log('測試 3/3: 檢查 Database Schema...');
    const properties = database.properties;
    const requiredFields = ['Name', 'ID', 'Description', 'Progress', 'Modules'];
    
    console.log('   現有欄位：');
    Object.keys(properties).forEach(key => {
      const type = properties[key].type;
      const isRequired = requiredFields.includes(key);
      const mark = isRequired ? '✅' : '  ';
      console.log(`   ${mark} ${key} (${type})`);
    });
    
    const missingFields = requiredFields.filter(field => !properties[field]);
    if (missingFields.length > 0) {
      console.log('\n   ⚠️  缺少必要欄位：', missingFields.join(', '));
      console.log('   請參考 NOTION_SETUP.md 建立這些欄位');
    } else {
      console.log('\n   ✅ 所有必要欄位都存在！');
    }
    console.log('');
    
    // 總結
    console.log('='.repeat(50));
    console.log('🎉 測試完成！');
    console.log('');
    console.log('✅ Notion API 連線正常');
    console.log('✅ Database 可以訪問');
    console.log(`✅ 目前有 ${queryResponse.results.length} 筆資料`);
    
    if (missingFields.length === 0 && queryResponse.results.length > 0) {
      console.log('\n🚀 你的 Dashboard 已準備就緒！');
      console.log('   執行 npm run dev 啟動應用程式');
    } else if (missingFields.length > 0) {
      console.log('\n⚠️  請先完成 Database Schema 設定');
      console.log('   參考：NOTION_SETUP.md');
    } else if (queryResponse.results.length === 0) {
      console.log('\n📝 Database 是空的，請先新增一些專案資料');
      console.log('   參考：NOTION_SETUP.md 中的範例資料');
    }
    
  } catch (error) {
    console.error('\n❌ 測試失敗！\n');
    console.error('錯誤訊息：', error.message);
    console.error('錯誤代碼：', error.code);
    console.error('');
    
    // 根據錯誤類型給出建議
    if (error.code === 'object_not_found' || error.code === 'NOT_FOUND') {
      console.log('💡 可能的原因：');
      console.log('   1. Database ID 不正確');
      console.log('      檢查：.env 中的 VITE_NOTION_DATABASE_ID');
      console.log('      正確格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
      console.log('');
      console.log('   2. Integration 尚未連接到 Database');
      console.log('      解決方式：');
      console.log('      - 開啟 Database 頁面');
      console.log('      - 點擊右上角 "..." → "Add connections"');
      console.log('      - 選擇你的 Integration');
      console.log('');
    } else if (error.code === 'unauthorized' || error.code === 'UNAUTHORIZED') {
      console.log('💡 可能的原因：');
      console.log('   1. API Key 不正確或已過期');
      console.log('      解決方式：重新從 Notion Integration 複製 Token');
      console.log('');
      console.log('   2. Integration 權限不足');
      console.log('      解決方式：確認 Integration 有 Read content 權限');
      console.log('');
    } else if (error.code === 'validation_error') {
      console.log('💡 可能的原因：');
      console.log('   Database ID 格式錯誤');
      console.log('   正確格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
      console.log('');
    }
    
    console.log('📖 詳細排查指南請參考：TROUBLESHOOTING.md');
    process.exit(1);
  }
}

// 執行測試
testConnection();
