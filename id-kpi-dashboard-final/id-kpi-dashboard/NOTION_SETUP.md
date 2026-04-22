# Notion Database 設定指南

## 📊 Database Schema

你的 Notion Database 需要包含以下欄位結構：

### 必要欄位

| 欄位名稱 | 類型 | 說明 | 範例 |
|---------|------|------|------|
| **Name** | Title | 專案名稱 | "Next RK26" |
| **ID** | Text | 專案代碼 | "rk26" |
| **Description** | Text | 專案描述 | "下一代核心手持終端開發專案" |
| **Progress** | Number | 整體進度 (0-100) | 75 |
| **Modules** | Text | 模組資料（JSON） | 見下方範例 |

### 選用欄位（可擴充）

| 欄位名稱 | 類型 | 說明 |
|---------|------|------|
| Status | Select | 專案狀態 (Active/Paused/Completed) |
| Start Date | Date | 專案開始日期 |
| End Date | Date | 預計結束日期 |
| Team | Multi-select | 負責團隊成員 |
| Priority | Select | 優先級 (High/Medium/Low) |

## 📝 Modules JSON 格式

`Modules` 欄位應該是一個 JSON 字串，包含專案的所有模組資料：

```json
[
  {
    "id": "1",
    "name": "設計決策系統",
    "code": "_P",
    "objective": "讓設計變成可複用的判斷標準",
    "outputs": [
      {
        "name": "各產品線設計規範",
        "isProduced": true,
        "type": "checklist"
      },
      {
        "name": "各產品線價格區間表",
        "isProduced": true,
        "type": "table"
      },
      {
        "name": "各類客戶價值設計原則",
        "isProduced": false,
        "type": "document"
      }
    ],
    "acceptanceCriteria": "依產出文件做初步設計決策",
    "kpis": [
      {
        "name": "設計規範達成率",
        "target": ">90%",
        "progress": 85
      },
      {
        "name": "決策溝通時間下降",
        "target": "RK26",
        "progress": 60
      }
    ],
    "status": "In Progress"
  },
  {
    "id": "2",
    "name": "使用場景模型",
    "code": "_M",
    "objective": "定義產品「怎麼被用」",
    "outputs": [
      {
        "name": "建立3-5個核心使用場景",
        "isProduced": true,
        "type": "gallery"
      },
      {
        "name": "操作流程圖",
        "isProduced": true,
        "type": "gallery"
      },
      {
        "name": "痛點→設計對應表",
        "isProduced": false,
        "type": "table"
      }
    ],
    "acceptanceCriteria": "每個設計案都能對應至少3個場景驗證",
    "kpis": [
      {
        "name": "設計變更次數下降",
        "target": "RK26",
        "progress": 45
      },
      {
        "name": "客戶回饋問題數下降",
        "target": "RS20",
        "progress": 30
      }
    ],
    "status": "In Progress"
  }
]
```

## 🎯 四大核心模組

### 1. 設計決策系統 (Code: _P)
**目標**: 讓設計變成可複用的判斷標準

**產出物**:
- 各產品線設計規範 (checklist)
- 各產品線價格區間表 (table)
- 各類客戶價值設計原則 (document)

**驗收標準**: 依產出文件做初步設計決策

---

### 2. 使用場景模型 (Code: _M)
**目標**: 定義產品「怎麼被用」

**產出物**:
- 建立3-5個核心使用場景 (gallery)
- 操作流程圖 (gallery)
- 痛點→設計對應表 (table)

**驗收標準**: 每個設計案都能對應至少3個場景驗證

---

### 3. 模組化ID架構 (Code: _R)
**目標**: 建立產品延展能力、綁定配件

**產出物**:
- 模組設計規範 (checklist)
- 介面設計標準 (checklist)
- 配件共用規範 (checklist)
- 下一代配件戰略 (calculator)

**驗收標準**: 新產品沿用80%以上設計架構與配件

---

### 4. 競品視覺地圖 (Code: _H)
**目標**: 建立市場定位工具

**產出物**:
- 競品分析圖 (quadrant)
- 優劣分析表 (table)
- 欣技定位圖 (quadrant)

**驗收標準**: 業務可用於對外說明

## 📋 範例專案資料

### 專案 1: Next RK26
```
Name: Next RK26
ID: rk26
Description: 下一代核心手持終端開發專案
Progress: 75
Modules: [四大模組的 JSON - 狀態為 In Progress]
```

### 專案 2: RS39
```
Name: RS39
ID: rs39
Description: 強固型平板電腦系列擴展
Progress: 45
Modules: [四大模組的 JSON - 除了競品地圖為 Completed，其餘 Pending]
```

### 專案 3: Mind_Free
```
Name: Mind_Free
ID: mind_free
Description: 穿戴式創新設計研究專案
Progress: 20
Modules: [四大模組的 JSON - 全部狀態為 Pending]
```

## 🔧 快速建立方式

### 方法 1: 複製範本 Database

1. 開啟這個連結: https://www.notion.so/ID-KPT-Dashboard-34a70322-0690-80a4-94e7-eb215fc307ec
2. 點擊右上角 "Duplicate" 複製到你的 workspace
3. 修改欄位內容符合你的需求

### 方法 2: 手動建立

1. 在 Notion 建立新的 Database (Table view)
2. 新增上述必要欄位
3. 手動輸入專案資料
4. 在 Modules 欄位貼上格式化的 JSON

### 方法 3: 使用 Notion API 匯入

參考 `src/services/notionService.ts` 中的 `createProjectInNotion` 函數，可以程式化建立專案。

## ⚠️ 常見錯誤

### 錯誤 1: JSON 格式不正確
**症狀**: 同步後無法顯示模組資料

**解決方式**: 
- 使用 JSON 驗證工具檢查格式: https://jsonlint.com/
- 確保所有雙引號、逗號、括號都正確配對

### 錯誤 2: Progress 數值超出範圍
**症狀**: 進度條顯示異常

**解決方式**: 
- Progress 欄位應該是 0-100 的數字
- 不要使用百分比符號 (用 75 而非 75%)

### 錯誤 3: Module Status 拼寫錯誤
**正確值**: 
- "Pending"
- "In Progress"  
- "Completed"

注意大小寫和空格！

## 🔄 資料同步流程

```
Notion Database 
    ↓ (點擊「從 Notion 同步」)
fetchProjectsFromNotion()
    ↓ (解析資料)
React State (projects)
    ↓ (渲染)
Dashboard UI
```

## 📚 進階使用

### 自訂欄位對應

如果你的 Database 欄位名稱不同，修改 `src/services/notionService.ts`:

```typescript
return {
  id: properties.ProjectCode?.rich_text?.[0]?.plain_text || page.id,
  name: properties.ProjectName?.title?.[0]?.plain_text || 'Untitled',
  // ... 修改對應關係
};
```

### 新增自訂模組類型

編輯 `src/types.ts` 擴充 OutputType:

```typescript
export type OutputType = 
  | 'checklist' 
  | 'table' 
  | 'document' 
  | 'gallery' 
  | 'quadrant' 
  | 'calculator'
  | 'your-custom-type';  // 新增類型
```

---

需要更多協助？查看 [Notion API 文件](https://developers.notion.com/)
