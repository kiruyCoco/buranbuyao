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
  

// -------------------- 页面初始化 --------------------
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    updateHintText();
    loadSeasonScript(currentCategory); // 默认加载“2025春夏”

    // 绑定大小童切换按钮点击事件
    document.getElementById('age-toggle-btn').onclick = function () {
        // 切换年龄组
        currentAgeGroup = (currentAgeGroup === '大童') ? '小童' : '大童';

        const bigSpan = this.querySelector('.big-child');
        const smallSpan = this.querySelector('.small-child');

        if (currentAgeGroup === '小童') {
            smallSpan.classList.add('active');
            bigSpan.classList.add('inactive');
        } else {
            smallSpan.classList.remove('active');
            bigSpan.classList.remove('inactive');
        }

        loadSeasonScript(currentCategory); // 重新加载当前季节
    };
});

// -------------------- 全局变量 --------------------
let currentCategory = '2025春夏';
let currentPage = 1;
let currentProducts = [];
let currentAgeGroup = '大童'; // 默认是大童
const itemsPerPage = 16;

// -------------------- 季节与脚本映射 --------------------
const seasonMapping = {
    '大童': {
        '2025春夏': {
            script: '../assets/js/bigchild/pb2025ss.js',
            variable: 'pb2025ss'
        },
        '2024春夏': {
            script: '../assets/js/bigchild/pb2024ss.js',
            variable: 'pb2024ss'
        },
        '2024秋冬': {
            script: '../assets/js/bigchild/pb2024aw.js',
            variable: 'pb2024aw'
        },
        '2023秋冬': {
            script: '../assets/js/bigchild/pb2023aw.js',
            variable: 'pb2023aw'
        }
    },
    '小童': {
        '2025春夏': {
            script: '../assets/js/smallchild/ps2025ss.js',
            variable: 'ps2025ss'
        },
        '2024春夏': {
            script: '../assets/js/smallchild/ps2024ss.js',
            variable: 'ps2024ss'
        },
        '2024秋冬': {
            script: '../assets/js/smallchild/ps2024aw.js',
            variable: 'ps2024aw'
        },
        '2023秋冬': {
            script: '../assets/js/smallchild/ps2023aw.js',
            variable: 'ps2023aw'
        }
    }
};



// -------------------- 加载 JS 脚本 --------------------
function loadSeasonScript(season) {
    currentCategory = season;
    currentPage = 1;
    updateHintText();

    const mapping = seasonMapping[currentAgeGroup][season];
    if (!mapping) {
        console.error('找不到匹配的脚本:', currentAgeGroup, season);
        return;
    }

    // 移除旧脚本
    const oldScript = document.getElementById('season-script');
    if (oldScript) oldScript.remove();

    // 加载新脚本
    const script = document.createElement('script');
    script.id = 'season-script';
    script.src = mapping.script;
    script.onload = () => {
        currentProducts = window[mapping.variable] || [];
        renderProducts();
        renderPagination();
        renderCategories();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(script);
}

// -------------------- 分类按钮渲染 --------------------
function renderCategories() {
    const container = document.getElementById('category-container');
    container.innerHTML = '';

    const categories = ['2025春夏', '2024春夏', '2024秋冬', '2023秋冬'];
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.textContent = category;
        if (category === currentCategory) {
            btn.classList.add('active');
        }
        btn.onclick = () => loadSeasonScript(category);
        container.appendChild(btn);
    });
}

// -------------------- 提示文本更新 --------------------
function updateHintText() {
    const hint = document.getElementById('hint-text');
    hint.innerHTML = `
        <span class="hint-age">${currentAgeGroup}</span> / 
        <span class="hint-category">${currentCategory}</span> / 
        <span class="hint-page">第 ${currentPage} 页</span>
    `;
}

// -------------------- 产品渲染 --------------------
function renderProducts() {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    currentProducts.slice(start, end).forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `<img src="${product.cover}" alt="Product Image">`;
        div.onclick = () => showProductDetails(product);
        container.appendChild(div);
    });

    renderPagination();
    updateHintText();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------------------- 分页渲染 --------------------
function renderPagination() {
    const container = document.getElementById('pagination-container');
    container.innerHTML = '';

    const totalPages = Math.ceil(currentProducts.length / itemsPerPage);

    const prev = document.createElement('button');
    prev.textContent = '上一页';
    prev.disabled = currentPage === 1;
    prev.onclick = () => {
        currentPage--;
        renderProducts();
    };

    const next = document.createElement('button');
    next.textContent = '下一页';
    next.disabled = currentPage === totalPages;
    next.onclick = () => {
        currentPage++;
        renderProducts();
    };

    const indicator = document.createElement('span');
    indicator.textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;

    container.appendChild(prev);
    container.appendChild(indicator);
    container.appendChild(next);
}

// -------------------- 产品详情弹窗 --------------------
function showProductDetails(product) {
    const modal = document.getElementById('product-modal');
    const imageContainer = document.getElementById('image-container');
    const dotContainer = document.getElementById('dot-container');

    imageContainer.innerHTML = '';
    dotContainer.innerHTML = '';

    let currentIndex = 0;

    product.images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.style.display = index === 0 ? 'block' : 'none';
        imageContainer.appendChild(img);

        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dotContainer.appendChild(dot);
    });

    function switchImage(index) {
        const imgs = imageContainer.getElementsByTagName('img');
        const dots = dotContainer.getElementsByClassName('dot');

        [...imgs].forEach(img => (img.style.display = 'none'));
        [...dots].forEach(dot => dot.classList.remove('active'));

        imgs[index].style.display = 'block';
        dots[index].classList.add('active');
        currentIndex = index;
    }

    document.getElementById('prev-button').onclick = () => {
        const newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
        switchImage(newIndex);
    };

    document.getElementById('next-button').onclick = () => {
        const newIndex = (currentIndex + 1) % product.images.length;
        switchImage(newIndex);
    };

    document.getElementById('close-modal').onclick = () => {
        modal.style.display = 'none';
    };

    modal.style.display = 'block';
}

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
