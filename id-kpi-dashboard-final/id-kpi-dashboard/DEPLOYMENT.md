# 部署設定指南

## 🚀 快速開始部署

### 步驟 1: 準備 GitHub Repository

```bash
# 初始化 git (如果尚未初始化)
git init

# 新增所有檔案
git add .

# 提交
git commit -m "Initial commit: ID KPI Dashboard"

# 建立 main 分支
git branch -M main

# 連接遠端倉庫 (替換成你的 repo URL)
git remote add origin https://github.com/YOUR_USERNAME/id-kpi-dashboard.git

# 推送到 GitHub
git push -u origin main
```

### 步驟 2: 設定 Notion Integration

1. 前往 https://www.notion.so/my-integrations
2. 點擊 "New integration"
3. 基本資訊:
   - Name: `ID KPI Dashboard`
   - Associated workspace: 選擇你的工作區
4. 功能權限:
   - ✅ Read content
   - ✅ Update content  
   - ✅ Insert content
5. 提交後複製 **Internal Integration Secret**

### 步驟 3: 連接 Notion Database

1. 開啟資料庫: https://www.notion.so/ID-KPT-Dashboard-34a70322-0690-80a4-94e7-eb215fc307ec
2. 點擊右上角 `...` → `Add connections`
3. 搜尋 "ID KPI Dashboard"
4. 確認連接

### 步驟 4: 部署到 Vercel

#### 方案 A: 透過 Vercel Dashboard (推薦新手)

1. 前往 https://vercel.com/new
2. Import Git Repository
   - 選擇你的 GitHub repo
3. Configure Project:
   - Framework Preset: `Vite`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 環境變數設定:
   ```
   Name: VITE_NOTION_API_KEY
   Value: [貼上你的 Notion Integration Secret]
   
   Name: VITE_NOTION_DATABASE_ID  
   Value: 34a70322-0690-80a4-94e7-eb215fc307ec
   ```
5. 點擊 `Deploy`

#### 方案 B: 透過 Vercel CLI (推薦進階使用者)

```bash
# 全域安裝 Vercel CLI
npm install -g vercel

# 登入 Vercel
vercel login

# 初始化專案 (首次部署)
vercel

# 按照提示操作:
# - Set up and deploy? Y
# - Which scope? [選擇你的帳號]
# - Link to existing project? N
# - What's your project's name? id-kpi-dashboard
# - In which directory is your code located? ./
# - Want to override the settings? N

# 新增環境變數
vercel env add VITE_NOTION_API_KEY production
# 貼上你的 Notion Integration Secret

vercel env add VITE_NOTION_DATABASE_ID production
# 輸入: 34a70322-0690-80a4-94e7-eb215fc307ec

# 生產環境部署
vercel --prod
```

### 步驟 5: 設定 GitHub Actions (可選)

在 GitHub Repository 中設定 Secrets:

1. 前往 `Settings` → `Secrets and variables` → `Actions`
2. 新增以下 secrets:

```
NOTION_API_KEY = [你的 Notion Integration Secret]
NOTION_DATABASE_ID = 34a70322-0690-80a4-94e7-eb215fc307ec
VERCEL_TOKEN = [從 Vercel Settings → Tokens 取得]
VERCEL_ORG_ID = [從 Vercel 專案設定取得]
VERCEL_PROJECT_ID = [從 Vercel 專案設定取得]
```

3. 之後每次 push 到 main 分支都會自動部署!

## 🔍 取得 Vercel 相關 ID

### VERCEL_TOKEN
1. 前往 https://vercel.com/account/tokens
2. 點擊 "Create Token"
3. 命名為 "GitHub Actions"
4. 複製 token

### VERCEL_ORG_ID & VERCEL_PROJECT_ID
```bash
# 在專案目錄執行
vercel link

# 查看 .vercel/project.json
cat .vercel/project.json
```

會看到類似:
```json
{
  "orgId": "team_xxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxx"
}
```

## 📊 Notion Database Schema

確保你的 Database 有這些欄位:

| Property Name | Type | Description |
|--------------|------|-------------|
| Name | Title | 專案名稱 (必填) |
| ID | Text | 專案代碼 如 "rk26" |
| Description | Text | 專案描述 |
| Progress | Number | 進度百分比 0-100 |
| Modules | Text | JSON 格式的模組資料 |

範例 Modules JSON:
```json
[
  {
    "id": "1",
    "name": "設計決策系統",
    "code": "_P",
    "objective": "讓設計變成可複用的判斷標準",
    "outputs": [...],
    "kpis": [...],
    "status": "In Progress"
  }
]
```

## 🧪 測試部署

### 本地測試建置

```bash
# 建置專案
npm run build

# 預覽建置結果
npm run preview

# 瀏覽器開啟 http://localhost:4173
```

### 測試 Notion 連線

1. 確保 `.env` 檔案設定正確
2. 啟動開發伺服器: `npm run dev`
3. 點擊 "從 Notion 同步" 按鈕
4. 檢查 Console 是否有錯誤訊息

## 🔧 疑難排解

### 部署成功但無法載入 Notion 資料

**可能原因**: 環境變數未正確設定

**解決方式**:
1. 檢查 Vercel Dashboard → Settings → Environment Variables
2. 確認變數名稱為 `VITE_NOTION_API_KEY` (注意 VITE_ 前綴)
3. 重新部署: `vercel --prod --force`

### CORS 錯誤

**可能原因**: Notion API 直接從瀏覽器呼叫可能遇到 CORS

**解決方式**: 
- 考慮建立 Vercel Serverless Function 作為代理
- 或使用 Notion 官方 API 的 CORS 設定

### Build 失敗

**檢查清單**:
```bash
# 1. 清除快取
rm -rf node_modules package-lock.json .vercel
npm install

# 2. 本地建置測試
npm run build

# 3. 檢查 TypeScript 錯誤
npm run lint
```

## 📱 更新流程

```bash
# 1. 修改程式碼
# 2. 測試
npm run dev

# 3. 提交變更
git add .
git commit -m "描述你的變更"
git push origin main

# 4. Vercel 會自動部署 (如果有設定 GitHub Actions)
# 或手動部署:
vercel --prod
```

## 🎯 下一步

- [ ] 設定自訂網域
- [ ] 啟用 Analytics
- [ ] 設定 Error Monitoring (如 Sentry)
- [ ] 加入使用者認證

---

需要協助? 查看 [Vercel 官方文件](https://vercel.com/docs) 或 [Notion API 文件](https://developers.notion.com/)
