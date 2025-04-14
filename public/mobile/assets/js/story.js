window.onload = function() {
  // 页面加载完毕后隐藏加载动画
  document.getElementById('loader').style.display = 'none';
};

function updateViewportHeight() {
  // 计算 1vh 的实际像素值
  const vh = window.innerHeight * 0.01;
  // 更新到 :root 变量 --vh
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 页面加载时初始化变量
window.addEventListener('load', updateViewportHeight);
// 当窗口尺寸变化时更新
window.addEventListener('resize', updateViewportHeight);


// ---------------------- 微信弹窗控制 ----------------------

// 打开微信弹窗
function openWechatModal() {
  document.getElementById('wechatModal').style.display = 'flex';
  document.body.style.overflow = 'hidden'; // 防止背景滚动
}

// 关闭微信弹窗
function closeWechatModal() {
  document.getElementById('wechatModal').style.display = 'none';
  document.body.style.overflow = ''; // 恢复滚动
}

// 点击背景遮罩关闭弹窗
window.addEventListener('touchstart', function (event) {
  const modal = document.getElementById('wechatModal');
  if (event.target === modal) {
    closeWechatModal();
  }
});

window.addEventListener('click', function (event) {
  const modal = document.getElementById('wechatModal');
  if (event.target === modal) {
    closeWechatModal();
  }
});

const socialItems = document.querySelectorAll('.social-item');
socialItems.forEach(item => {
  item.addEventListener('click', (e) => {
    // 防止点击外部关闭或触发其他事件
    e.stopPropagation();
    const qr = item.querySelector('.qr-code');
    // 切换显示状态
    if (qr.style.display === 'block') {
      qr.style.display = 'none';
    } else {
      qr.style.display = 'block';
    }
  });
});

// 点击其他地方隐藏所有二维码
document.addEventListener('click', () => {
  socialItems.forEach(item => {
    const qr = item.querySelector('.qr-code');
    if (qr) qr.style.display = 'none';
  });
});
