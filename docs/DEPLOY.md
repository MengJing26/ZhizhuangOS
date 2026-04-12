# 智装OS - 服务器部署指南

## 📋 部署前准备

### 1. 域名准备
- 已备案域名：`openclaw.cn` 和 `www.openclaw.cn`
- 域名解析到服务器IP地址

### 2. 服务器要求
- 操作系统：Linux (推荐 Ubuntu 20.04+ 或 CentOS 7+)
- Web服务器：Nginx 1.18+ 或 Apache 2.4+
- SSL证书：Let's Encrypt 免费证书或商业证书
- 内存：至少 512MB
- 磁盘空间：至少 1GB

## 🚀 部署步骤

### 方案一：Nginx部署（推荐）

#### 1. 安装Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install epel-release
sudo yum install nginx
```

#### 2. 上传网站文件
```bash
# 创建网站目录
sudo mkdir -p /var/www/openclaw

# 上传文件到服务器（使用scp或ftp）
scp -r ./* user@your-server:/var/www/openclaw/

# 设置权限
sudo chown -R www-data:www-data /var/www/openclaw
sudo chmod -R 755 /var/www/openclaw
```

#### 3. 配置SSL证书

**使用Let's Encrypt免费证书：**
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 自动获取并配置证书
sudo certbot --nginx -d openclaw.cn -d www.openclaw.cn

# 自动续期
sudo certbot renew --dry-run
```

**或使用商业证书：**
```bash
# 创建SSL目录
sudo mkdir -p /etc/nginx/ssl

# 上传证书文件
sudo cp your-certificate.crt /etc/nginx/ssl/openclaw.cn.crt
sudo cp your-private.key /etc/nginx/ssl/openclaw.cn.key

# 设置权限
sudo chmod 600 /etc/nginx/ssl/openclaw.cn.key
```

#### 4. 配置Nginx
```bash
# 复制配置文件
sudo cp nginx.conf /etc/nginx/sites-available/openclaw

# 创建软链接
sudo ln -s /etc/nginx/sites-available/openclaw /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 方案二：Apache部署

#### 1. 安装Apache
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install apache2

# CentOS/RHEL
sudo yum install httpd
```

#### 2. 上传网站文件
```bash
# 创建网站目录
sudo mkdir -p /var/www/html/openclaw

# 上传文件
scp -r ./* user@your-server:/var/www/html/openclaw/

# 设置权限
sudo chown -R www-data:www-data /var/www/html/openclaw
sudo chmod -R 755 /var/www/html/openclaw
```

#### 3. 启用必要模块
```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod deflate
sudo a2enmod ssl
```

#### 4. 配置SSL证书
```bash
# 使用Let's Encrypt
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d openclaw.cn -d www.openclaw.cn
```

#### 5. 重启Apache
```bash
sudo systemctl restart apache2
sudo systemctl enable apache2
```

## 🔧 性能优化建议

### 1. 启用HTTP/2
Nginx配置中已包含 `http2` 参数，确保使用HTTPS。

### 2. 启用Gzip压缩
配置文件中已包含Gzip压缩设置。

### 3. 配置CDN（可选）
推荐CDN服务商：
- 阿里云CDN
- 腾讯云CDN
- Cloudflare（免费）

### 4. 图片优化
- 使用WebP格式替代PNG/JPG
- 压缩图片大小
- 使用懒加载技术

## 🔒 安全配置

### 1. 防火墙设置
```bash
# Ubuntu UFW
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# CentOS Firewalld
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

### 2. 定期更新
```bash
# 定期更新系统和软件
sudo apt update && sudo apt upgrade -y
```

## 📊 监控与维护

### 1. 日志查看
```bash
# Nginx访问日志
tail -f /var/log/nginx/openclaw_access.log

# Nginx错误日志
tail -f /var/log/nginx/openclaw_error.log
```

### 2. 性能监控
推荐工具：
- Nginx Amplify
- PM2 (如果使用Node.js)
- Grafana + Prometheus

## 🌐 SEO优化检查清单

- [x] 添加完整的meta标签
- [x] 配置robots.txt
- [x] 创建sitemap.xml
- [x] 添加结构化数据（JSON-LD）
- [x] 配置canonical标签
- [x] 优化Open Graph标签
- [x] 添加Twitter Card标签
- [x] 启用HTTPS
- [x] 配置HSTS
- [x] 优化页面加载速度
- [x] 移动端友好

## 📝 常见问题

### Q1: 如何更新网站内容？
```bash
# 备份当前版本
sudo cp -r /var/www/openclaw /var/www/openclaw.backup

# 上传新文件
scp -r ./* user@your-server:/var/www/openclaw/

# 清除浏览器缓存（如果需要）
# 在HTML文件中添加版本号：style.css?v=1.0.1
```

### Q2: 如何查看网站状态？
```bash
# 检查Nginx状态
sudo systemctl status nginx

# 检查端口占用
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443
```

### Q3: 如何配置自动备份？
```bash
# 创建备份脚本
cat > /root/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /root/backups/openclaw_$DATE.tar.gz /var/www/openclaw
find /root/backups -name "openclaw_*.tar.gz" -mtime +7 -delete
EOF

# 设置定时任务
crontab -e
# 每天凌晨2点备份
0 2 * * * /root/backup.sh
```

## 🎉 部署完成

部署完成后，请测试以下内容：
1. 访问 https://www.openclaw.cn 确认网站正常
2. 测试所有页面链接
3. 检查SSL证书是否有效
4. 测试支付功能
5. 检查移动端显示效果

## 📞 技术支持

如有问题，请联系：
- QQ: 1025466935
- 微信: imitao520
