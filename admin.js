/**
 * ============================================================================
 * FKTECH — TABLEAU DE BORD ADMINISTRATEUR (admin.js)
 * Description : Logique complète du tableau de bord d'administration
 *               (CRUD Produits, Suivi des Commandes, Boîte Messages,
 *                Statistiques Canvas, Synchronisation LocalStorage avec la Boutique)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. CATALOGUE PRODUITS PAR DÉFAUT (Pour initialisation si LocalStorage vide)
// ----------------------------------------------------------------------------
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "HP EliteBook 840 G10",
    brand: "HP",
    category: "Ordinateurs portables",
    categoryKey: "laptops",
    price: 680000,
    oldPrice: 750000,
    isPromo: true,
    isNew: true,
    stock: 8,
    rating: 4.9,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    description: "Le PC portable professionnel par excellence. Ultra-fin, robuste et sécurisé, conçu pour les cadres et créateurs exigeants avec processeur Intel Core i7 13e génération.",
    specs: { "Processeur": "Intel Core i7-1365U", "RAM": "16 Go DDR5", "Stockage": "512 Go SSD" }
  },
  {
    id: 2,
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    brand: "Lenovo",
    category: "Ordinateurs portables",
    categoryKey: "laptops",
    price: 1150000,
    oldPrice: 1280000,
    isPromo: true,
    isNew: true,
    stock: 5,
    rating: 5.0,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    description: "Boîtier en fibre de carbone ultraléger, clavier légendaire ultra-confortable et autonomie record.",
    specs: { "Processeur": "Intel Core i7-1370P vPro", "RAM": "32 Go LPDDR5", "Stockage": "1 To SSD" }
  },
  {
    id: 3,
    name: "Tour PC Gamer FKTECH Beast RTX 4070 Ti",
    brand: "FKTECH",
    category: "PC Gamer",
    categoryKey: "gaming",
    price: 1650000,
    oldPrice: 1850000,
    isPromo: true,
    isNew: true,
    stock: 3,
    rating: 5.0,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    description: "Assemblé et optimisé avec passion dans les ateliers FKTECH. Conçu pour le jeu en 4K Ultra et le streaming haute définition.",
    specs: { "Processeur": "AMD Ryzen 7 7800X3D", "GPU": "NVIDIA RTX 4070 Ti 16Go", "RAM": "32 Go RGB" }
  },
  {
    id: 4,
    name: "Écran Gaming ASUS ROG Swift 27\" QHD 240Hz",
    brand: "ASUS",
    category: "Écrans",
    categoryKey: "monitors",
    price: 345000,
    oldPrice: 390000,
    isPromo: true,
    isNew: false,
    stock: 7,
    rating: 4.8,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    description: "Dalle Fast IPS avec taux de rafraîchissement fulgurant de 240 Hz et temps de réponse de 1 ms.",
    specs: { "Diagonale": "27 pouces", "Résolution": "2560 x 1440 (QHD)", "Taux": "240 Hz" }
  },
  {
    id: 5,
    name: "Pack Clavier & Souris Logitech MX Master 3S + Mechanical",
    brand: "Logitech",
    category: "Claviers",
    categoryKey: "keyboards",
    price: 185000,
    oldPrice: null,
    isPromo: false,
    isNew: true,
    stock: 12,
    rating: 4.9,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    description: "Le combo ultime pour les créateurs, développeurs et professionnels du multitâche.",
    specs: { "Connexion": "Bluetooth + Récepteur Logi Bolt", "Autonomie": "Jusqu'à 70 jours" }
  }
];

// ----------------------------------------------------------------------------
// 2. COMMANDES PAR DÉFAUT (Exemples pour démonstration)
// ----------------------------------------------------------------------------
const DEFAULT_ORDERS = [
  {
    id: "CMD-9824",
    clientName: "Moussa Traoré",
    phone: "22379792629",
    date: "2026-09-20 11:45",
    items: [
      { name: "HP EliteBook 840 G10", quantity: 1, price: 680000 },
      { name: "Pack Clavier Logitech", quantity: 1, price: 185000 }
    ],
    total: 865000,
    status: "confirmed" // pending, confirmed, shipped, delivered, cancelled
  },
  {
    id: "CMD-9823",
    clientName: "Fatoumata Diarra",
    phone: "22366778899",
    date: "2026-09-20 09:12",
    items: [
      { name: "Tour PC Gamer FKTECH Beast", quantity: 1, price: 1650000 }
    ],
    total: 1650000,
    status: "pending"
  },
  {
    id: "CMD-9822",
    clientName: "Oumar Coulibaly",
    phone: "22370123456",
    date: "2026-09-19 16:30",
    items: [
      { name: "Écran ASUS ROG 27\"", quantity: 2, price: 345000 }
    ],
    total: 690000,
    status: "delivered"
  }
];

// ----------------------------------------------------------------------------
// 3. MESSAGES DE CONTACT PAR DÉFAUT
// ----------------------------------------------------------------------------
const DEFAULT_MESSAGES = [
  {
    id: 1,
    name: "Ibrahim Koné",
    email: "ibrahim.kone@example.com",
    phone: "+223 75 00 11 22",
    subject: "Demande de devis pour parc informatique entreprise (10 PC)",
    message: "Bonjour l'équipe FKTECH, nous souhaitons équiper notre nouveau bureau avec 10 ordinateurs portables HP ou Lenovo. Pourriez-vous nous établir un devis pro avec livraison ?",
    date: "2026-09-20 10:15",
    unread: true
  },
  {
    id: 2,
    name: "Aminata Sidibé",
    email: "aminata.s@gmail.com",
    phone: "+223 66 55 44 33",
    subject: "Disponibilité de la Tour Gamer RTX 4070",
    message: "Bonjour, la tour PC Gamer FKTECH Beast est-elle disponible immédiatement en boutique à Bamako pour retrait aujourd'hui ?",
    date: "2026-09-19 14:20",
    unread: false
  }
];

// ----------------------------------------------------------------------------
// 4. ÉTAT GLOBAL DU DASHBOARD
// ----------------------------------------------------------------------------
const adminState = {
  products: JSON.parse(localStorage.getItem('fktech_products')) || DEFAULT_PRODUCTS,
  orders: JSON.parse(localStorage.getItem('fktech_orders')) || DEFAULT_ORDERS,
  messages: JSON.parse(localStorage.getItem('fktech_messages')) || DEFAULT_MESSAGES,
  settings: JSON.parse(localStorage.getItem('fktech_settings')) || {
    storeName: "FKTECH",
    whatsappPhone: "22379792629",
    promoCode: "FKTECH10",
    discountPercent: 10,
    lowStockThreshold: 5,
    currency: "FCFA"
  },
  currentTab: 'dashboard',
  currentEditingProductId: null,
  filters: {
    productSearch: '',
    productCategory: 'all',
    productStock: 'all',
    orderSearch: '',
    orderStatus: 'all'
  }
};

// Sauvegarder dans le localStorage si première visite
if (!localStorage.getItem('fktech_products')) {
  localStorage.setItem('fktech_products', JSON.stringify(adminState.products));
}
if (!localStorage.getItem('fktech_orders')) {
  localStorage.setItem('fktech_orders', JSON.stringify(adminState.orders));
}
if (!localStorage.getItem('fktech_messages')) {
  localStorage.setItem('fktech_messages', JSON.stringify(adminState.messages));
}
if (!localStorage.getItem('fktech_settings')) {
  localStorage.setItem('fktech_settings', JSON.stringify(adminState.settings));
}

// ----------------------------------------------------------------------------
// 5. UTILITAIRES DE FORMATAGE
// ----------------------------------------------------------------------------
function formatFCFA(amount) {
  if (amount === null || amount === undefined) return '0 FCFA';
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

function showAdminToast(message, type = 'success') {
  const container = document.getElementById('admin-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `admin-toast ${type}`;
  const icon = type === 'success' ? '✓' : (type === 'danger' ? '⚠️' : 'ℹ️');
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ----------------------------------------------------------------------------
// 6. GESTION DES ONGLETS DE NAVIGATION
// ----------------------------------------------------------------------------
function switchAdminTab(tabName) {
  adminState.currentTab = tabName;

  // Mise à jour des boutons de navigation
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Mise à jour des panneaux
  document.querySelectorAll('.tab-pane').forEach(pane => {
    if (pane.id === `tab-${tabName}`) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  // Fil d'ariane
  const breadcrumb = document.getElementById('current-page-breadcrumb');
  if (breadcrumb) {
    const titles = {
      dashboard: 'Vue d’ensemble',
      products: 'Gestion du Catalogue',
      orders: 'Suivi des Commandes',
      messages: 'Messages Clients',
      settings: 'Paramètres Boutique'
    };
    breadcrumb.textContent = titles[tabName] || tabName;
  }

  // Fermer la sidebar sur mobile après sélection
  const sidebar = document.getElementById('admin-sidebar');
  if (sidebar && window.innerWidth <= 768) {
    sidebar.classList.remove('open');
  }

  // Rafraîchir les données de l'onglet
  if (tabName === 'dashboard') {
    renderKPIs();
    renderCharts();
    renderRecentOrdersTable();
  } else if (tabName === 'products') {
    renderProductsTable();
  } else if (tabName === 'orders') {
    renderOrdersTable();
  } else if (tabName === 'messages') {
    renderMessagesList();
  } else if (tabName === 'settings') {
    loadSettingsForm();
  }
}

// ----------------------------------------------------------------------------
// 7. VUE D'ENSEMBLE (KPIs, CHARTS & RÉCENTES COMMANDES)
// ----------------------------------------------------------------------------
function renderKPIs() {
  // 1. Chiffre d'affaires total
  const totalRevenue = adminState.orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const revEl = document.getElementById('kpi-total-revenue');
  if (revEl) revEl.textContent = formatFCFA(totalRevenue);

  // 2. Commandes totales
  const ordersCountEl = document.getElementById('kpi-total-orders');
  if (ordersCountEl) ordersCountEl.textContent = adminState.orders.length;

  // 3. Produits en catalogue
  const prodCountEl = document.getElementById('kpi-total-products');
  if (prodCountEl) prodCountEl.textContent = adminState.products.length;

  // 4. Alertes de stock faible
  const lowStockCount = adminState.products.filter(p => p.stock <= adminState.settings.lowStockThreshold).length;
  const stockAlertEl = document.getElementById('kpi-low-stock');
  if (stockAlertEl) stockAlertEl.textContent = lowStockCount;

  // 5. Badges dans la sidebar
  const msgBadge = document.getElementById('sidebar-msg-badge');
  if (msgBadge) {
    const unreadCount = adminState.messages.filter(m => m.unread).length;
    msgBadge.textContent = unreadCount;
    msgBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
  }

  const orderBadge = document.getElementById('sidebar-order-badge');
  if (orderBadge) {
    const pendingCount = adminState.orders.filter(o => o.status === 'pending').length;
    orderBadge.textContent = pendingCount;
    orderBadge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
  }
}

/**
 * Dessine le graphique des ventes sur un élément Canvas HTML5
 */
