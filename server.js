const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 让 Express 能够服务静态资源（包括 HTML, CSS, JS 文件）
app.use(express.static(path.join(__dirname, 'public')));

// 设备判断中间件，判断用户设备是桌面端还是移动端
app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'].toLowerCase();
  if (/mobile/i.test(userAgent)) {
    // 如果是移动设备，跳转到移动端首页
    if (req.path === '/' || req.path === '/index.html') {
      res.redirect('/mobile/pages/home.html');
    }
  } else {
    // 如果是桌面设备，跳转到桌面端首页
    if (req.path === '/' || req.path === '/index.html') {
      res.redirect('/desktop/pages/home.html');
    }
  }
  next();
});

// 路由处理：根路径（首页跳转已处理，提供其他页面访问）
app.get('/desktop/pages/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'desktop', 'pages', 'home.html'));
});

app.get('/desktop/pages/product.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'desktop', 'pages', 'product.html'));
});

app.get('/desktop/pages/story.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'desktop', 'pages', 'story.html'));
});

app.get('/mobile/pages/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mobile', 'pages', 'home.html'));
});

app.get('/mobile/pages/product.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mobile', 'pages', 'product.html'));
});

app.get('/mobile/pages/story.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mobile', 'pages', 'story.html'));
});

// 监听端口
app.listen(port, () => {
  console.log(`服务器正在运行在 http://localhost:${port}`);
});
