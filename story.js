window.onload = function() {
  // 页面加载完毕后隐藏加载动画
  document.getElementById('loader').style.display = 'none';
};

// 微信弹窗相关
function openWechatModal() {
  document.getElementById('wechatModal').style.display = 'flex';
}
function closeWechatModal() {
  document.getElementById('wechatModal').style.display = 'none';
}
window.onclick = function(event) {
  if (event.target === document.getElementById('wechatModal')) {
    closeWechatModal();
  }
}

