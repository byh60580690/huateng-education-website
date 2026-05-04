# 华腾集团官方网站

华腾集团是一家高端且专业的留学教育集团，专注于本科、研究生留学申请，尤其在香港学士升学领域拥有深厚积累。本项目为华腾集团官方网站，采用前后端分离架构，涵盖集团介绍、业务展示、企业文化、合作加盟、多语言切换及 AI 智能问答等功能。

## 技术栈

- **前端**：React 19 + TypeScript + Vite + React Router v7 + react-i18next
- **后端**：Node.js + Express + TypeScript
- **AI 服务**：阿里云通义千问 API（兼容 OpenAI 格式）
- **样式方案**：CSS Modules + CSS Variables 主题系统
- **测试**：Vitest + fast-check（属性基测试）

## 目录结构

```
├── client/                     # 前端项目
│   ├── public/                 # 静态资源
│   ├── src/
│   │   ├── components/         # 公共组件（Navbar、Footer、AIAssistant、Lightbox）
│   │   ├── pages/              # 页面组件（Home、About、Business、Culture、Cooperation）
│   │   ├── i18n/               # 国际化翻译文件（zh-CN、zh-TW、en）
│   │   ├── styles/             # 全局样式与主题变量
│   │   ├── hooks/              # 自定义 Hooks
│   │   ├── services/           # API 服务层
│   │   ├── utils/              # 工具函数（表单验证等）
│   │   ├── App.tsx             # 应用根组件
│   │   └── main.tsx            # 入口文件
│   ├── vite.config.ts          # Vite 配置（含开发代理）
│   └── package.json
├── server/                     # 后端项目
│   ├── src/
│   │   ├── index.ts            # 服务入口
│   │   ├── routes/             # API 路由（contact、ai）
│   │   └── middleware/         # 中间件（CORS）
│   ├── .env.example            # 环境变量模板
│   ├── tsconfig.json
│   └── package.json
└── README.md
```

## 环境要求

- Node.js >= 18
- npm >= 9

## 快速开始

### 1. 安装依赖

```bash
# 前端依赖
cd client
npm install

# 后端依赖
cd ../server
npm install
```

### 2. 配置环境变量

在 `server/` 目录下创建 `.env` 文件（参考 `.env.example`）：

```env
PORT=3001
ALLOWED_ORIGINS=http://localhost:5173
QWEN_API_KEY=your_qwen_api_key_here
QWEN_API_URL=https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
```

#### 配置千问 API Key

1. 访问 [阿里云百炼平台](https://bailian.console.aliyun.com/) 注册并获取 API Key
2. 将获取的 API Key 填入 `server/.env` 文件中的 `QWEN_API_KEY` 字段
3. 如未配置 API Key，AI 问答功能将自动禁用，其他功能不受影响

### 3. 启动项目

#### 启动后端服务

```bash
cd server
npm run dev
```

后端服务默认运行在 `http://localhost:3001`。

#### 启动前端开发服务器

```bash
cd client
npm run dev
```

前端开发服务器默认运行在 `http://localhost:5173`，已配置代理将 `/api` 请求转发至后端。

### 4. 构建生产版本

```bash
# 前端构建
cd client
npm run build    # 输出到 client/dist/

# 后端编译
cd ../server
npm run build    # 输出到 server/dist/
```

## 主要功能

- **多页面导航**：首页、关于我们、集团业务、企业文化、合作加盟
- **多语言支持**：中文简体、中文繁体、英文三语切换
- **AI 智能问答**：基于千问 API 的留学咨询助手
- **合作表单**：联系表单提交与服务端验证
- **响应式布局**：适配桌面端、平板端、移动端
- **主题系统**：基于 CSS 变量的可配置深蓝色调主题

## 部署到阿里云

### 基本步骤

1. **准备云服务器**：购买阿里云 ECS 实例，安装 Node.js 环境

2. **上传代码**：将项目代码上传至服务器

3. **构建前端**：
   ```bash
   cd client && npm install && npm run build
   ```

4. **配置后端**：
   ```bash
   cd server && npm install && npm run build
   cp .env.example .env
   # 编辑 .env 填入生产环境配置
   ```

5. **启动后端服务**：
   ```bash
   cd server && node dist/index.js
   ```
   建议使用 PM2 进行进程管理：
   ```bash
   npm install -g pm2
   pm2 start server/dist/index.js --name huateng-server
   ```

6. **配置 Nginx**：
   - 将前端 `client/dist/` 目录配置为静态文件服务
   - 将 `/api` 路径反向代理到后端服务（默认 3001 端口）
   - 配置 SSL 证书启用 HTTPS

7. **配置域名**：在阿里云 DNS 解析中添加域名记录指向服务器 IP
