// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取图标按钮元素
    const searchIcon = document.querySelector('.search-icon');
    const menuIcon = document.querySelector('.menu-icon');
    
    // 为搜索图标添加点击事件
    searchIcon.addEventListener('click', function() {
      alert('搜索功能即将上线');
    });
    
    // 为菜单图标添加点击事件
    menuIcon.addEventListener('click', function() {
      // 检查是否已存在菜单
      let mobileMenu = document.querySelector('.mobile-menu');
      
      if (mobileMenu) {
        // 如果菜单存在，则移除它
        mobileMenu.remove();
        return;
      }
      
      // 创建移动菜单
      mobileMenu = document.createElement('div');
      mobileMenu.className = 'mobile-menu';
      mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
          <button class="close-menu"><i class="fas fa-times"></i></button>
          <ul>
            <li><a href="../index.html">首页</a></li>
            <li><a href="../index.html">产品系列</a></li>
            <li><a href="../index.html">关于我们</a></li>
            <li><a href="../index.html">联系我们</a></li>
          </ul>
        </div>
      `;
      
      // 添加到body
      document.body.appendChild(mobileMenu);
      
      // 添加样式
      const style = document.createElement('style');
      style.textContent = `
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.95);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .mobile-menu.active {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-menu-content {
          text-align: center;
          width: 90%;
        }
        
        .close-menu {
          background: none;
          border: none;
          color: #fff;
          font-size: 28px;
          position: absolute;
          top: 20px;
          right: 20px;
          cursor: pointer;
        }
        
        .mobile-menu ul {
          list-style: none;
          padding: 0;
          margin: 40px 0;
        }
        
        .mobile-menu li {
          margin: 20px 0;
        }
        
        .mobile-menu a {
          color: #fff;
          text-decoration: none;
          font-size: 24px;
          transition: color 0.3s ease;
        }
        
        .mobile-menu a:hover {
          color: #ccc;
        }
      `;
      document.head.appendChild(style);
      
      // 显示菜单
      setTimeout(() => {
        mobileMenu.classList.add('active');
      }, 10);
      
      // 为关闭按钮添加事件
      mobileMenu.querySelector('.close-menu').addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        setTimeout(() => {
          mobileMenu.remove();
          style.remove();
        }, 300);
      });
    });
  });
      