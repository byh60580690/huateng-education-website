# 华腾集团官网部署指南

本文档介绍如何将项目部署到阿里云 ECS 服务器。

---

## 一、服务器准备

### 1.1 购买阿里云 ECS

| 配置项 | 推荐配置 |
|--------|----------|
| 实例规格 | 2核4G 或以上 |
| 操作系统 | Ubuntu 22.04 LTS 或 CentOS 8 |
| 带宽 | 3Mbps 或以上 |
| 系统盘 | 40GB |

### 1.2 安全组配置

在阿里云控制台配置安全组，开放以下端口：

| 端口 | 用途 |
|------|------|
| 22 | SSH 登录 |
| 80 | HTTP |
| 443 | HTTPS |
| 3001 | 后端服务（可选，内网访问） |

### 1.3 连接服务器

```bash
ssh root@你的服务器公网IP
```

---

## 二、服务器环境安装

### 2.1 更新系统

**Ubuntu:**
```bash
apt update && apt upgrade -y
```

**CentOS:**
```bash
yum update -y
```

### 2.2 安装 Node.js

```bash
# 安装 Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 验证安装
node -v   # 应显示 v20.x.x
npm -v    # 应显示 10.x.x
```

### 2.3 安装 PM2（进程管理）

```bash
npm install -g pm2
```

### 2.4 安装 Nginx

**Ubuntu:**
```bash
apt install -y nginx
```

**CentOS:**
```bash
yum install -y nginx
```

### 2.5 安装 Git

```bash
apt install -y git   # Ubuntu
yum install -y git   # CentOS
```

---

## 三、上传代码到服务器

### 方式一：Git 拉取（推荐）

```bash
# 创建项目目录
mkdir -p /var/www
cd /var/www

# 克隆代码（替换为你的仓库地址）
git clone https://github.com/BryanBai001/huateng-education-website.git

# 或者使用 Gitee 国内加速
git clone https://gitee.com/你的用户名/huateng-education-website.git
```

### 方式二：SCP 上传

在本地电脑执行：
```bash
# 打包项目
cd huateng-education-website
tar -czvf ../huateng.tar.gz .

# 上传到服务器
scp ../huateng.tar.gz root@你的服务器IP:/var/www/

# 在服务器上解压
ssh root@你的服务器IP
cd /var/www
mkdir -p huateng-education-website
tar -xzvf huateng.tar.gz -C huateng-education-website/
```

---

## 四、配置后端服务

### 4.1 安装依赖并构建

```bash
cd /var/www/huateng-education-website/server

# 安装依赖
npm install

# 构建 TypeScript
npm run build

# 如果报错：
# 删除旧的依赖
rm -rf node_modules package-lock.json
# 重新安装（不用 sudo）
npm install
# 构建
npm run build

```

### 4.2 配置环境变量

```bash
# 创建 .env 文件
cat > .env << 'EOF'
# 服务端口
PORT=3001

# 允许的前端域名（替换为你的域名）
# ALLOWED_ORIGINS=http://你的域名.com,https://你的域名.com,http://你的服务器IP
ALLOWED_ORIGINS=http://8.219.0.15

# 千问 API 配置
# QWEN_API_KEY=你的千问API密钥
# QWEN_API_URL=https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
QWEN_API_KEY=sk-4a7875dda9f742f7804ec6ccff05dcaf
QWEN_API_URL=https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
EOF
```

### 4.3 使用 PM2 启动后端

```bash
# 启动服务
pm2 start dist/index.js --name huateng-server

# 查看状态
pm2 status

# 查看日志
pm2 logs huateng-server

# 设置开机自启
pm2 startup
pm2 save
```

---

## 五、构建前端项目

### 5.1 修改 API 地址

如果前端需要直接访问后端 API，需要修改 `client/src/services/api.ts`（当前架构无需修改）：

```typescript
// 开发环境使用代理，生产环境直接访问后端
const API_BASE = import.meta.env.PROD ? 'http://你的域名.com' : '';

export async function sendAIChatMessage(request: AIChatRequest): Promise<AIChatResponse> {
  const response = await fetch(`${API_BASE}/api/ai/chat`, {
    // ...
  });
}
```

### 5.2 构建前端

```bash
cd /var/www/huateng-education-website/client

# 安装依赖
npm install

# 构建
npm run build
```

构建完成后，静态文件位于 `client/dist` 目录。

---

## 六、配置 Nginx

### 6.1 创建 Nginx 配置

