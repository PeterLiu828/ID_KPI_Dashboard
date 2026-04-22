#!/bin/bash

# ID KPI Dashboard - 快速設定腳本

echo "🚀 ID KPI Dashboard 快速設定"
echo "================================"
echo ""

# 檢查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 找不到 Node.js，請先安裝 Node.js 18 或更高版本"
    echo "   下載: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本過舊，需要 18 或更高版本"
    echo "   目前版本: $(node -v)"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo ""

# 安裝依賴
echo "📦 安裝專案依賴..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依賴安裝失敗"
    exit 1
fi

echo "✅ 依賴安裝完成"
echo ""

# 檢查 .env 檔案
if [ ! -f ".env" ]; then
    echo "📝 建立 .env 檔案..."
    cp .env.example .env
    echo "✅ .env 檔案已建立"
    echo ""
    echo "⚠️  請編輯 .env 檔案並填入你的 Notion 設定:"
    echo "   VITE_NOTION_API_KEY=你的_notion_integration_token"
    echo "   VITE_NOTION_DATABASE_ID=34a70322069080a494e7eb215fc307ec"
    echo ""
    echo "📖 詳細設定步驟請參考 DEPLOYMENT.md"
    echo ""
else
    echo "✅ .env 檔案已存在"
    echo ""
fi

# 詢問是否啟動開發伺服器
read -p "🎯 是否立即啟動開發伺服器? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 啟動開發伺服器..."
    echo "   瀏覽器將自動開啟 http://localhost:3000"
    echo ""
    npm run dev
else
    echo ""
    echo "✅ 設定完成！"
    echo ""
    echo "📌 下一步:"
    echo "   1. 編輯 .env 檔案設定 Notion API"
    echo "   2. 執行 'npm run dev' 啟動開發伺服器"
    echo "   3. 執行 'npm run build' 建置生產版本"
    echo ""
    echo "📖 完整文件請參考 README.md 和 DEPLOYMENT.md"
    echo ""
fi
