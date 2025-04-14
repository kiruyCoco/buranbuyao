window.onload = function() {
  // 页面加载完毕后隐藏加载动画
  document.getElementById('loader').style.display = 'none';
};

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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!username || !email || !password) {
      alert("请填写完整信息");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("注册成功！");
        window.location.href = "/desktop/pages/login.html";
      } else {
        alert(data.message || "注册失败，请重试");
      }
    } catch (err) {
      console.error("注册请求失败：", err);
      alert("网络错误，请稍后重试");
    }
  });
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
