# ID KPI Dashboard

專為 ID 部門設計的專案 KPI 管理儀表板，整合 Notion Database 進行資料同步。

## 🚀 功能特色

- **即時專案監控**: 追蹤多個專案的整體進度與模組狀態
- **Notion 整合**: 雙向同步 Notion Database 資料
- **互動式儀表板**: 視覺化呈現 KPI 指標與專案狀態
- **模組化設計**: 支援設計決策系統、使用場景模型等四大模組
- **響應式介面**: 適配桌面與行動裝置

## 📋 前置需求

- Node.js 18+ 
- npm 或 yarn
- Notion Account (用於資料同步)

## 🔧 本地開發

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定環境變數

複製 `.env.example` 為 `.env`:

```bash
cp .env.example .env
```

編輯 `.env` 並填入你的 Notion 設定:

```env
VITE_NOTION_API_KEY=your_notion_integration_token
VITE_NOTION_DATABASE_ID=34a70322-0690-80a4-94e7-eb215fc307ec
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問 `http://localhost:3000`

## 🔑 Notion 設定步驟

### 1. 建立 Notion Integration

1. 前往 [Notion Integrations](https://www.notion.so/my-integrations)
2. 點擊 "+ New integration"
3. 命名為 "ID KPI Dashboard"
4. 選擇 Workspace
5. 設定權限:
   - ✅ Read content
   - ✅ Update content
   - ✅ Insert content
6. 點擊 "Submit" 並複製 **Internal Integration Token**

### 2. 連接 Database

1. 開啟你的 [Notion Database](https://www.notion.so/ID-KPT-Dashboard-34a70322-0690-80a4-94e7-eb215fc307ec)
2. 點擊右上角 "..." → "Add connections"
3. 搜尋並選擇 "ID KPI Dashboard" integration
4. 點擊 "Confirm"

### 3. Database Schema 設定

確保你的 Notion Database 包含以下欄位:

| 欄位名稱 | 類型 | 說明 |
|---------|------|------|
| Name | Title | 專案名稱 |
| ID | Text | 專案識別碼 (如 rk26, rs39) |
| Description | Text | 專案描述 |
| Progress | Number | 整體進度 (0-100) |
| Modules | Text | 模組資料 (JSON 格式) |

## 🚀 部署到 Vercel

### 方法一: GitHub 整合 (推薦)

1. **推送到 GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的使用者名稱/id-kpi-dashboard.git
git push -u origin main
```

2. **連接 Vercel**

   - 前往 [Vercel Dashboard](https://vercel.com/dashboard)
   - 點擊 "Add New Project"
   - 選擇你的 GitHub Repository
   - Framework Preset 會自動偵測為 "Vite"

3. **設定環境變數**

   在 Vercel 專案設定中新增:
   
   ```
   VITE_NOTION_API_KEY = your_notion_integration_token
   VITE_NOTION_DATABASE_ID = 34a70322-0690-80a4-94e7-eb215fc307ec
   ```

4. **部署**

   點擊 "Deploy" 開始部署

### 方法二: Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 部署
vercel

# 設定環境變數
vercel env add VITE_NOTION_API_KEY
vercel env add VITE_NOTION_DATABASE_ID

# 生產部署
vercel --prod
```

## 📦 建置專案

```bash
npm run build
```

建置檔案會輸出到 `dist/` 目錄

## 🏗️ 專案結構

```
id-kpi-dashboard/
├── src/
│   ├── components/          # React 組件
│   │   ├── Sidebar.tsx
│   │   ├── DashboardOverview.tsx
│   │   ├── ModuleView.tsx
│   │   ├── ProjectStatusView.tsx
│   │   └── AnalysisView.tsx
│   ├── services/           # API 服務層
│   │   └── notionService.ts
│   ├── types.ts           # TypeScript 類型定義
│   ├── constants.ts       # 預設資料與常數
│   ├── App.tsx            # 主應用程式
│   ├── main.tsx           # 應用程式入口
│   └── index.css          # 全域樣式
├── public/                # 靜態資源
├── .env.example          # 環境變數範本
├── vercel.json           # Vercel 配置
├── package.json          # 專案依賴
├── tsconfig.json         # TypeScript 配置
└── vite.config.ts        # Vite 配置
```

## 🎯 核心模組

### 1. 設計決策系統 (_P)
- 設計規範與價格區間表
- 可複用的判斷標準

### 2. 使用場景模型 (_M)
- 核心使用場景定義
- 操作流程與痛點對應

### 3. 模組化 ID 架構 (_R)
- 產品延展能力
- 配件共用規範

### 4. 競品視覺地圖 (_H)
- 市場定位分析
- 競品優劣比較

## 🔄 資料同步

應用程式支援兩種資料模式:

1. **本地模式**: 使用 `constants.ts` 中的靜態資料
2. **Notion 同步模式**: 點擊 "從 Notion 同步" 按鈕即時載入

## 🛠️ 技術棧

- **前端框架**: React 19 + TypeScript
- **建置工具**: Vite 6
- **樣式**: Tailwind CSS 4
- **圖表**: Recharts
- **圖示**: Lucide React
- **API**: Notion SDK
- **部署**: Vercel

## 📝 開發指南

### 新增專案模組

編輯 `src/constants.ts` 中的 `BASE_MODULES`:

```typescript
{
  id: '5',
  name: '新模組名稱',
  code: '_X',
  objective: '模組目標',
  outputs: [...],
  kpis: [...],
  status: 'Pending',
}
```

### 自訂 Notion 資料格式

修改 `src/services/notionService.ts` 中的 `fetchProjectsFromNotion` 函數

## 🐛 疑難排解

### Notion API 連線失敗

- 確認 Integration Token 正確
- 檢查 Database 是否已連接 Integration
- 確認 Database ID 正確 (URL 中的 ID)

### 建置錯誤

```bash
# 清除快取並重新安裝
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

Apache-2.0

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request!

---

**開發團隊**: ID Department | **專案狀態**: Active Development