function renderCharts() {
  const canvas = document.getElementById('sales-chart-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;

  ctx.clearRect(0, 0, width, height);

  // Données simulées des 6 derniers mois en millions de FCFA
  const months = ['Mai', 'Juin', 'Juil', 'Août', 'Sept', 'En cours'];
  const revenues = [4.2, 5.8, 7.1, 6.4, 8.9, 10.5]; // en millions de FCFA
  const maxVal = 12;

  const paddingLeft = 40;
  const paddingBottom = 30;
  const paddingTop = 20;
  const chartW = width - paddingLeft - 20;
  const chartH = height - paddingBottom - paddingTop;

  // Lignes de grille horizontales
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '11px sans-serif';

  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - 20, y);
    ctx.stroke();

    const val = (maxVal - (maxVal / 4) * i).toFixed(1) + 'M';
    ctx.fillText(val, 5, y + 4);
  }

  // Courbe des ventes
  const points = revenues.map((val, index) => {
    const x = paddingLeft + (chartW / (revenues.length - 1)) * index;
    const y = paddingTop + chartH - (val / maxVal) * chartH;
    return { x, y, val };
  });

  // Remplissage avec dégradé rouge
  const gradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
  gradient.addColorStop(0, 'rgba(229, 9, 20, 0.35)');
  gradient.addColorStop(1, 'rgba(229, 9, 20, 0.0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const xc = (points[i - 1].x + points[i].x) / 2;
    const yc = (points[i - 1].y + points[i].y) / 2;
    ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.lineTo(points[points.length - 1].x, height - paddingBottom);
  ctx.lineTo(points[0].x, height - paddingBottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Ligne de tracé principale
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const xc = (points[i - 1].x + points[i].x) / 2;
    const yc = (points[i - 1].y + points[i].y) / 2;
    ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.strokeStyle = '#e50914';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Points et étiquettes
  points.forEach((pt, i) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#e50914';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Étiquette du mois
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(months[i], pt.x - 12, height - 10);
  });

  // Barres de répartition par catégorie
  renderCategoryBars();
}