```bash
cat > /etc/nginx/sites-available/huateng << 'EOF'
server {
    listen 80;
    server_name 你的域名.com www.你的域名.com 你的服务器IP;

    # 前端静态文件
    root /var/www/huateng-education-website/client/dist;
    index index.html;

    # 前端路由 - 所有路由都返回 index.html（SPA 应用）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理到后端
    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
EOF

示例：
cat > /etc/nginx/sites-available/huateng << 'EOF'
server {
    listen 80;
    server_name 8.219.0.15;

    # 前端静态文件
    root /var/www/huateng-education-website/client/dist;
    index index.html;

    # 前端路由 - 所有路由都返回 index.html（SPA 应用）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理到后端
    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
EOF

# 启用配置
ln -s /etc/nginx/sites-available/huateng /etc/nginx/sites-enabled/

# 删除默认配置（可选）
rm -f /etc/nginx/sites-enabled/default
```

### 6.2 测试并重启 Nginx

```bash
# 测试配置
nginx -t

# 重启 Nginx
systemctl restart nginx

# 设置开机自启
systemctl enable nginx
```

---

## 七、域名配置（可选但推荐）

### 7.1 域名解析

在阿里云域名控制台添加 A 记录：

| 记录类型 | 主机记录 | 记录值 |
|----------|----------|--------|
| A | @ | 你的服务器IP |
| A | www | 你的服务器IP |

### 7.2 配置 HTTPS（SSL 证书）

#### 方式一：阿里云免费证书

1. 在阿里云 SSL 证书控制台申请免费证书
2. 下载 Nginx 格式证书
3. 上传到服务器：

```bash
# 创建证书目录
mkdir -p /etc/nginx/ssl

# 上传证书文件（在本地执行）
scp your-domain.pem root@你的服务器IP:/etc/nginx/ssl/
scp your-domain.key root@你的服务器IP:/etc/nginx/ssl/
```

4. 修改 Nginx 配置：

```bash
cat > /etc/nginx/sites-available/huateng << 'EOF'
# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name 你的域名.com www.你的域名.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name 你的域名.com www.你的域名.com;

    # SSL 证书
    ssl_certificate /etc/nginx/ssl/your-domain.pem;
    ssl_certificate_key /etc/nginx/ssl/your-domain.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # 前端静态文件
    root /var/www/huateng-education-website/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
EOF

# 重启 Nginx
systemctl restart nginx
```

#### 方式二：Let's Encrypt 免费证书

```bash
# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 自动配置 SSL
certbot --nginx -d 你的域名.com -d www.你的域名.com

# 设置自动续期
certbot renew --dry-run
```

### 7.3 更新后端环境变量

配置 HTTPS 后，更新 `server/.env`：

```bash
ALLOWED_ORIGINS=https://你的域名.com,https://www.你的域名.com
```

然后重启后端服务：
```bash
pm2 restart huateng-server
```

---

## 八、常用运维命令

### PM2 相关

```bash
pm2 status              # 查看服务状态
pm2 logs huateng-server # 查看日志
pm2 restart huateng-server  # 重启服务
pm2 stop huateng-server     # 停止服务
pm2 monit               # 监控面板
```

### Nginx 相关

```bash
systemctl status nginx  # 查看状态
systemctl restart nginx # 重启
nginx -t                # 测试配置
tail -f /var/log/nginx/access.log  # 访问日志
tail -f /var/log/nginx/error.log   # 错误日志
```

### 更新部署

```bash
cd /var/www/huateng-education-website

# 拉取最新代码
git pull

# 更新后端
cd server
npm install
npm run build
pm2 restart huateng-server

# 更新前端
cd ../client
npm install
npm run build
```

---

## 九、故障排查

### 9.1 网站无法访问

1. 检查 Nginx 状态：`systemctl status nginx`
2. 检查防火墙：`ufw status` 或 `firewall-cmd --list-all`
3. 检查安全组是否开放端口

### 9.2 API 请求失败

1. 检查后端服务：`pm2 logs huateng-server`
2. 检查环境变量：`cat /var/www/huateng-education-website/server/.env`
3. 测试后端健康检查：`curl http://localhost:3001/api/health`

### 9.3 AI 功能不工作

1. 检查 `QWEN_API_KEY` 是否配置正确
2. 查看后端日志：`pm2 logs huateng-server | grep -i qwen`

---

## 十、部署架构图

