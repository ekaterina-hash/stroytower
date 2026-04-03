// ══════════════════════════════════════════
//  СТРОЙ ТАУЭР — main.js
// ══════════════════════════════════════════

'use strict';

/* ─── DATA ─────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    slug: 'brus-100x100',
    name: 'Брус 100×100',
    category: 'Брус',
    categorySlug: 'brus',
    dims: '100×100×6000 мм',
    price: 420,
    priceUnit: '₽/пог.м',
    badge: null,
    desc: 'Строительный брус хвойных пород (сосна, ель) естественной влажности. Применяется для возведения стен, перекрытий, стропильных систем и каркасов.',
    specs: {
      'Порода дерева': 'Сосна / Ель',
      'Сечение': '100×100 мм',
      'Длина': '6000 мм',
      'Влажность': 'Естественная (до 22%)',
      'Сорт': '2-й',
      'ГОСТ': 'ГОСТ 8486-86',
      'Обработка': 'Без обработки',
      'Объём в пачке': '0.36 м³',
    }
  },
  {
    id: 2,
    slug: 'brus-150x150',
    name: 'Брус 150×150',
    category: 'Брус',
    categorySlug: 'brus',
    dims: '150×150×6000 мм',
    price: 890,
    priceUnit: '₽/пог.м',
    badge: 'popular',
    desc: 'Силовой конструкционный брус для несущих элементов зданий, лежней, мауэрлатов и тяжёлых перекрытий.',
    specs: {
      'Порода дерева': 'Сосна',
      'Сечение': '150×150 мм',
      'Длина': '6000 мм',
      'Влажность': 'Естественная (до 22%)',
      'Сорт': '1-й',
      'ГОСТ': 'ГОСТ 8486-86',
      'Обработка': 'Без обработки',
      'Объём в пачке': '0.54 м³',
    }
  },
  {
    id: 3,
    slug: 'doska-obrezna-25x150',
    name: 'Доска обрезная 25×150',
    category: 'Доска обрезная',
    categorySlug: 'doska-obrezna',
    dims: '25×150×6000 мм',
    price: 185,
    priceUnit: '₽/пог.м',
    badge: 'new',
    desc: 'Обрезная строительная доска для опалубки, настилов, чернового пола и ограждений.',
    specs: {
      'Порода дерева': 'Сосна / Ель',
      'Сечение': '25×150 мм',
      'Длина': '6000 мм',
      'Влажность': 'Естественная',
      'Сорт': '2-3й',
      'ГОСТ': 'ГОСТ 8486-86',
      'Обработка': 'Обрезная (4 стороны)',
      'Объём в пачке': '0.45 м³',
    }
  },
  {
    id: 4,
    slug: 'doska-obrezna-50x150',
    name: 'Доска обрезная 50×150',
    category: 'Доска обрезная',
    categorySlug: 'doska-obrezna',
    dims: '50×150×6000 мм',
    price: 340,
    priceUnit: '₽/пог.м',
    badge: null,
    desc: 'Доска толщиной 50 мм для стропил, перемычек, черновых перекрытий и несущих конструкций.',
    specs: {
      'Порода дерева': 'Сосна',
      'Сечение': '50×150 мм',
      'Длина': '6000 мм',
      'Влажность': 'Естественная',
      'Сорт': '2-й',
      'ГОСТ': 'ГОСТ 8486-86',
      'Обработка': 'Обрезная',
      'Объём в пачке': '0.9 м³',
    }
  },
  {
    id: 5,
    slug: 'vagonka-sosna',
    name: 'Вагонка сосна',
    category: 'Вагонка',
    categorySlug: 'vagonka',
    dims: '14×96×3000 мм',
    price: 290,
    priceUnit: '₽/пог.м',
    badge: null,
    desc: 'Деревянная вагонка из сосны для внутренней обшивки стен и потолков, бань и саун.',
    specs: {
      'Порода дерева': 'Сосна',
      'Профиль': 'Штиль',
      'Длина': '3000 мм',
      'Ширина рабочая': '83 мм',
      'Толщина': '14 мм',
      'Класс': 'А (экстра)',
      'Влажность': '≤12%',
      'Обработка': 'Строганая, шлифованная',
    }
  },
  {
    id: 6,
    slug: 'shpunta-lipa',
    name: 'Вагонка липа',
    category: 'Вагонка',
    categorySlug: 'vagonka',
    dims: '14×96×2500 мм',
    price: 420,
    priceUnit: '₽/пог.м',
    badge: 'sale',
    desc: 'Вагонка из липы — идеальна для отделки парных в банях и саунах. Не выделяет смол, не обжигает.',
    specs: {
      'Порода дерева': 'Липа',
      'Профиль': 'Штиль',
      'Длина': '2500 мм',
      'Ширина рабочая': '83 мм',
      'Толщина': '14 мм',
      'Класс': 'А (экстра)',
      'Влажность': '≤10%',
      'Обработка': 'Строганая, шлифованная',
    }
  },
  {
    id: 7,
    slug: 'plos-50x200',
    name: 'Доска пола 50×200',
    category: 'Половая доска',
    categorySlug: 'pola',
    dims: '50×200×6000 мм',
    price: 520,
    priceUnit: '₽/пог.м',
    badge: null,
    desc: 'Строганая половая доска с шипом и пазом для укладки чистового деревянного пола.',
    specs: {
      'Порода дерева': 'Сосна',
      'Сечение': '50×200 мм',
      'Длина': '6000 мм',
      'Влажность': '≤15%',
      'Сорт': '1-2й',
      'Замок': 'Шип-паз',
      'Обработка': 'Строганая, 4 стороны',
      'Объём в пачке': '0.6 м³',
    }
  },
  {
    id: 8,
    slug: 'brus-150x200',
    name: 'Брус 150×200',
    category: 'Брус',
    categorySlug: 'brus',
    dims: '150×200×6000 мм',
    price: 1150,
    priceUnit: '₽/пог.м',
    badge: null,
    desc: 'Мощный несущий брус для балок перекрытий, лежней фундамента и тяжёлых несущих стен.',
    specs: {
      'Порода дерева': 'Сосна',
      'Сечение': '150×200 мм',
      'Длина': '6000 мм',
      'Влажность': 'Естественная (до 22%)',
      'Сорт': '1-й',
      'ГОСТ': 'ГОСТ 8486-86',
      'Обработка': 'Без обработки',
      'Объём в пачке': '0.9 м³',
    }
  },
];

const CATEGORIES = [
  { slug: 'brus',           name: 'Брус',              count: 3, icon: 'beam'     },
  { slug: 'doska-obrezna',  name: 'Доска обрезная',    count: 2, icon: 'board'    },
  { slug: 'vagonka',        name: 'Вагонка',           count: 2, icon: 'lining'   },
  { slug: 'pola',           name: 'Половая доска',     count: 1, icon: 'floor'    },
  { slug: 'shtaketnik',     name: 'Штакетник',         count: 0, icon: 'fence'    },
  { slug: 'reechnye',       name: 'Рейки',             count: 0, icon: 'rail'     },
];

/* ─── CART ──────────────────────────────── */
let cart = JSON.parse(localStorage.getItem('st_cart') || '[]');