function renderCategoryBars() {
  const container = document.getElementById('category-bars-container');
  if (!container) return;

  const categories = [
    { name: "Ordinateurs portables", count: 0, percent: 45 },
    { name: "PC Gamer & Tours", count: 0, percent: 30 },
    { name: "Écrans & Moniteurs", count: 0, percent: 15 },
    { name: "Accessoires & Claviers", count: 0, percent: 10 }
  ];

  let html = '';
  categories.forEach(cat => {
    html += `
      <div class="category-bar-item">
        <div class="cat-bar-info">
          <span class="cat-bar-name">${cat.name}</span>
          <span class="cat-bar-val">${cat.percent}%</span>
        </div>
        <div class="cat-progress-track">
          <div class="cat-progress-fill" style="width: ${cat.percent}%;"></div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderRecentOrdersTable() {
  const tbody = document.getElementById('recent-orders-tbody');
  if (!tbody) return;

  const recent = adminState.orders.slice(0, 4);
  let html = '';

  recent.forEach(order => {
    const statusLabels = {
      pending: '<span class="status-badge badge-pending">● En attente</span>',
      confirmed: '<span class="status-badge badge-confirmed">✓ Confirmée</span>',
      shipped: '<span class="status-badge badge-shipped">🚚 Expédiée</span>',
      delivered: '<span class="status-badge badge-delivered">★ Livrée</span>',
      cancelled: '<span class="status-badge badge-cancelled">✕ Annulée</span>'
    };

    html += `
      <tr>
        <td><strong style="color:#fff;">${order.id}</strong></td>
        <td>${order.clientName}<br><small style="color:var(--text-muted);">${order.phone}</small></td>
        <td>${order.items.length} article(s)</td>
        <td class="price-text">${formatFCFA(order.total)}</td>
        <td>${statusLabels[order.status] || order.status}</td>
        <td>
          <button class="btn-icon" onclick="viewOrderDetails('${order.id}')" title="Voir les détails">👁️</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// ----------------------------------------------------------------------------
// 8. GESTION DES PRODUITS (CRUD COMPLET)
// ----------------------------------------------------------------------------
function renderProductsTable() {
  const tbody = document.getElementById('products-tbody');
  const countEl = document.getElementById('products-count-badge');
  if (!tbody) return;

  let filtered = adminState.products.filter(p => {
    if (adminState.filters.productSearch) {
      const q = adminState.filters.productSearch.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
    }
    if (adminState.filters.productCategory !== 'all') {
      if (p.category !== adminState.filters.productCategory) return false;
    }
    if (adminState.filters.productStock !== 'all') {
      if (adminState.filters.productStock === 'in' && p.stock <= adminState.settings.lowStockThreshold) return false;
      if (adminState.filters.productStock === 'low' && (p.stock > adminState.settings.lowStockThreshold || p.stock === 0)) return false;
      if (adminState.filters.productStock === 'out' && p.stock > 0) return false;
    }
    return true;
  });

  if (countEl) countEl.textContent = `${filtered.length} produit(s)`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding: 40px; color:var(--text-muted);">
          🔍 Aucun produit trouvé avec ces critères de recherche.
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  filtered.forEach(product => {
    let stockBadge = '';
    if (product.stock > adminState.settings.lowStockThreshold) {
      stockBadge = `<span class="status-badge badge-in-stock">En stock (${product.stock})</span>`;
    } else if (product.stock > 0) {
      stockBadge = `<span class="status-badge badge-low-stock">Stock faible (${product.stock})</span>`;
    } else {
      stockBadge = `<span class="status-badge badge-out-stock">Épuisé (0)</span>`;
    }

    html += `
      <tr>
        <td>#${product.id}</td>
        <td>
          <div class="prod-cell">
            <img class="prod-thumb" src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100';">
            <div>
              <div class="prod-title" title="${product.name}">${product.name}</div>
              <div class="prod-brand">${product.brand}</div>
            </div>
          </div>
        </td>
        <td>${product.category}</td>
        <td>
          <span class="price-text">${formatFCFA(product.price)}</span>
          ${product.oldPrice ? `<br><small style="color:var(--text-muted); text-decoration:line-through;">${formatFCFA(product.oldPrice)}</small>` : ''}
        </td>
        <td>${stockBadge}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-icon" onclick="adjustProductStock(${product.id}, -1)" title="Diminuer stock">-</button>
            <button class="btn-icon" onclick="adjustProductStock(${product.id}, 1)" title="Augmenter stock">+</button>
            <button class="btn-icon" onclick="openEditProductModal(${product.id})" title="Modifier">✏️</button>
            <button class="btn-icon danger" onclick="deleteProduct(${product.id})" title="Supprimer">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

/**
 * Ajuste rapidement le stock d'un produit (+1 ou -1)
 */
function adjustProductStock(productId, delta) {
  const product = adminState.products.find(p => p.id === productId);
  if (!product) return;

  product.stock = Math.max(0, product.stock + delta);
  saveProductsToStorage();
  renderProductsTable();
  renderKPIs();
  showAdminToast(`Stock mis à jour pour ${product.name} (${product.stock} unités)`);
}

/**
 * Ouvre la modale pour ajouter un nouveau produit
 */
function openAddProductModal() {
  adminState.currentEditingProductId = null;
  document.getElementById('product-modal-title').textContent = "Ajouter un Nouveau Produit";
  document.getElementById('product-form').reset();
  document.getElementById('modal-prod-preview').src = "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500";
  document.getElementById('admin-product-modal').classList.add('active');
}

/**
 * Ouvre la modale pour modifier un produit existant
 */
function openEditProductModal(productId) {
  const product = adminState.products.find(p => p.id === productId);
  if (!product) return;

  adminState.currentEditingProductId = productId;
  document.getElementById('product-modal-title').textContent = `Modifier : ${product.name}`;

  document.getElementById('form-prod-name').value = product.name;
  document.getElementById('form-prod-brand').value = product.brand;
  document.getElementById('form-prod-category').value = product.category;
  document.getElementById('form-prod-price').value = product.price;
  document.getElementById('form-prod-old-price').value = product.oldPrice || '';
  document.getElementById('form-prod-stock').value = product.stock;
  document.getElementById('form-prod-image').value = product.image;
  document.getElementById('form-prod-desc').value = product.description || '';

  // Spécifications
  let specsText = '';
  if (product.specs) {
    specsText = Object.entries(product.specs).map(([k, v]) => `${k}: ${v}`).join('\n');
  }
  document.getElementById('form-prod-specs').value = specsText;

  document.getElementById('modal-prod-preview').src = product.image;
  document.getElementById('admin-product-modal').classList.add('active');
}

/**
 * Ferme la modale produit
 */
function closeAdminProductModal() {
  document.getElementById('admin-product-modal').classList.remove('active');
}

/**
 * Enregistre le produit (création ou modification)
 */
function handleSaveProduct(e) {
  e.preventDefault();

  const name = document.getElementById('form-prod-name').value.trim();
  const brand = document.getElementById('form-prod-brand').value.trim();
  const category = document.getElementById('form-prod-category').value;
  const price = parseInt(document.getElementById('form-prod-price').value, 10);
  const oldPriceVal = document.getElementById('form-prod-old-price').value;
  const oldPrice = oldPriceVal ? parseInt(oldPriceVal, 10) : null;
  const stock = parseInt(document.getElementById('form-prod-stock').value, 10) || 0;
  const image = document.getElementById('form-prod-image').value.trim() || 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500';
  const description = document.getElementById('form-prod-desc').value.trim();
  const rawSpecs = document.getElementById('form-prod-specs').value.trim();

  // Parsing des spécifications ligne par ligne
  const specs = {};
  if (rawSpecs) {
    rawSpecs.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join(':').trim();
        if (key) specs[key] = val;
      }
    });
  }

  if (adminState.currentEditingProductId) {
    // Modification
    const index = adminState.products.findIndex(p => p.id === adminState.currentEditingProductId);
    if (index > -1) {
      adminState.products[index] = {
        ...adminState.products[index],
        name,
        brand,
        category,
        price,
        oldPrice,
        stock,
        image,
        description,
        specs,
        isPromo: oldPrice && oldPrice > price
      };
      showAdminToast(`« ${name} » modifié avec succès !`);
    }
  } else {
    // Création d'un nouvel ID
    const nextId = adminState.products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    const newProduct = {
      id: nextId,
      name,
      brand,
      category,
      categoryKey: category.toLowerCase().replace(/[^a-z0-9]/g, ''),
      price,
      oldPrice,
      isPromo: oldPrice && oldPrice > price,
      isNew: true,
      stock,
      rating: 5.0,
      reviews: 1,
      image,
      description,
      specs
    };
    adminState.products.unshift(newProduct);
    showAdminToast(`« ${name} » ajouté au catalogue !`);
  }

  saveProductsToStorage();
  closeAdminProductModal();
  renderProductsTable();
  renderKPIs();
}

/**
 * Supprime un produit avec confirmation
 */
function deleteProduct(productId) {
  const product = adminState.products.find(p => p.id === productId);
  if (!product) return;

  if (confirm(`Êtes-vous sûr de vouloir supprimer définitivement le produit « ${product.name} » ?`)) {
    adminState.products = adminState.products.filter(p => p.id !== productId);
    saveProductsToStorage();
    renderProductsTable();
    renderKPIs();
    showAdminToast(`« ${product.name} » supprimé du catalogue.`, 'danger');
  }
}

function saveProductsToStorage() {
  localStorage.setItem('fktech_products', JSON.stringify(adminState.products));
}

// ----------------------------------------------------------------------------
// 9. GESTION DES COMMANDES (ORDERS)
// ----------------------------------------------------------------------------
function renderOrdersTable() {
  const tbody = document.getElementById('orders-tbody');
  const countEl = document.getElementById('orders-count-badge');
  if (!tbody) return;

  let filtered = adminState.orders.filter(order => {
    if (adminState.filters.orderSearch) {
      const q = adminState.filters.orderSearch.toLowerCase();
      if (!order.id.toLowerCase().includes(q) &&
          !order.clientName.toLowerCase().includes(q) &&
          !order.phone.includes(q)) return false;
    }
    if (adminState.filters.orderStatus !== 'all') {
      if (order.status !== adminState.filters.orderStatus) return false;
    }
    return true;
  });

  if (countEl) countEl.textContent = `${filtered.length} commande(s)`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding: 40px; color:var(--text-muted);">
          🔍 Aucune commande trouvée.
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  filtered.forEach(order => {
    html += `
      <tr>
        <td><strong style="color:#fff;">${order.id}</strong></td>
        <td>${order.date}</td>
        <td>
          <strong>${order.clientName}</strong><br>
          <small style="color:var(--text-muted);">${order.phone}</small>
        </td>
        <td>${order.items.map(i => `${i.quantity}x ${i.name}`).join('<br>')}</td>
        <td class="price-text">${formatFCFA(order.total)}</td>
        <td>
          <select class="custom-select" style="padding: 4px 8px; font-size:0.8rem;" onchange="updateOrderStatus('${order.id}', this.value)">
            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>⏳ En attente</option>
            <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>✓ Confirmée</option>
            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>🚚 Expédiée</option>
            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>★ Livrée</option>
            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>✕ Annulée</option>
          </select>
        </td>
        <td>
          <div class="action-buttons">
            <button class="btn-icon" onclick="viewOrderDetails('${order.id}')" title="Détails">👁️</button>
            <a href="https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${order.clientName}, concernant votre commande ${order.id} sur FKTECH :`)}" target="_blank" class="btn-icon" style="color:#25d366;" title="Contacter sur WhatsApp">💬</a>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function updateOrderStatus(orderId, newStatus) {
  const order = adminState.orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  localStorage.setItem('fktech_orders', JSON.stringify(adminState.orders));
  renderKPIs();
  showAdminToast(`Statut de la commande ${orderId} mis à jour : ${newStatus}`);
}

function viewOrderDetails(orderId) {
  const order = adminState.orders.find(o => o.id === orderId);
  if (!order) return;

  let itemsHtml = order.items.map((it, idx) => `
    <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
      <div>${idx + 1}. <strong>${it.name}</strong> (x${it.quantity})</div>
      <div style="font-weight:700; color:#fff;">${formatFCFA(it.price * it.quantity)}</div>
    </div>
  `).join('');

  const modalBody = document.getElementById('order-modal-body');
  if (modalBody) {
    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h3 style="font-size:1.3rem; margin-bottom:4px; color:#fff;">Commande ${order.id}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem;">Date : ${order.date}</p>
      </div>

      <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:10px; margin-bottom:20px;">
        <h4 style="color:#fff; margin-bottom:10px; font-size:0.95rem;">Informations Client</h4>
        <p><strong>Nom :</strong> ${order.clientName}</p>
        <p><strong>Téléphone / WhatsApp :</strong> ${order.phone}</p>
        <p><strong>Statut actuel :</strong> ${order.status.toUpperCase()}</p>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="color:#fff; margin-bottom:10px; font-size:0.95rem;">Articles commandés</h4>
        ${itemsHtml}
        <div style="display:flex; justify-content:space-between; margin-top:16px; font-size:1.15rem; font-weight:800; color:#fff;">
          <div>Total de la commande :</div>
          <div style="color:var(--red-primary);">${formatFCFA(order.total)}</div>
        </div>
      </div>
    `;
  }

  document.getElementById('admin-order-modal').classList.add('active');
}

function closeAdminOrderModal() {
  document.getElementById('admin-order-modal').classList.remove('active');
}

// ----------------------------------------------------------------------------
// 10. GESTION DES MESSAGES DE CONTACT
// ----------------------------------------------------------------------------
function renderMessagesList() {
  const container = document.getElementById('messages-container');
  const countEl = document.getElementById('messages-count-badge');
  if (!container) return;

  if (countEl) countEl.textContent = `${adminState.messages.length} message(s)`;

  if (adminState.messages.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 50px 20px; color:var(--text-muted);">
        📬 Aucun message reçu pour le moment.
      </div>
    `;
    return;
  }

  let html = '';
  adminState.messages.forEach(msg => {
    const initials = msg.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const cleanPhone = msg.phone.replace(/[^0-9]/g, '');

    html += `
      <div class="message-card ${msg.unread ? 'unread' : ''}">
        <div class="message-header">
          <div class="message-sender">
            <div class="message-avatar">${initials}</div>
            <div>
              <div class="message-name">${msg.name} ${msg.unread ? '<span style="font-size:0.7rem; background:#e50914; color:#fff; padding:2px 6px; border-radius:4px; margin-left:6px;">NOUVEAU</span>' : ''}</div>
              <div class="message-meta">${msg.email} • ${msg.phone} • ${msg.date}</div>
            </div>
          </div>
          <div class="message-actions">
            ${msg.unread ? `<button class="btn btn-secondary" style="padding:6px 12px; font-size:0.78rem;" onclick="markMessageAsRead(${msg.id})">Marquer comme lu</button>` : ''}
            <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Bonjour ${msg.name}, suite à votre message envoyé sur le site FKTECH :`)}" target="_blank" class="btn btn-primary" style="padding:6px 12px; font-size:0.78rem;">
              💬 Répondre sur WhatsApp
            </a>
            <button class="btn-icon danger" onclick="deleteMessage(${msg.id})" title="Supprimer">🗑️</button>
          </div>
        </div>
        <div style="font-weight:700; color:#fff; font-size:0.95rem; margin-top:4px;">
          Sujet : ${msg.subject || 'Demande générale'}
        </div>
        <div class="message-body">
          ${msg.message}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function markMessageAsRead(msgId) {
  const msg = adminState.messages.find(m => m.id === msgId);
  if (!msg) return;

  msg.unread = false;
  localStorage.setItem('fktech_messages', JSON.stringify(adminState.messages));
  renderMessagesList();
  renderKPIs();
  showAdminToast("Message marqué comme lu.");
}

function deleteMessage(msgId) {
  if (confirm("Supprimer ce message client ?")) {
    adminState.messages = adminState.messages.filter(m => m.id !== msgId);
    localStorage.setItem('fktech_messages', JSON.stringify(adminState.messages));
    renderMessagesList();
    renderKPIs();
    showAdminToast("Message supprimé.", "danger");
  }
}

// ----------------------------------------------------------------------------
// 11. PARAMÈTRES BOUTIQUE & MAINTENANCE
// ----------------------------------------------------------------------------
function loadSettingsForm() {
  document.getElementById('settings-store-name').value = adminState.settings.storeName;
  document.getElementById('settings-whatsapp').value = adminState.settings.whatsappPhone;
  document.getElementById('settings-promo').value = adminState.settings.promoCode;
  document.getElementById('settings-threshold').value = adminState.settings.lowStockThreshold;
}

function handleSaveSettings(e) {
  e.preventDefault();

  adminState.settings.storeName = document.getElementById('settings-store-name').value.trim();
  adminState.settings.whatsappPhone = document.getElementById('settings-whatsapp').value.trim();
  adminState.settings.promoCode = document.getElementById('settings-promo').value.trim();
  adminState.settings.lowStockThreshold = parseInt(document.getElementById('settings-threshold').value, 10) || 5;

  localStorage.setItem('fktech_settings', JSON.stringify(adminState.settings));
  showAdminToast("Paramètres FKTECH sauvegardés avec succès !");
  renderKPIs();
}

/**
 * Réinitialise les données par défaut du catalogue
 */
function resetDemoData() {
  if (confirm("ATTENTION : Cela réinitialisera les produits, commandes et messages avec les exemples d'origine. Continuer ?")) {
    adminState.products = [...DEFAULT_PRODUCTS];
    adminState.orders = [...DEFAULT_ORDERS];
    adminState.messages = [...DEFAULT_MESSAGES];

    localStorage.setItem('fktech_products', JSON.stringify(adminState.products));
    localStorage.setItem('fktech_orders', JSON.stringify(adminState.orders));
    localStorage.setItem('fktech_messages', JSON.stringify(adminState.messages));

    renderKPIs();
    renderProductsTable();
    renderOrdersTable();
    renderMessagesList();
    renderCharts();
    showAdminToast("Données réinitialisées avec succès !", "info");
  }
}

// ----------------------------------------------------------------------------
// 12. INITIALISATION AU CHARGEMENT DE LA PAGE
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Écouteurs de navigation par onglets
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchAdminTab(btn.dataset.tab);
    });
  });

  // 2. Menu mobile toggle
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const sidebar = document.getElementById('admin-sidebar');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // 3. Écouteurs de filtres produits
  const prodSearch = document.getElementById('admin-product-search');
  if (prodSearch) {
    prodSearch.addEventListener('input', (e) => {
      adminState.filters.productSearch = e.target.value;
      renderProductsTable();
    });
  }

  const prodCat = document.getElementById('admin-product-category');
  if (prodCat) {
    prodCat.addEventListener('change', (e) => {
      adminState.filters.productCategory = e.target.value;
      renderProductsTable();
    });
  }

  const prodStock = document.getElementById('admin-product-stock');
  if (prodStock) {
    prodStock.addEventListener('change', (e) => {
      adminState.filters.productStock = e.target.value;
      renderProductsTable();
    });
  }

  // 4. Écouteurs de filtres commandes
  const orderSearch = document.getElementById('admin-order-search');
  if (orderSearch) {
    orderSearch.addEventListener('input', (e) => {
      adminState.filters.orderSearch = e.target.value;
      renderOrdersTable();
    });
  }

  const orderStatus = document.getElementById('admin-order-status');
  if (orderStatus) {
    orderStatus.addEventListener('change', (e) => {
      adminState.filters.orderStatus = e.target.value;
      renderOrdersTable();
    });
  }

  // 5. Formulaire produit
  const prodForm = document.getElementById('product-form');
  if (prodForm) {
    prodForm.addEventListener('submit', handleSaveProduct);
  }

  // 6. Formulaire paramètres
  const settingsForm = document.getElementById('settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', handleSaveSettings);
  }

  // 7. Aperçu en temps réel de l'image dans la modale
  const imgInput = document.getElementById('form-prod-image');
  const imgPreview = document.getElementById('modal-prod-preview');
  if (imgInput && imgPreview) {
    imgInput.addEventListener('input', (e) => {
      imgPreview.src = e.target.value.trim() || 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500';
    });
  }

  // Rendu initial
  renderKPIs();
  renderCharts();
  renderRecentOrdersTable();
});
