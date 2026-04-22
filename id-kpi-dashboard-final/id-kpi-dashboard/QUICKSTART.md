# 🚀 快速開始指南

## 📦 專案已打包完成！

你的 ID KPI Dashboard 已經準備好部署到 GitHub 和 Vercel。

---

## ⚡ 3 分鐘快速部署

### Step 1: 解壓縮並初始化 (30 秒)

```bash
# 解壓縮專案
unzip id-kpi-dashboard-final.zip
cd id-kpi-dashboard

# 快速設定（會自動安裝依賴）
chmod +x setup.sh
./setup.sh
```

### Step 2: 設定 Notion (1 分鐘)

1. **建立 Notion Integration**
   - 前往: https://www.notion.so/my-integrations
   - 點擊 "New integration" → 命名 "ID KPI Dashboard"
   - 複製 **Integration Token**

2. **連接 Database**
   - 開啟: https://www.notion.so/ID-KPT-Dashboard-34a70322-0690-80a4-94e7-eb215fc307ec
   - 點右上角 "..." → "Add connections" → 選擇你的 integration

3. **更新 .env**
   ```bash
   # 編輯 .env 檔案
   VITE_NOTION_API_KEY=secret_xxxxx  # 貼上你的 token
   ```

### Step 3: 推送到 GitHub (1 分鐘)

```bash
git init
git add .
git commit -m "Initial commit: ID KPI Dashboard"
git branch -M main
git remote add origin https://github.com/你的帳號/id-kpi-dashboard.git
git push -u origin main
```

### Step 4: 部署到 Vercel (30 秒)

1. 前往: https://vercel.com/new
2. Import 你的 GitHub repo
3. 在環境變數設定:
   ```
   VITE_NOTION_API_KEY = secret_xxxxx
   VITE_NOTION_DATABASE_ID = 34a70322-0690-80a4-94e7-eb215fc307ec
   ```
4. 點擊 **Deploy** ✨

---

## 📂 專案結構

```
id-kpi-dashboard/
├── 📘 README.md              # 完整專案說明
├── 📘 DEPLOYMENT.md          # 詳細部署指南
├── 📘 NOTION_SETUP.md        # Notion 設定完整教學
├── 🔧 setup.sh               # 一鍵設定腳本
├── 🔧 .env.example           # 環境變數範本
├── 📦 package.json           # 專案依賴
├── 🚀 vercel.json            # Vercel 配置
├── 🤖 .github/workflows/     # GitHub Actions 自動部署
└── 📁 src/
    ├── App.tsx               # 主應用（已整合 Notion）
    ├── components/           # UI 組件
    ├── services/             # Notion API 服務層
    ├── types.ts              # TypeScript 類型
    └── constants.ts          # 預設資料
```

---

## 🎯 核心功能

✅ **專案總覽儀表板** - 一眼掌握所有專案進度  
✅ **Notion 雙向同步** - 點擊按鈕即時同步資料  
✅ **模組化 KPI 追蹤** - 四大核心模組完整監控  
✅ **互動式資料視覺化** - Recharts 圖表呈現  
✅ **響應式設計** - 桌面/平板/手機完美適配  

---

## 🔧 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
# → http://localhost:3000

# 建置生產版本
npm run build

# 預覽建置結果
npm run preview
```

---

## 📚 重要文件

| 文件 | 用途 |
|------|------|
| `README.md` | 完整專案說明、技術棧、使用指南 |
| `DEPLOYMENT.md` | GitHub + Vercel 詳細部署步驟 |
| `NOTION_SETUP.md` | Notion Database Schema 與設定 |

---

## 🆘 遇到問題？

### 問題 1: Notion 同步失敗
**檢查清單**:
- [ ] Integration Token 正確？
- [ ] Database 已連接 Integration？
- [ ] Database ID 正確？

### 問題 2: 建置失敗
```bash
# 清除快取重新安裝
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 問題 3: Vercel 部署後環境變數未生效
- 確認變數名稱有 `VITE_` 前綴
- 重新部署: Settings → Deployments → Redeploy

---

## 🎨 自訂化

### 修改專案資料
編輯 `src/constants.ts` → `PROJECTS_DATA`

### 調整 Notion 欄位對應
編輯 `src/services/notionService.ts` → `fetchProjectsFromNotion()`

### 新增模組類型
編輯 `src/types.ts` → `OutputType`

---

## 📊 Notion Database 範例

你的 Database 應該有這些欄位:

| 欄位 | 類型 | 範例值 |
|------|------|--------|
| Name | Title | "Next RK26" |
| ID | Text | "rk26" |
| Description | Text | "下一代核心手持終端開發專案" |
| Progress | Number | 75 |
| Modules | Text | `[{...JSON...}]` |

完整 Schema 說明請看 `NOTION_SETUP.md`

---

## 🚀 下一步

- [ ] 自訂網域設定
- [ ] 啟用 Vercel Analytics
- [ ] 設定 Error Monitoring
- [ ] 加入團隊成員管理
- [ ] 擴充更多 KPI 指標

---

## 💡 提示

- **開發時**: 使用本地資料 (constants.ts) 更快速
- **生產時**: 點擊「從 Notion 同步」載入真實資料
- **自動部署**: 推送到 GitHub main 分支會自動部署到 Vercel

---

**🎉 準備好了嗎？開始部署吧！**

有任何問題請參考詳細文件或建立 GitHub Issue。
