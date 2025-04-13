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
