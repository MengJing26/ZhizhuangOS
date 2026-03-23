const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const basicAuth = require('basic-auth');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'database.db');
const UPLOAD_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(express.json());
app.use(express.static(__dirname));
app.use('/uploads', express.static(UPLOAD_DIR));

const db = new sqlite3.Database(DB_PATH);
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS price_config (
    system TEXT PRIMARY KEY,
    regular_price REAL NOT NULL,
    discount_price REAL,
    discount_enabled BOOLEAN DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS user_stats (
    user_key TEXT NOT NULL,
    system TEXT NOT NULL,
    last_order_date DATE,
    order_count INTEGER DEFAULT 0,
    total_spent REAL DEFAULT 0,
    PRIMARY KEY (user_key, system)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    system TEXT NOT NULL,
    user_key TEXT NOT NULL,
    price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    download_link TEXT,
    activation_code TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    paid_at DATETIME,
    note TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS payment_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alipay_qr TEXT,
    wechat_qr TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.get("SELECT COUNT(*) as cnt FROM price_config", (err, row) => {
    if (row.cnt === 0) {
      const stmt = db.prepare("INSERT INTO price_config (system, regular_price, discount_price, discount_enabled) VALUES (?, ?, ?, ?)");
      stmt.run('xp', 6.6, 2.0, 1);
      stmt.run('win7', 7.7, 2.0, 1);
      stmt.run('win10', 8.8, 2.0, 1);
      stmt.run('win11', 9.9, 2.0, 1);
      stmt.finalize();
    }
  });
  db.get("SELECT COUNT(*) as cnt FROM payment_settings", (err, row) => {
    if (row.cnt === 0) db.run("INSERT INTO payment_settings (id) VALUES (1)");
  });
});

function generateOrderId() {
  return 'ORD-' + Date.now().toString(36).toUpperCase() + '-' + crypto.randomBytes(3).toString('hex').toUpperCase();
}
function generateActivationCode(system) {
  return system.toUpperCase() + '-ACT-' + Date.now().toString(36).toUpperCase() + '-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}
function getBeijingDate() {
  const now = new Date();
  const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  return beijingTime.toISOString().split('T')[0];
}

function adminAuth(req, res, next) {
  const user = basicAuth(req);
  if (user && user.name === 'admin' && user.pass === '809152') return next();
  res.set('WWW-Authenticate', 'Basic realm="Admin"');
  res.status(401).send('Authentication required');
}

app.get('/api/price-config', (req, res) => {
  db.all("SELECT * FROM price_config", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const config = {};
    rows.forEach(r => { config[r.system] = { regular_price: r.regular_price, discount_price: r.discount_price, discount_enabled: !!r.discount_enabled }; });
    res.json(config);
  });
});

app.post('/api/orders', (req, res) => {
  const { system, user_key } = req.body;
  if (!system || !user_key) return res.status(400).json({ error: '缺少必要参数' });
  const today = getBeijingDate();
  db.get("SELECT * FROM price_config WHERE system = ?", [system], (err, config) => {
    if (err || !config) return res.status(500).json({ error: '系统配置不存在' });
    db.get("SELECT * FROM user_stats WHERE user_key = ? AND system = ?", [user_key, system], (err, stats) => {
      const isFirstOrderToday = !stats || stats.last_order_date !== today;
      let finalPrice = config.regular_price;
      if (config.discount_enabled && config.discount_price && isFirstOrderToday) finalPrice = config.discount_price;
      const orderId = generateOrderId();
      const now = new Date().toISOString();
      db.run("INSERT INTO orders (id, system, user_key, price, status, created_at) VALUES (?, ?, ?, ?, ?, ?)", [orderId, system, user_key, finalPrice, 'pending', now], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (!stats) {
          db.run("INSERT INTO user_stats (user_key, system, last_order_date, order_count, total_spent) VALUES (?, ?, ?, ?, ?)", [user_key, system, today, 1, finalPrice]);
        } else {
          db.run("UPDATE user_stats SET order_count = order_count + 1, total_spent = total_spent + ?, last_order_date = ? WHERE user_key = ? AND system = ?", [finalPrice, today, user_key, system]);
        }
        res.json({ orderId, system, price: finalPrice, isFirstOrderToday, status: 'pending' });
      });
    });
  });
});

app.get('/api/orders/:id', (req, res) => {
  db.get("SELECT * FROM orders WHERE id = ?", [req.params.id], (err, order) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!order) return res.status(404).json({ error: '订单不存在' });
    res.json({ orderId: order.id, system: order.system, price: order.price, status: order.status, downloadLink: order.download_link, activationCode: order.activation_code });
  });
});

app.get('/api/payment-settings', (req, res) => {
  db.get("SELECT alipay_qr, wechat_qr FROM payment_settings WHERE id = 1", (err, row) => {
    if (err || !row) return res.status(500).json({ error: '未配置收款码' });
    res.json({ alipay_qr: row.alipay_qr ? `/uploads/${row.alipay_qr}` : null, wechat_qr: row.wechat_qr ? `/uploads/${row.wechat_qr}` : null });
  });
});