function saveCart() {
  localStorage.setItem('st_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total ? 'flex' : 'none';
  });
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart();
  showToast('Добавлено в корзину', `${product.name} × ${qty}`);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCart();
}

/* ─── TOAST ─────────────────────────────── */
function showToast(title, text) {
  const t = document.getElementById('toast');
  t.querySelector('strong').textContent = title;
  t.querySelector('p').textContent = text;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ─── ICONS ─────────────────────────────── */
const SVG = {
  logo: `<svg viewBox="0 0 24 24"><path d="M3 7h18v2H3zm0 4h18v2H3zm0 4h18v2H3zM2 3h20v2H2z"/></svg>`,
  search: `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/></svg>`,
  cart: `<svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-9.83-3H19c.75 0 1.41-.41 1.75-1.03L23 8.98 21.2 8l-2.28 4.15H7.53L4.27 2H1v2h2l3.6 7.59L5.25 14c-.16.28-.25.61-.25.96C5 16.1 5.9 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25z"/></svg>`,
  wood: `<svg viewBox="0 0 24 24"><path d="M20 7H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H4V9h16v6z"/><path d="M8 10h8v4H8z"/></svg>`,
  phone: `<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"/></svg>`,
  email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  location: `<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
  truck: `<svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zM18 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.95-2.73 7.63-6 8.93-3.27-1.3-6-4.98-6-8.93V7.67L12 5z"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>`,
  close: `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>`,
  star: `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`,
  info: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
};

/* ─── SVG ICONS ─────────────────────────── */
function icon(name, cls = '') {
  return `<span class="svg-icon ${cls}">${SVG[name] || ''}</span>`;
}

/* ─── ROUTER ────────────────────────────── */
let currentPage = 'home';
let currentProductSlug = null;

function showPage(pageId, productSlug = null) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const page = document.getElementById('page-' + pageId);
  if (page) {
    page.classList.add('active');
  }

  const navLink = document.querySelector(`[data-page="${pageId}"]`);
  if (navLink) navLink.classList.add('active');

  currentPage = pageId;

  if (pageId === 'product' && productSlug) {
    currentProductSlug = productSlug;
    renderProductDetail(productSlug);
  }

  if (pageId === 'catalog') renderCatalog();
  if (pageId === 'cart') renderCart();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── RENDER: HOME ──────────────────────── */
function renderHome() {
  renderCategoryCards();
  renderFeaturedProducts();
}

function renderCategoryCards() {
  const grid = document.getElementById('category-cards');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" onclick="showPage('catalog', null); filterByCategory('${cat.slug}')">
      <div class="category-icon">${SVG.wood}</div>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.count > 0 ? cat.count + ' товара' : 'Скоро'}</div>
    </div>
  `).join('');
}

function renderFeaturedProducts() {
  const grid = document.getElementById('featured-products');
  if (!grid) return;
  const featured = PRODUCTS.slice(0, 4);
  grid.innerHTML = featured.map(p => productCardHTML(p)).join('');
}

/* ─── RENDER: CATALOG ───────────────────── */
let activeCategory = null;

function filterByCategory(slug) {
  activeCategory = slug;
  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  let filtered = PRODUCTS;
  if (activeCategory) {
    filtered = PRODUCTS.filter(p => p.categorySlug === activeCategory);
  }

  const countEl = document.getElementById('catalog-count');
  if (countEl) countEl.innerHTML = `<strong>${filtered.length}</strong> товаров найдено`;

  grid.innerHTML = filtered.length
    ? filtered.map(p => productCardHTML(p)).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-dim)">По выбранным фильтрам ничего не найдено</div>`;

  // Update filter radio buttons
  document.querySelectorAll('.filter-cat-btn').forEach(btn => {
    btn.classList.toggle('active-filter', btn.dataset.cat === activeCategory);
  });
}

