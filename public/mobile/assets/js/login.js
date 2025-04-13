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
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      alert("请输入邮箱和密码");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("登录成功！");
        // 登录成功后可以跳转首页或后台页
        window.location.href = "/desktop/pages/home.html";
      } else {
        alert(data.message || "登录失败，请检查信息");
      }
    } catch (err) {
      console.error("登录请求失败：", err);
      alert("网络错误，请稍后再试");
    }
  });
});