const upload = multer({ dest: UPLOAD_DIR, limits: { fileSize: 5 * 1024 * 1024 } });
app.post('/api/admin/payment-settings', adminAuth, upload.fields([{ name: 'alipay', maxCount: 1 }, { name: 'wechat', maxCount: 1 }]), (req, res) => {
  const alipayFile = req.files['alipay'] ? req.files['alipay'][0] : null;
  const wechatFile = req.files['wechat'] ? req.files['wechat'][0] : null;
  const updates = [], values = [];
  if (alipayFile) { updates.push('alipay_qr = ?'); values.push(alipayFile.filename); }
  if (wechatFile) { updates.push('wechat_qr = ?'); values.push(wechatFile.filename); }
  if (updates.length === 0) return res.status(400).json({ error: '没有上传文件' });
  values.push(1);
  const sql = `UPDATE payment_settings SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  db.run(sql, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: '收款码更新成功' });
  });
});

app.get('/api/admin/orders', adminAuth, (req, res) => {
  const { status, date, page = 1, limit = 50 } = req.query;
  const offset = (page - 1) * limit;
  let where = '1=1', params = [];
  if (status) { where += ' AND status = ?'; params.push(status); }
  if (date) { where += ' AND date(created_at) = ?'; params.push(date); }
  db.all(`SELECT * FROM orders WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ orders: rows, page: parseInt(page), limit: parseInt(limit) });
  });
});

app.post('/api/admin/orders/:id/confirm', adminAuth, (req, res) => {
  const orderId = req.params.id;
  db.get("SELECT * FROM orders WHERE id = ?", [orderId], (err, order) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!order) return res.status(404).json({ error: '订单不存在' });
    if (order.status === 'paid' || order.status === 'completed') return res.status(400).json({ error: '订单已处理' });
    const activationCode = generateActivationCode(order.system);
    const downloadLink = `${req.protocol}://${req.get('host')}/script?order=${orderId}`;
    db.run("UPDATE orders SET status='paid', paid_at=CURRENT_TIMESTAMP, download_link=?, activation_code=? WHERE id=?", [downloadLink, activationCode, orderId], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, orderId, downloadLink, activationCode });
    });
  });
});

app.get('/api/admin/price-config', adminAuth, (req, res) => {
  db.all("SELECT * FROM price_config", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ config: rows });
  });
});

app.post('/api/admin/price-config', adminAuth, (req, res) => {
  const { system, regular_price, discount_price, discount_enabled } = req.body;
  if (!system) return res.status(400).json({ error: '缺少系统参数' });
  db.run("UPDATE price_config SET regular_price=?, discount_price=?, discount_enabled=?, updated_at=CURRENT_TIMESTAMP WHERE system=?", [regular_price, discount_price, discount_enabled ? 1 : 0, system], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: `${system} 价格配置已更新` });
  });
});

app.get('/script', (req, res) => {
  const { order } = req.query;
  if (!order) return res.status(400).send('缺少订单号');
  db.get("SELECT * FROM orders WHERE id = ? AND status='paid'", [order], (err, order) => {
    if (err || !order) return res.status(404).send('订单不存在或未支付');
    const script = `@echo off
:: 智装OS - ${order.system.toUpperCase()} 自动安装脚本
:: 订单号: ${order.id}
:: 激活码: ${order.activation_code}
echo ================================
echo  智装OS 自动安装程序
echo ================================
echo.
echo 系统版本: ${order.system.toUpperCase()}
echo 激活码: ${order.activation_code}
echo.
echo 步骤1: 请先从微软官网下载系统镜像 (ISO 文件)
echo   Win10 下载: https://www.microsoft.com/software-download/windows10ISO
echo   Win11 下载: https://www.microsoft.com/software-download/windows11
echo   或者使用我们提供的网盘链接（稍后补充）
echo.
echo 步骤2: 加载镜像到虚拟光驱，运行 setup.exe
echo.
echo 激活: 安装完成后，在设置中输入激活码
echo.
pause`;
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.send(script);
  });
});

app.get('/download', (req, res) => {
  const { order } = req.query;
  if (!order) return res.status(400).send('缺少订单号');
  db.get("SELECT * FROM orders WHERE id = ? AND status='paid'", [order], (err, order) => {
    if (err || !order) return res.status(404).send('订单不存在或未支付');
    const downloadLink = `${req.protocol}://${req.get('host')}/script?order=${order.id}`;
    res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>下载安装命令</title></head><body><h1>✅ 支付成功</h1><p>系统版本: ${order.system}</p><p>激活码: ${order.activation_code}</p><h3>⚡ 安装命令</h3><p>以管理员身份打开 CMD，运行：</p><pre>bitsadmin /transfer reinstall ${downloadLink} %cd%\\1.cmd & 1.cmd #u</pre><a href="${downloadLink}">直接下载安装脚本</a></body></html>`);
  });
});

app.get('/admin', adminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 智装OS 服务器已启动`);
  console.log(`📍 前台：http://localhost:${PORT}`);
  console.log(`🔐 后台：http://localhost:${PORT}/admin (Basic Auth: admin / 809152)`);
});