/* ─── RENDER: PRODUCT CARD ──────────────── */
function productCardHTML(p) {
  const badgeMap = { popular: ['popular', 'Хит'], sale: ['sale', 'Акция'], new: ['new', 'Новинка'] };
  const badge = p.badge && badgeMap[p.badge]
    ? `<div class="product-badge ${badgeMap[p.badge][0]}">${badgeMap[p.badge][1]}</div>` : '';

  return `
    <div class="product-card" onclick="showPage('product', '${p.slug}')">
      <div class="product-image-placeholder">
        <div class="wood-texture-bg" style="border-radius:0"></div>
        ${badge}
        ${SVG.wood}
        <span>${p.name}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-dims">${p.dims}</div>
        <div class="product-price-row">
          <div>
            <span class="product-price">${p.price.toLocaleString('ru-RU')} ₽</span>
            <span class="product-price-unit"> / пог.м</span>
          </div>
          <button class="btn-cart" onclick="event.stopPropagation(); addToCart(${p.id})">
            ${SVG.cart} В корзину
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ─── RENDER: PRODUCT DETAIL ────────────── */
function renderProductDetail(slug) {
  const product = PRODUCTS.find(p => p.slug === slug);
  const container = document.getElementById('product-detail-content');
  if (!container || !product) return;

  const specsRows = Object.entries(product.specs)
    .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');

  const related = PRODUCTS.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 3);

  container.innerHTML = `
    <div class="breadcrumb">
      <a href="#" onclick="showPage('home')">Главная</a> <span>›</span>
      <a href="#" onclick="showPage('catalog')">Каталог</a> <span>›</span>
      <a href="#" onclick="showPage('catalog'); filterByCategory('${product.categorySlug}')">${product.category}</a>
      <span>›</span> ${product.name}
    </div>

    <div class="product-detail-grid">
      <div class="product-detail-image">
        <div class="wood-texture-bg"></div>
        ${SVG.wood}
        <p>Фото товара</p>
      </div>

      <div class="product-detail-info">
        <div class="detail-category">${product.category}</div>
        <h1 class="detail-title">${product.name}</h1>
        <p class="detail-subtitle">${product.dims}</p>

        <div class="detail-price-block">
          <div class="detail-price">${product.price.toLocaleString('ru-RU')} ₽</div>
          <div class="detail-price-note">за погонный метр (с НДС)</div>
        </div>

        <div class="detail-specs">
          ${Object.entries(product.specs).slice(0, 4).map(([k, v]) => `
            <div class="spec-item">
              <div class="spec-label">${k}</div>
              <div class="spec-value">${v}</div>
            </div>
          `).join('')}
        </div>

        <div class="quantity-row">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(-1)">−</button>
            <input type="number" class="qty-input" id="qty-input" value="1" min="1">
            <button class="qty-btn" onclick="changeQty(1)">+</button>
          </div>
          <span class="qty-unit">пог. м</span>
        </div>

        <button class="add-to-cart-btn" onclick="addToCart(${product.id}, parseInt(document.getElementById('qty-input').value)||1)">
          ${SVG.cart} Добавить в корзину
        </button>

        <div style="margin-top:16px;display:flex;gap:12px;font-size:12px;color:var(--text-dim)">
          <span style="display:flex;align-items:center;gap:6px">${SVG.truck}<span>Доставка по всему региону</span></span>
          <span style="display:flex;align-items:center;gap:6px">${SVG.check}<span>Сертифицировано</span></span>
        </div>
      </div>
    </div>

    <div class="detail-tabs">
      <div class="tab-nav">
        <button class="tab-btn active" onclick="switchTab(this, 'tab-desc')">Описание</button>
        <button class="tab-btn" onclick="switchTab(this, 'tab-specs')">Характеристики</button>
        <button class="tab-btn" onclick="switchTab(this, 'tab-delivery')">Доставка</button>
      </div>

      <div id="tab-desc" class="tab-panel active">
        <p style="font-size:15px;color:var(--text-muted);line-height:1.8;max-width:720px">${product.desc}</p>
        <p style="font-size:14px;color:var(--text-dim);line-height:1.8;margin-top:16px;max-width:720px">
          Вся продукция изготовлена из отборного пиловочника хвойных пород и соответствует требованиям ГОСТ. 
          Древесина проходит проверку по влажности и сортности. При заказе от 1 м³ действуют оптовые цены.
        </p>
      </div>

      <div id="tab-specs" class="tab-panel">
        <table class="specs-table">
          <tbody>${specsRows}</tbody>
        </table>
      </div>

      <div id="tab-delivery" class="tab-panel">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-bottom:24px">
          ${[
            ['Самовывоз', 'Бесплатно', 'Пн–Пт 8:00–18:00, Сб 8:00–14:00'],
            ['Доставка по городу', 'от 1 500 ₽', 'При заказе от 30 000 ₽ — бесплатно'],
            ['Доставка по региону', 'По согласованию', 'Расчёт стоимости по запросу'],
          ].map(([t, p2, d]) => `
            <div style="background:var(--bg2);border:1px solid var(--border);padding:20px;border-radius:4px">
              <div style="font-family:'Oswald',sans-serif;font-size:15px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">${t}</div>
              <div style="font-size:18px;color:var(--accent);font-family:'Bebas Neue',sans-serif;letter-spacing:.04em;margin-bottom:8px">${p2}</div>
              <div style="font-size:12px;color:var(--text-dim)">${d}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    ${related.length ? `
      <div style="margin-top:60px">
        <h2 style="font-family:'Bebas Neue',sans-serif;font-size:36px;letter-spacing:.04em;margin-bottom:24px">Похожие товары</h2>
        <div class="products-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
          ${related.map(p => productCardHTML(p)).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

function changeQty(delta) {
  const input = document.getElementById('qty-input');
  if (input) input.value = Math.max(1, (parseInt(input.value) || 1) + delta);
}

function switchTab(btn, tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tabId)?.classList.add('active');
}

/* ─── RENDER: CART ──────────────────────── */
function renderCart() {
  const container = document.getElementById('cart-content');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        ${SVG.cart}
        <h3>Корзина пуста</h3>
        <p style="font-size:14px;margin-bottom:20px">Добавьте товары из каталога</p>
        <button class="btn btn-primary" onclick="showPage('catalog')">Перейти в каталог</button>
      </div>
    `;
    return;
  }

  const subtotal = cart.reduce((s, item) => {
    const p = PRODUCTS.find(p => p.id === item.id);
    return s + (p ? p.price * item.qty : 0);
  }, 0);

  const delivery = subtotal >= 30000 ? 0 : 1500;
  const total = subtotal + delivery;

  container.innerHTML = `
    <div class="cart-layout">
      <div>
        ${cart.map(item => {
          const p = PRODUCTS.find(p => p.id === item.id);
          if (!p) return '';
          return `
            <div class="cart-item">
              <div class="cart-item-img">${SVG.wood}</div>
              <div class="cart-item-info">
                <div class="cart-item-name">${p.name}</div>
                <div class="cart-item-dims">${p.dims}</div>
                <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
                  <div class="qty-control" style="transform:scale(0.85);transform-origin:left">
                    <button class="qty-btn" onclick="updateCartQty(${p.id},-1)">−</button>
                    <input type="number" class="qty-input" value="${item.qty}" min="1" onchange="setCartQty(${p.id},this.value)" style="width:50px">
                    <button class="qty-btn" onclick="updateCartQty(${p.id},1)">+</button>
                  </div>
                  <span style="font-size:12px;color:var(--text-dim)">пог. м</span>
                </div>
              </div>
              <div class="cart-item-price">${(p.price * item.qty).toLocaleString('ru-RU')} ₽</div>
              <button class="remove-btn" onclick="removeFromCart(${p.id})" title="Удалить">${SVG.trash}</button>
            </div>
          `;
        }).join('')}
      </div>

      <div class="order-summary">
        <h3>Итого</h3>
        <div class="summary-row"><span>Товаров:</span><span>${cart.reduce((s,i)=>s+i.qty,0)} пог. м</span></div>
        <div class="summary-row"><span>Стоимость:</span><span>${subtotal.toLocaleString('ru-RU')} ₽</span></div>
        <div class="summary-row"><span>Доставка:</span><span>${delivery === 0 ? 'Бесплатно' : delivery.toLocaleString('ru-RU') + ' ₽'}</span></div>
        <div class="summary-total"><span>К оплате:</span><span>${total.toLocaleString('ru-RU')} ₽</span></div>
        <button class="btn btn-primary" style="width:100%;margin-top:20px;justify-content:center" onclick="showPage('order')">Оформить заказ</button>
        <button class="btn btn-outline" style="width:100%;margin-top:8px;justify-content:center" onclick="showPage('catalog')">Продолжить покупки</button>
      </div>
    </div>
  `;
}

function updateCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, item.qty + delta);
    saveCart();
    renderCart();
  }
}

function setCartQty(id, value) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, parseInt(value) || 1);
    saveCart();
  }
}

/* ─── SEARCH ────────────────────────────── */
function handleSearch(e) {
  if (e.key === 'Enter' || e.type === 'click') {
    const q = document.getElementById('search-input').value.trim().toLowerCase();
    if (!q) return;
    activeCategory = null;
    showPage('catalog');
    const grid = document.getElementById('catalog-grid');
    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.dims.toLowerCase().includes(q)
    );
    const countEl = document.getElementById('catalog-count');
    if (countEl) countEl.innerHTML = `<strong>${filtered.length}</strong> результатов по запросу «${q}»`;
    if (grid) grid.innerHTML = filtered.length
      ? filtered.map(p => productCardHTML(p)).join('')
      : `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-dim)">По запросу «${q}» ничего не найдено</div>`;
  }
}

/* ─── CONTACT FORM ──────────────────────── */
function submitContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.querySelector('[name="name"]').value,
    phone: form.querySelector('[name="phone"]').value,
    email: form.querySelector('[name="email"]').value,
    subject: form.querySelector('[name="subject"]').value,
    message: form.querySelector('[name="message"]').value,
  };

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Отправляем...';

  fetch('php/contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  .then(r => r.json())
  .then(res => {
    if (res.success) {
      form.reset();
      document.getElementById('form-success').style.display = 'block';
      showToast('Заявка отправлена!', 'Мы перезвоним вам в ближайшее время');
    } else {
      alert('Ошибка отправки. Пожалуйста, попробуйте снова.');
    }
  })
  .catch(() => {
    // Fallback for demo
    form.reset();
    document.getElementById('form-success').style.display = 'block';
    showToast('Заявка принята!', 'Мы перезвоним вам в ближайшее время');
  })
  .finally(() => {
    btn.disabled = false;
    btn.textContent = 'Отправить заявку';
  });
}

/* ─── INIT ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderHome();
  showPage('home');

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', handleSearch);
  }
});
