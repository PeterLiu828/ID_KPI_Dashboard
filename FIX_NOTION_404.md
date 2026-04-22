# ⚠️ Notion 404 錯誤已修復

## 🔍 問題原因

你遇到的 `404: NOT_FOUND` 錯誤是因為：

### 1. Database ID 格式錯誤 ❌

**錯誤格式**（原本）：
```
34a70322069080a494e7eb215fc307ec
```

**正確格式**（已修正）：
```
34a70322-0690-80a4-94e7-eb215fc307ec
```

Notion API 要求 Database ID 必須是標準 UUID 格式（8-4-4-4-12），包含連字號。

### 2. Integration 可能未連接

即使 ID 正確，還需要確保你的 Notion Integration 已經連接到這個 Database。

---

## ✅ 已修復內容

我已經更新了專案中的所有相關檔案：

- ✅ `.env.example` - 環境變數範本
- ✅ `README.md` - 專案說明
- ✅ `DEPLOYMENT.md` - 部署指南
- ✅ `QUICKSTART.md` - 快速開始
- ✅ `NOTION_SETUP.md` - Notion 設定
- ✅ `vercel.json` - Vercel 配置

所有文件中的 Database ID 都已更新為正確格式。

---

## 🛠️ 新增工具

### 1. 連線測試腳本 `test-notion.js`

現在你可以快速測試 Notion 連線：

```bash
# 安裝依賴
npm install

# 執行測試
npm run test:notion
```

這個腳本會：
- ✅ 檢查環境變數設定
- ✅ 驗證 Database ID 格式
- ✅ 測試 API 連線
- ✅ 查詢 Database 資料
- ✅ 檢查 Schema 欄位
- ❌ 如果失敗，會給出詳細的解決建議

### 2. 問題排查指南 `TROUBLESHOOTING.md`

完整的 404 錯誤排查清單，包括：
- Database ID 格式檢查
- Integration 連接步驟
- API Key 驗證方法
- 權限設定檢查
- 常見錯誤解決方案

---

## 🚀 下一步操作

### Step 1: 重新下載專案

下載更新後的 `id-kpi-dashboard-final.zip` (42 KB)

### Step 2: 設定 Notion

#### A. 建立 Integration（如果還沒有）

1. 前往：https://www.notion.so/my-integrations
2. 點擊 **"+ New integration"**
3. 設定：
   - Name: `ID KPI Dashboard`
   - Associated workspace: 選擇你的 workspace
4. 權限：
   - ✅ Read content
   - ✅ Update content
   - ✅ Insert content
5. 點擊 **Submit** 並複製 **Internal Integration Secret**

#### B. 連接 Database（重要！）

1. 開啟你的 Database：
   ```
   https://www.notion.so/ID-KPT-Dashboard-34a70322-0690-80a4-94e7-eb215fc307ec
   ```

2. 點擊右上角 **`...`** (更多選項)

3. 選擇 **"Add connections"**

4. 搜尋並選擇 **"ID KPI Dashboard"**

5. 點擊 **"Confirm"**

   ⚠️ **這步驟最重要！** 如果沒有連接，即使其他都設定正確也會 404。

#### C. 設定環境變數

編輯 `.env` 檔案：

```env
VITE_NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_NOTION_DATABASE_ID=34a70322-0690-80a4-94e7-eb215fc307ec
```

### Step 3: 測試連線

```bash
# 安裝依賴
npm install

# 測試 Notion 連線
npm run test:notion
```

如果看到：
```
✅ Notion API 連線正常
✅ Database 可以訪問
✅ 目前有 X 筆資料
🚀 你的 Dashboard 已準備就緒！
```

就表示成功了！

### Step 4: 啟動應用

```bash
npm run dev
```

開啟 http://localhost:3000，點擊「從 Notion 同步」按鈕測試。

---

## 📋 快速檢查清單

在啟動應用前，確認：

- [ ] Database ID 格式正確（包含連字號）
  ```
  34a70322-0690-80a4-94e7-eb215fc307ec ✅
  ```

- [ ] Integration 已建立並取得 API Key

- [ ] Database 已「Add connections」連接 Integration
  （這是最常被遺漏的步驟！）

- [ ] `.env` 檔案已建立並填入正確資訊

- [ ] 執行 `npm run test:notion` 測試通過

---

## 🆘 如果還是有問題

### 錯誤：404 NOT_FOUND

**檢查：**
1. Database ID 是否有連字號？
2. 是否在 Database 中「Add connections」？
3. Integration 是否在正確的 workspace？

### 錯誤：401 UNAUTHORIZED

**檢查：**
1. API Key 是否正確？
2. Integration 是否有足夠的權限？

### 錯誤：validation_error

**檢查：**
1. Database ID 格式是否正確？
2. 是否包含特殊字元？

---

## 📖 相關文件

- `TROUBLESHOOTING.md` - 詳細問題排查指南
- `NOTION_SETUP.md` - Notion Database 完整設定教學
- `QUICKSTART.md` - 3 分鐘快速開始

---

## 💡 小提示

**最快驗證方式：**

```bash
# 1. 解壓縮
unzip id-kpi-dashboard-final.zip
cd id-kpi-dashboard

# 2. 複製環境變數範本
cp .env.example .env

# 3. 編輯 .env 填入你的 API Key
# VITE_NOTION_API_KEY=你的key
# (Database ID 已經預填好了)

# 4. 安裝並測試
npm install
npm run test:notion
```

如果測試通過，你的設定就是正確的！

---

**🎉 更新內容已準備好，請下載最新版本的專案檔案！**
