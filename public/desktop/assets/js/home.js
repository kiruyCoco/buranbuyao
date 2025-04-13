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

// 主轮播相关
const slides = document.querySelectorAll('.background-slide');
const dotsContainer = document.querySelector('.dots-container');
let currentSlide = 0;
let startX = 0, endX = 0;

// 创建小圆点
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.addEventListener('click', () => moveToSlide(index));
  dotsContainer.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function moveToSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  document.querySelector('.background-slides').style.transform = `translateX(-${index * 100}%)`;
  currentSlide = index;
  updateDots();
}

function autoPlay() {
  currentSlide = (currentSlide + 1) % slides.length;
  moveToSlide(currentSlide);
}
let autoPlayInterval = setInterval(autoPlay, 3000);

function moveToPrevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  moveToSlide(currentSlide);
}

function moveToNextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  moveToSlide(currentSlide);
}

// 添加触摸滑动支持
const backgroundSlides = document.querySelector('.background-slides');
backgroundSlides.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
backgroundSlides.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});
backgroundSlides.addEventListener('touchend', () => {
  if (startX - endX > 50) {
    moveToNextSlide();
  } else if (endX - startX > 50) {
    moveToPrevSlide();
  }
  startX = 0;
  endX = 0;
});

moveToSlide(0);
updateDots();

// 门店轮播相关
const storeSlides = document.querySelectorAll('.store-slide');
const storeDotsContainer = document.querySelector('.store-dots-container');
let currentStoreSlide = 0;
let storeStartX = 0, storeEndX = 0;

storeSlides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('store-dot');
  dot.addEventListener('click', () => moveToStoreSlide(index));
  storeDotsContainer.appendChild(dot);
});

function updateStoreDots() {
  document.querySelectorAll('.store-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentStoreSlide);
  });
}

function moveToStoreSlide(index) {
  if (index < 0) index = storeSlides.length - 1;
  if (index >= storeSlides.length) index = 0;
  document.querySelector('.store-carousel').style.transform = `translateX(-${index * 100}%)`;
  currentStoreSlide = index;
  updateStoreDots();
}

function moveToPrevStoreSlide() {
  moveToStoreSlide(currentStoreSlide - 1);
}

function moveToNextStoreSlide() {
  moveToStoreSlide(currentStoreSlide + 1);
}

let storeAutoPlayInterval = setInterval(moveToNextStoreSlide, 4000);

// 添加触摸滑动支持到门店轮播
const storeCarousel = document.querySelector('.store-carousel');
storeCarousel.addEventListener('touchstart', (e) => {
  storeStartX = e.touches[0].clientX;
});
storeCarousel.addEventListener('touchmove', (e) => {
  storeEndX = e.touches[0].clientX;
});
storeCarousel.addEventListener('touchend', () => {
  if (storeStartX - storeEndX > 50) {
    moveToNextStoreSlide();
  } else if (storeEndX - storeStartX > 50) {
    moveToPrevStoreSlide();
  }
  storeStartX = 0;
  storeEndX = 0;
});
moveToStoreSlide(0);