```
用户浏览器
    ↓
阿里云 ECS
    ↓
Nginx (80/443)
    ├── /           → 前端静态文件 (client/dist)
    └── /api/*      → 反向代理到后端 (127.0.0.1:3001)
            ↓
        Node.js + Express (PM2 管理)
            ↓
        阿里云千问 API
```

---

## 十一、临时部署（无域名，使用 IP 访问）

如果没有域名，可以临时使用公网 IP 方式访问。

### 11.1 安全组配置

只需开放以下端口：

| 端口 | 用途 |
|------|------|
| 22 | SSH 登录 |
| 80 | HTTP（Web 访问） |

### 11.2 后端配置

```bash
cd /var/www/huateng-education-website/server

# 配置环境变量（替换 YOUR_SERVER_IP 为你的公网IP）
cat > .env << 'EOF'
PORT=3001
ALLOWED_ORIGINS=http://YOUR_SERVER_IP
QWEN_API_KEY=你的千问API密钥
QWEN_API_URL=https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
EOF

# 安装、构建、启动
npm install && npm run build
pm2 start dist/index.js --name huateng-server
pm2 startup && pm2 save
```

### 11.3 前端构建

前端代码无需修改，Nginx 会代理 `/api` 请求到后端。

```bash
cd /var/www/huateng-education-website/client
npm install && npm run build
```

### 11.4 Nginx 配置（使用 IP 访问）

```bash
# 创建配置（server_name 使用 _ 匹配所有）
cat > /etc/nginx/sites-available/huateng << 'EOF'
server {
    listen 80 default_server;
    server_name _;

    # 前端静态文件
    root /var/www/huateng-education-website/client/dist;
    index index.html;

    # 前端路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理到后端
    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
EOF

# 删除默认配置，启用新配置
rm -f /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/huateng /etc/nginx/sites-enabled/

# 测试并重启
nginx -t && systemctl restart nginx
```

### 11.5 访问地址

```
http://你的公网IP/
```

例如：`http://123.45.67.89/`

### 11.6 一键部署脚本（临时 IP 版）

```bash
#!/bin/bash
# 保存为 deploy-ip.sh，修改下面的变量后执行

SERVER_IP="123.45.67.89"        # 改成你的公网IP
QWEN_KEY="sk-xxxxxxxx"          # 改成你的千问API密钥
PROJECT_DIR="/var/www/huateng-education-website"

echo "=== 开始部署 ==="

# 后端
echo ">>> 配置后端..."
cd $PROJECT_DIR/server
cat > .env << EOF
PORT=3001
ALLOWED_ORIGINS=http://${SERVER_IP}
QWEN_API_KEY=${QWEN_KEY}
QWEN_API_URL=https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
EOF
npm install --quiet && npm run build
pm2 delete huateng-server 2>/dev/null
pm2 start dist/index.js --name huateng-server
pm2 save

# 前端
echo ">>> 构建前端..."
cd ../client
npm install --quiet && npm run build

# Nginx
echo ">>> 配置 Nginx..."
cat > /etc/nginx/sites-available/huateng << 'NGINX_EOF'
server {
    listen 80 default_server;
    server_name _;
    root /var/www/huateng-education-website/client/dist;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
NGINX_EOF
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/huateng /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

echo ""
echo "=== 部署完成 ==="
echo "访问地址: http://${SERVER_IP}/"
```

使用方法：
```bash
# 1. 修改脚本中的 SERVER_IP 和 QWEN_KEY
vim deploy-ip.sh

# 2. 执行部署
chmod +x deploy-ip.sh
./deploy-ip.sh
```

---

## 十二、快速部署清单

### 域名部署
- [ ] 购买 ECS 并配置安全组（22, 80, 443）
- [ ] SSH 连接服务器
- [ ] 安装 Node.js、PM2、Nginx、Git
- [ ] 上传代码到 /var/www/
- [ ] 配置 server/.env 环境变量
- [ ] 构建并启动后端
- [ ] 构建前端
- [ ] 配置 Nginx
- [ ] 配置域名解析
- [ ] 配置 HTTPS 证书
- [ ] 测试网站功能

### 临时 IP 部署
- [ ] 购买 ECS 并配置安全组（22, 80）
- [ ] SSH 连接服务器
- [ ] 安装 Node.js、PM2、Nginx、Git
- [ ] 上传代码到 /var/www/
- [ ] 配置 server/.env（ALLOWED_ORIGINS=http://你的IP）
- [ ] 构建并启动后端
- [ ] 构建前端
- [ ] 配置 Nginx（server_name _）
- [ ] 测试访问 http://你的IP/
