# 🔧 Notion 連線問題排查指南

## ❌ 常見錯誤：404 NOT_FOUND

如果你看到這個錯誤：
```
404: NOT_FOUND
Code: NOT_FOUND
ID: hkg1::cx4sk-xxxxxxxxx
```

## 📋 排查清單

### ✅ 步驟 1: 檢查 Database ID 格式

**正確格式**（UUID 含連字號）：
```
34a70322-0690-80a4-94e7-eb215fc307ec
```

**錯誤格式**（缺少連字號）：
```
34a70322069080a494e7eb215fc307ec  ❌
```

### 如何獲取正確的 Database ID？

#### 方法 1: 從 URL 提取（推薦）

你的 Notion Database URL：
```
https://www.notion.so/ID-KPT-Dashboard-34a70322069080a494e7eb215fc307ec
```

取最後一段 `34a70322069080a494e7eb215fc307ec`，然後按照這個模式加入連字號：

```
34a70322069080a494e7eb215fc307ec
↓
34a70322-0690-80a4-94e7-eb215fc307ec
```

規則：8-4-4-4-12 個字元

#### 方法 2: 使用 Share Link

1. 在 Notion Database 頁面點擊右上角 "Share"
2. 點擊 "Copy link"
3. 會得到類似：`https://www.notion.so/workspace/xxxxx?v=yyyy`
4. 取 `?` 前面的 ID 部分

#### 方法 3: 從 Integration 設定查看

1. 前往 https://www.notion.so/my-integrations
2. 選擇你的 Integration
3. 在 "Capabilities" 區域可以看到已連接的 databases

### ✅ 步驟 2: 確認 Integration 已連接

**重要！** 即使 Database ID 正確，如果 Integration 沒有權限，也會 404。

#### 連接步驟：

1. **開啟你的 Database**
   ```
   https://www.notion.so/ID-KPT-Dashboard-34a70322-0690-80a4-94e7-eb215fc307ec
   ```

2. **點擊右上角 `...` (更多選項)**

3. **選擇 "Add connections"**

4. **搜尋並選擇你的 Integration**
   - 名稱：ID KPI Dashboard（或你建立的名稱）

5. **確認連接**
   - 應該會看到 Integration 名稱出現在連接列表中

### ✅ 步驟 3: 檢查 API Key

確認你的 Integration Token 正確：

```bash
# 檢查 .env 檔案
cat .env

# 應該看到：
VITE_NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxx
VITE_NOTION_DATABASE_ID=34a70322-0690-80a4-94e7-eb215fc307ec
```

**API Key 格式**：
- 以 `secret_` 開頭
- 總長度約 50 字元
- 只包含字母、數字、底線

### ✅ 步驟 4: 驗證 Integration 權限

你的 Integration 需要這些權限：

- ✅ **Read content** - 讀取資料
- ✅ **Update content** - 更新資料  
- ✅ **Insert content** - 新增資料

檢查方式：
1. 前往 https://www.notion.so/my-integrations
2. 選擇你的 Integration
3. 查看 "Capabilities" 區域
4. 確認以上三個權限都已勾選

### ✅ 步驟 5: 測試連線

建立簡單的測試腳本：

```javascript
// test-notion.js
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'YOUR_NOTION_API_KEY',
});

const databaseId = '34a70322-0690-80a4-94e7-eb215fc307ec';

async function test() {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    console.log('✅ 連線成功！');
    console.log('Database 名稱:', response.title[0].plain_text);
  } catch (error) {
    console.error('❌ 連線失敗:', error.message);
    console.error('錯誤代碼:', error.code);
  }
}

test();
```

執行：
```bash
node test-notion.js
```

## 🔍 進階排查

### 問題：Database 是在 Workspace 裡面嗎？

如果你的 Database 在一個 Workspace 內部（不是根目錄），確認：

1. Integration 有權限訪問該 Workspace
2. Database 的 "parent" 設定正確

### 問題：使用團隊 Workspace？

團隊 Workspace 可能有額外的權限設定：

1. 確認你的帳號有權限管理 Integration
2. 詢問 Workspace 管理員是否啟用了 API 整合
3. 確認 Integration 在正確的 Workspace 下建立

### 問題：Database 是私人的嗎？

私人 Database 可能無法被 Integration 訪問：

1. 將 Database 設為 "Workspace" 層級
2. 或確保 Integration 有權限訪問你的個人頁面

## 📝 正確的環境變數設定

**本地開發 (.env)**
```env
VITE_NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_NOTION_DATABASE_ID=34a70322-0690-80a4-94e7-eb215fc307ec
```

**Vercel 部署**
```
Settings → Environment Variables

Name: VITE_NOTION_API_KEY
Value: secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Name: VITE_NOTION_DATABASE_ID
Value: 34a70322-0690-80a4-94e7-eb215fc307ec
```

## 🎯 快速檢查表

完成後打勾：

- [ ] Database ID 格式正確（含連字號）
- [ ] Integration 已建立
- [ ] Integration 權限完整（Read/Update/Insert）
- [ ] Database 已連接到 Integration
- [ ] API Key 已正確設定在 .env
- [ ] .env 檔案在 .gitignore 中
- [ ] Vercel 環境變數已設定（如果部署）

## 🆘 還是不行？

### 嘗試這些：

1. **重新建立 Integration**
   - 刪除舊的
   - 建立新的
   - 重新連接 Database

2. **檢查 Notion 狀態**
   - 前往 https://status.notion.so/
   - 確認 API 服務正常

3. **查看詳細錯誤訊息**
   ```javascript
   // 在 notionService.ts 加入更多 log
   console.log('Attempting to connect...');
   console.log('Database ID:', DATABASE_ID);
   console.log('API Key:', notion.auth.slice(0, 10) + '...');
   ```

4. **降級到簡單查詢**
   ```javascript
   // 先嘗試只 retrieve database
   const db = await notion.databases.retrieve({
     database_id: DATABASE_ID
   });
   console.log('Database found:', db.title);
   ```

## 📞 其他資源

- [Notion API 官方文件](https://developers.notion.com/)
- [Notion API 狀態頁面](https://status.notion.so/)
- [Notion Community](https://www.notion.so/community)

---

**💡 提示**：最常見的問題就是忘記在 Database 中 "Add connections" 連接 Integration！
