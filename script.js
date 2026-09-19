/**
 * ============================================================================
 * FKTECH — Boutique E-Commerce Informatique & Accessoires Tech
 * Fichier : script.js
 * Description : Logique dynamique complète (Catalogue, Panier, Favoris, Filtres,
 *               Recherche, Modale Produit, LocalStorage et Notifications Toast)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. BASE DE DONNÉES PRODUITS (Catalogue en mémoire)
// ----------------------------------------------------------------------------
const PRODUCTS_DATA = [
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
    specs: {
      "Processeur": "Intel Core i7-1365U (jusqu'à 5.2 GHz)",
      "Mémoire RAM": "16 Go DDR5 5200 MHz",
      "Stockage": "512 Go SSD NVMe PCIe Gen4",
      "Écran": "14 pouces WUXGA (1920 x 1200) IPS Antireflet",
      "Autonomie": "Jusqu'à 13 heures de batterie",
      "Garantie": "12 Mois Constructeur FKTECH"
    }
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
    description: "L'apogée de l'ingénierie ThinkPad. Boîtier en fibre de carbone ultraléger, clavier légendaire ultra-confortable et autonomie record.",
    specs: {
      "Processeur": "Intel Core i7-1370P vPro",
      "Mémoire RAM": "32 Go LPDDR5",
      "Stockage": "1 To SSD M.2 NVMe",
      "Écran": "14 pouces 2.8K OLED HDR 400 nits",
      "Poids": "1.12 kg seulement",
      "Garantie": "24 Mois FKTECH Platinum"
    }
  },
  {
    id: 3,
    name: "Dell Latitude 5540",
    brand: "Dell",
    category: "Ordinateurs portables",
    categoryKey: "laptops",
    price: 590000,
    oldPrice: 640000,
    isPromo: true,
    isNew: false,
    stock: 12,
    rating: 4.8,
    reviews: 35,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    description: "L'ordinateur polyvalent parfait pour les entreprises et les étudiants. Clavier numérique complet, grande autonomie et excellente connectivité.",
    specs: {
      "Processeur": "Intel Core i5-1335U",
      "Mémoire RAM": "16 Go DDR4",
      "Stockage": "512 Go SSD PCIe",
      "Écran": "15.6 pouces Full HD Antireflet",
      "Connectique": "2x Thunderbolt 4, HDMI 2.0, RJ-45",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 4,
    name: "ASUS ROG Strix G16 (RTX 4070)",
    brand: "ASUS",
    category: "PC Gamer",
    categoryKey: "gaming",
    price: 1290000,
    oldPrice: 1450000,
    isPromo: true,
    isNew: true,
    stock: 4,
    rating: 4.9,
    reviews: 58,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    description: "Machine de guerre pour gamers passionnés et créateurs 3D. Écran 240Hz Nebula Display, refroidissement métal liquide et carte graphique RTX 4070 surpuissante.",
    specs: {
      "Processeur": "Intel Core i9-13980HX (24 cœurs)",
      "Carte Graphique": "NVIDIA GeForce RTX 4070 (8 Go GDDR6)",
      "Mémoire RAM": "32 Go DDR5 4800 MHz",
      "Stockage": "1 To SSD NVMe PCIe 4.0",
      "Écran": "16 pouces QHD+ 240Hz 3ms 100% DCI-P3",
      "Garantie": "12 Mois Garantie Gamer"
    }
  },
  {
    id: 5,
    name: "ASUS VivoBook 15 OLED",
    brand: "ASUS",
    category: "Ordinateurs portables",
    categoryKey: "laptops",
    price: 475000,
    oldPrice: null,
    isPromo: false,
    isNew: false,
    stock: 7,
    rating: 4.7,
    reviews: 21,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    description: "Offrez-vous des couleurs éclatantes avec la dalle OLED ASUS. Parfait pour le multimédia, le travail bureautique et le graphisme léger.",
    specs: {
      "Processeur": "AMD Ryzen 5 7530U",
      "Mémoire RAM": "16 Go DDR4",
      "Stockage": "512 Go SSD M.2",
      "Écran": "15.6 pouces FHD OLED 600 nits HDR",
      "Poids": "1.7 kg",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 6,
    name: "Acer Aspire 5 A515",
    brand: "Acer",
    category: "Ordinateurs portables",
    categoryKey: "laptops",
    price: 385000,
    oldPrice: 420000,
    isPromo: true,
    isNew: false,
    stock: 10,
    rating: 4.6,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    description: "Le meilleur rapport qualité/prix de sa catégorie pour la bureautique quotidienne, les cours en ligne et la navigation web fluide.",
    specs: {
      "Processeur": "Intel Core i5-1235U",
      "Mémoire RAM": "8 Go DDR4 (Extensible)",
      "Stockage": "512 Go SSD NVMe",
      "Écran": "15.6 pouces Full HD IPS",
      "Autonomie": "Jusqu'à 8 heures",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 7,
    name: "PC Fixe Dell OptiPlex 7010 Micro",
    brand: "Dell",
    category: "Ordinateurs de bureau",
    categoryKey: "desktops",
    price: 510000,
    oldPrice: 560000,
    isPromo: true,
    isNew: false,
    stock: 6,
    rating: 4.8,
    reviews: 17,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80",
    description: "Unité centrale ultra-compacte pour optimiser l'espace de bureau. Puissance moderne et silence absolu pour la productivité d'entreprise.",
    specs: {
      "Processeur": "Intel Core i5-13500T",
      "Mémoire RAM": "16 Go DDR5",
      "Stockage": "512 Go SSD M.2 NVMe",
      "Graphiques": "Intel UHD Graphics 770",
      "Système": "Windows 11 Pro préinstallé",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 8,
    name: "HP Pavilion Desktop TP01",
    brand: "HP",
    category: "Ordinateurs de bureau",
    categoryKey: "desktops",
    price: 420000,
    oldPrice: null,
    isPromo: false,
    isNew: false,
    stock: 5,
    rating: 4.7,
    reviews: 14,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
    description: "Tour élégante et évolutive conçue pour répondre à tous les besoins informatiques de la famille et des professionnels.",
    specs: {
      "Processeur": "Intel Core i5-12400",
      "Mémoire RAM": "16 Go DDR4",
      "Stockage": "1 To SSD PCIe NVMe",
      "Connectivité": "Wi-Fi 6 + Bluetooth 5.2",
      "Ports avant": "4x USB, Lecteur carte SD",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 9,
    name: "Samsung Odyssey G5 27\" Incurvé 144Hz",
    brand: "Samsung",
    category: "Écrans",
    categoryKey: "monitors",
    price: 195000,
    oldPrice: 230000,
    isPromo: true,
    isNew: true,
    stock: 9,
    rating: 4.9,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    description: "Immersion totale avec courbure 1000R, résolution WQHD et taux de rafraîchissement ultrarapide de 144Hz compatible AMD FreeSync Premium.",
    specs: {
      "Taille": "27 pouces (68.4 cm)",
      "Résolution": "WQHD (2560 x 1440 pixels)",
      "Taux de rafraîchissement": "144 Hz / 1ms MPRT",
      "Courbure": "1000R panoramique",
      "Connectique": "HDMI 2.0, DisplayPort 1.2",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 10,
    name: "Dell UltraSharp 27\" 4K U2723QE",
    brand: "Dell",
    category: "Écrans",
    categoryKey: "monitors",
    price: 340000,
    oldPrice: null,
    isPromo: false,
    isNew: false,
    stock: 6,
    rating: 5.0,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
    description: "L'écran de référence des designers et photographes. Dalle IPS Black avec contraste 2000:1 et hub USB-C 90W intégré.",
    specs: {
      "Taille": "27 pouces 4K UHD (3840 x 2160)",
      "Couleurs": "100% sRGB, 98% DCI-P3",
      "Technologie": "IPS Black 400 nits VESA HDR400",
      "Hub intégré": "USB-C avec alimentation 90W + RJ45",
      "Pied": "Réglable en hauteur, inclinaison, pivot 90°",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 11,
    name: "Souris Sans Fil Logitech MX Master 3S",
    brand: "Logitech",
    category: "Souris",
    categoryKey: "mice",
    price: 65000,
    oldPrice: 75000,
    isPromo: true,
    isNew: true,
    stock: 22,
    rating: 5.0,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    description: "La souris la plus perfectionnée au monde. Clics ultra-silencieux, molette MagSpeed défilant 1000 lignes par seconde et capteur 8000 DPI sur verre.",
    specs: {
      "Capteur": "Darkfield 8000 DPI (fonctionne sur verre)",
      "Connexion": "Bluetooth Low Energy + Dongle Logi Bolt",
      "Multi-appareils": "Jusqu'à 3 ordinateurs simultanément",
      "Autonomie": "70 jours par charge USB-C",
      "Ergonomie": "Repose-pouce texturé avec molette latérale",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 12,
    name: "Souris Gamer Logitech G502 HERO",
    brand: "Logitech",
    category: "Souris",
    categoryKey: "mice",
    price: 45000,
    oldPrice: null,
    isPromo: false,
    isNew: false,
    stock: 18,
    rating: 4.8,
    reviews: 77,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    description: "L'icône incontournable de l'e-sport avec 11 boutons programmables, système de poids ajustables et capteur HERO 25K haute précision.",
    specs: {
      "Capteur": "HERO 25 600 DPI",
      "Boutons": "11 boutons entièrement personnalisables",
      "Poids réglable": "5 poids de 3.6 g inclus",
      "Éclairage": "RGB LIGHTSYNC 16.8 millions de couleurs",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 13,
    name: "Clavier Mécanique Corsair K70 RGB PRO",
    brand: "Corsair",
    category: "Claviers",
    categoryKey: "keyboards",
    price: 98000,
    oldPrice: 115000,
    isPromo: true,
    isNew: true,
    stock: 11,
    rating: 4.9,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    description: "Châssis en aluminium brossé ultra-résistant, switches mécaniques Cherry MX Red linéaires et technologie AXON 8x plus rapide.",
    specs: {
      "Switches": "Cherry MX Red Mécaniques",
      "Taux de transfert": "Hyper-polling 8000 Hz AXON",
      "Châssis": "Aluminium anodisé noir spatial",
      "Touches": "PBT double injection inusables",
      "Repose-poignet": "Magnétique amovible toucher doux",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 14,
    name: "Clavier Sans Fil Logitech MX Keys Advanced",
    brand: "Logitech",
    category: "Claviers",
    categoryKey: "keyboards",
    price: 72000,
    oldPrice: null,
    isPromo: false,
    isNew: false,
    stock: 14,
    rating: 4.8,
    reviews: 51,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
    description: "Conçu pour la frappe parfaite. Touches profilées épousant la forme des doigts, rétroéclairage intelligent avec capteur de proximité.",
    specs: {
      "Connectivité": "Bluetooth + Récepteur USB Logi Bolt",
      "Rétroéclairage": "Automatique avec détection des mains",
      "Recharge": "USB-C rapide (jusqu'à 5 mois sans rétroéclairage)",
      "Compatibilité": "Windows, macOS, Linux, Android",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 15,
    name: "Imprimante Multifonction Canon PIXMA G3411",
    brand: "Canon",
    category: "Imprimantes",
    categoryKey: "printers",
    price: 135000,
    oldPrice: 155000,
    isPromo: true,
    isNew: false,
    stock: 7,
    rating: 4.7,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80",
    description: "Imprimante 3-en-1 avec réservoirs d'encre rechargeables MegaTank. Coût à la page ultra-faible : jusqu'à 12 000 pages en noir et 7 000 en couleur !",
    specs: {
      "Fonctions": "Impression, Copie, Numérisation, Wi-Fi",
      "Rendement encre": "Jusqu'à 12 000 pages noir incluses",
      "Vitesse d'impression": "8.8 ipm (noir) / 5.0 ipm (couleur)",
      "Connectivité": "Wi-Fi sans fil, USB, AirPrint mobile",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 16,
    name: "Disque SSD NVMe Kingston NV2 1To PCIe 4.0",
    brand: "Kingston",
    category: "Stockage",
    categoryKey: "storage",
    price: 48000,
    oldPrice: 58000,
    isPromo: true,
    isNew: true,
    stock: 25,
    rating: 4.8,
    reviews: 62,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
    description: "Donnez un coup de boost foudroyant à votre ordinateur. Vitesses de lecture jusqu'à 3500 Mo/s pour charger vos jeux et logiciels en un clin d'œil.",
    specs: {
      "Capacité": "1 To (1000 Go)",
      "Format": "M.2 2280 NVMe PCIe 4.0 x4",
      "Vitesse de lecture": "Jusqu'à 3 500 Mo/s",
      "Vitesse d'écriture": "Jusqu'à 2 100 Mo/s",
      "Endurance": "320 TBW",
      "Garantie": "24 Mois Constructeur FKTECH"
    }
  },
  {
    id: 17,
    name: "SSD Externe Samsung T7 Shield 1To Renforcé",
    brand: "Samsung",
    category: "Stockage",
    categoryKey: "storage",
    price: 79000,
    oldPrice: 92000,
    isPromo: true,
    isNew: false,
    stock: 16,
    rating: 4.9,
    reviews: 44,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80",
    description: "Le SSD nomade tout-terrain. Résistant à l'eau, à la poussière (IP65) et aux chutes jusqu'à 3 mètres avec des transferts ultra-rapides de 1050 Mo/s.",
    specs: {
      "Capacité": "1 To",
      "Interface": "USB 3.2 Gen 2 (10 Gbps) Type-C",
      "Protection": "Certification IP65 eau/poussière",
      "Sécurité": "Chiffrement matériel AES 256 bits",
      "Câbles inclus": "USB-C vers C et USB-C vers A",
      "Garantie": "24 Mois FKTECH"
    }
  },
  {
    id: 18,
    name: "Casque Sans Fil HyperX Cloud II Wireless",
    brand: "HyperX",
    category: "Accessoires",
    categoryKey: "accessories",
    price: 85000,
    oldPrice: 100000,
    isPromo: true,
    isNew: false,
    stock: 12,
    rating: 4.8,
    reviews: 53,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Le confort légendaire HyperX sans aucun fil. Son surround spatial 7.1 immersif et jusqu'à 30 heures d'autonomie continue.",
    specs: {
      "Transducteurs": "53 mm avec aimants en néodyme",
      "Son spatial": "DTS Headphone:X Spatial Audio",
      "Autonomie": "Jusqu'à 30 heures",
      "Microphone": "Amovible avec réduction de bruit active",
      "Poids": "300 g avec coussinets mémoire de forme",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 19,
    name: "Routeur Wi-Fi 6 TP-Link Archer AX55 Gigabit",
    brand: "TP-Link",
    category: "Réseaux",
    categoryKey: "networks",
    price: 55000,
    oldPrice: null,
    isPromo: false,
    isNew: true,
    stock: 15,
    rating: 4.7,
    reviews: 26,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    description: "Wi-Fi 6 bi-bande nouvelle génération jusqu'à 3000 Mbps. Connectez des dizaines d'appareils simultanément sans ralentissement ni latence.",
    specs: {
      "Norme Wi-Fi": "Wi-Fi 6 AX3000 (2402 Mbps en 5GHz + 574 Mbps en 2.4GHz)",
      "Antennes": "4 antennes externes haute performance avec Beamforming",
      "Ports": "1x Port WAN Gigabit + 4x Ports LAN Gigabit + 1x USB 3.0",
      "Sécurité": "WPA3 et protection antivirus HomeShield",
      "Garantie": "12 Mois FKTECH"
    }
  },
  {
    id: 20,
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
    description: "Assemblé et optimisé avec passion dans les ateliers FKTECH. Conçu pour le jeu en 4K Ultra et le streaming haute définition sans compromis.",
    specs: {
      "Processeur": "AMD Ryzen 7 7800X3D (Watercooling 360mm ARGB)",
      "Carte Graphique": "NVIDIA GeForce RTX 4070 Ti SUPER 16 Go",
      "Mémoire RAM": "32 Go DDR5 6000 MHz RGB",
      "Stockage": "2 To SSD NVMe PCIe 4.0 Samsung 990 Pro",
      "Alimentation": "850W 80 Plus Gold Modulaire",
      "Garantie": "24 Mois Support VIP FKTECH"
    }
  }
];

// ----------------------------------------------------------------------------
// 2. CONFIGURATION DES CATÉGORIES
// ----------------------------------------------------------------------------
const CATEGORIES_CONFIG = [
  { name: "Ordinateurs portables", icon: "💻", key: "laptops" },
  { name: "Ordinateurs de bureau", icon: "🖥️", key: "desktops" },
  { name: "Écrans", icon: "🖥️", key: "monitors" },
  { name: "Claviers", icon: "⌨️", key: "keyboards" },
  { name: "Souris", icon: "🖱️", key: "mice" },
  { name: "Imprimantes", icon: "🖨️", key: "printers" },
  { name: "Stockage", icon: "💾", key: "storage" },
  { name: "Accessoires", icon: "🎧", key: "accessories" },
  { name: "PC Gamer", icon: "🎮", key: "gaming" },
  { name: "Réseaux", icon: "🌐", key: "networks" }
];

// ----------------------------------------------------------------------------
// 3. GESTION DE L'ÉTAT DE L'APPLICATION (Panier, Favoris, Filtres)
// ----------------------------------------------------------------------------
const state = {
  cart: JSON.parse(localStorage.getItem('fktech_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('fktech_wishlist')) || [],
  appliedCoupon: null,
  filters: {
    search: '',
    category: 'all',
    brand: 'all',
    maxPrice: 2000000,
    onlyPromo: false,
    onlyInStock: false,
    sortBy: 'popular'
  }
};

// ----------------------------------------------------------------------------
// 4. UTILITAIRES D'AFFICHAGE (Prix FCFA, Étoiles)
// ----------------------------------------------------------------------------

/**
 * Formate un nombre en devise FCFA avec séparateur de milliers
 * Ex: 680000 -> "680 000 FCFA"
 */
function formatFCFA(amount) {
  if (amount === null || amount === undefined) return '';
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

/**
 * Génère le code HTML des étoiles de notation (ex: 4.8 / 5)
 */
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let starsHtml = '';

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '★';
  }
  if (hasHalf) {
    starsHtml += '½';
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '☆';
  }
  return `<span class="stars">${starsHtml}</span>`;
}

/**
 * Affiche une notification Toast temporaire et tactile
 */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast show ${type}`;

  const icon = type === 'success' ? '✓' : (type === 'heart' ? '❤️' : 'ℹ️');
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// ----------------------------------------------------------------------------
// 5. GESTION DU PANIER (LocalStorage & Fonctions CRUD)
// ----------------------------------------------------------------------------

/**
 * Sauvegarde le panier dans le localStorage et met à jour l'interface
 */
function saveCart() {
  localStorage.setItem('fktech_cart', JSON.stringify(state.cart));
  updateCartBadge();
  renderCartDrawer();
}

/**
 * Met à jour le badge de compteur d'articles dans le Header
 */
function updateCartBadge() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  }
}

/**
 * Ajoute un produit au panier
 */
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  if (product.stock <= 0) {
    showToast(`Désolé, ${product.name} est en rupture de stock.`, 'info');
    return;
  }

  const existingItem = state.cart.find(item => item.productId === productId);
  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      showToast(`Quantité maximale en stock atteinte (${product.stock} max).`, 'info');
      return;
    }
    existingItem.quantity += quantity;
  } else {
    state.cart.push({ productId, quantity });
  }

  saveCart();
  showToast(`« ${product.name} » ajouté au panier !`, 'success');
}

/**
 * Modifie la quantité d'un article dans le panier
 */
function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.productId === productId);
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!item || !product) return;

  const newQty = item.quantity + delta;

  if (newQty <= 0) {
    removeFromCart(productId);
  } else if (newQty > product.stock) {
    showToast(`Stock limité à ${product.stock} unités.`, 'info');
  } else {
    item.quantity = newQty;
    saveCart();
  }
}

/**
 * Retire un article du panier
 */
function removeFromCart(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  state.cart = state.cart.filter(item => item.productId !== productId);
  saveCart();
  if (product) {
    showToast(`« ${product.name} » retiré du panier.`, 'info');
  }
}

/**
 * Vide complètement le panier
 */
function clearCart() {
  if (state.cart.length === 0) return;
  if (confirm("Voulez-vous vraiment vider l'ensemble de votre panier ?")) {
    state.cart = [];
    state.appliedCoupon = null;
    saveCart();
    showToast("Le panier a été vidé.", 'info');
  }
}

/**
 * Calcule les totaux du panier
 */
function getCartTotals() {
  let subtotal = 0;
  state.cart.forEach(item => {
    const product = PRODUCTS_DATA.find(p => p.id === item.productId);
    if (product) {
      subtotal += product.price * item.quantity;
    }
  });

  let discount = 0;
  if (state.appliedCoupon === 'FKTECH10') {
    discount = Math.round(subtotal * 0.10); // 10% de réduction
  }

  // Livraison gratuite à partir de 250 000 FCFA
  const shipping = subtotal > 0 && subtotal < 250000 ? 5000 : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  return { subtotal, discount, shipping, total };
}

/**
 * Rendu graphique du volet latéral du panier
 */
function renderCartDrawer() {
  const container = document.getElementById('cart-drawer-items');
  const footer = document.getElementById('cart-drawer-footer');
  if (!container || !footer) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 10px;">
        <div style="font-size: 3rem; margin-bottom: 12px; opacity: 0.6;">🛒</div>
        <h4 style="color:#ffffff; margin-bottom: 8px;">Votre panier est vide</h4>
        <p style="color:var(--text-muted); font-size: 0.88rem; margin-bottom: 20px;">Découvrez nos offres et ajoutez des articles à votre panier.</p>
        <button class="btn btn-primary btn-sm" onclick="closeCartDrawer(); scrollToSection('shop');">Explorer la boutique</button>
      </div>
    `;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'flex';
  const totals = getCartTotals();

  let html = '';
  state.cart.forEach(item => {
    const product = PRODUCTS_DATA.find(p => p.id === item.productId);
    if (!product) return;

    html += `
      <div class="cart-item">
        <div class="cart-item-thumb">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200';">
        </div>
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <div class="cart-item-price">${formatFCFA(product.price)}</div>
          <div class="cart-item-actions">
            <div class="cart-item-qty">
              <button class="cart-qty-btn" onclick="updateCartQuantity(${product.id}, -1)">-</button>
              <span class="cart-qty-num">${item.quantity}</span>
              <button class="cart-qty-btn" onclick="updateCartQuantity(${product.id}, 1)">+</button>
            </div>
            <button class="btn-remove-item" onclick="removeFromCart(${product.id})" title="Supprimer cet article">🗑️</button>
          </div>
        </div>
        <div style="font-size: 0.9rem; font-weight: 700; color:#fff;">
          ${formatFCFA(product.price * item.quantity)}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Mise à jour des totaux dans le footer
  document.getElementById('cart-subtotal').textContent = formatFCFA(totals.subtotal);
  document.getElementById('cart-shipping').textContent = totals.shipping === 0 ? 'Offerte (Gratuite)' : formatFCFA(totals.shipping);
  document.getElementById('cart-total').textContent = formatFCFA(totals.total);

  const discountRow = document.getElementById('cart-discount-row');
  if (discountRow) {
    if (totals.discount > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('cart-discount').textContent = `- ${formatFCFA(totals.discount)} (Code FKTECH10)`;
    } else {
      discountRow.style.display = 'none';
    }
  }
}

/**
 * Ouvre le panneau latéral du panier
 */
function openCartDrawer() {
  const panel = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (panel && backdrop) {
    renderCartDrawer();
    backdrop.classList.add('active');
    panel.classList.add('open');
  }
}

/**
 * Ferme le panneau latéral du panier
 */
function closeCartDrawer() {
  const panel = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (panel && backdrop) {
    panel.classList.remove('open');
    backdrop.classList.remove('active');
  }
}

/**
 * Applique un code promotionnel
 */
function applyCoupon() {
  const input = document.getElementById('coupon-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'FKTECH10') {
    state.appliedCoupon = 'FKTECH10';
    saveCart();
    showToast('Code promo appliqué ! -10% sur votre commande 🎉', 'success');
  } else if (code === '') {
    showToast('Veuillez saisir un code promo.', 'info');
  } else {
    showToast('Code promo invalide. Essayez FKTECH10', 'info');
  }
}

/**
 * Commande rapide du panier via WhatsApp
 */
function checkoutWhatsApp() {
  if (state.cart.length === 0) {
    showToast('Votre panier est vide.', 'info');
    return;
  }

  const totals = getCartTotals();
  let message = "Bonjour FKTECH ! Je souhaite passer commande pour ces articles :\n\n";

  state.cart.forEach((item, index) => {
    const product = PRODUCTS_DATA.find(p => p.id === item.productId);
    if (product) {
      message += `${index + 1}. *${product.name}* (Qté: ${item.quantity}) - ${formatFCFA(product.price * item.quantity)}\n`;
    }
  });

  if (totals.discount > 0) {
    message += `\n*Remise appliquée :* -${formatFCFA(totals.discount)}`;
  }
  message += `\n*Total de la commande :* ${formatFCFA(totals.total)}\n`;
  message += "\nMerci de me confirmer la disponibilité et les modalités de livraison.";

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/22379792629?text=${encoded}`, '_blank');
}

// ----------------------------------------------------------------------------
// 6. GESTION DES FAVORIS (WISHLIST)
// ----------------------------------------------------------------------------

/**
 * Sauvegarde la liste de souhaits dans le localStorage
 */
function saveWishlist() {
  localStorage.setItem('fktech_wishlist', JSON.stringify(state.wishlist));
  updateWishlistBadge();
  renderProducts(); // Pour rafraîchir les cœurs sur les cartes
  renderPromoSection();
}

/**
 * Met à jour le badge des favoris dans le Header
 */
function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-count');
  if (badge) {
    const count = state.wishlist.length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

/**
 * Ajoute ou retire un produit des favoris
 */
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = PRODUCTS_DATA.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    saveWishlist();
    if (product) showToast(`« ${product.name} » retiré des favoris.`, 'info');
  } else {
    state.wishlist.push(productId);
    saveWishlist();
    if (product) showToast(`« ${product.name} » ajouté à vos favoris !`, 'heart');
  }
}

// ----------------------------------------------------------------------------
// 7. MODALE DE FICHE PRODUIT (QUICK VIEW)
// ----------------------------------------------------------------------------

/**
 * Affiche la modale détaillée avec les spécifications complètes
 */
function openProductModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modal || !modalBody) return;

  let specsHtml = '';
  if (product.specs) {
    for (const [key, val] of Object.entries(product.specs)) {
      specsHtml += `
        <div class="spec-item">
          <span class="spec-label">${key}</span>
          <span class="spec-value">${val}</span>
        </div>
      `;
    }
  }

  const discountPercent = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const stockClass = product.stock > 5 ? 'stock-in' : (product.stock > 0 ? 'stock-low' : 'stock-out');
  const stockText = product.stock > 5 ? `En stock (${product.stock} unités)` : (product.stock > 0 ? `Stock limité (${product.stock} restantes)` : 'Rupture de stock');

  modalBody.innerHTML = `
    <div class="modal-content-grid">
      <div class="modal-image-col">
        <div class="modal-main-img">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600';">
        </div>
      </div>
      <div class="modal-info-col">
        <span class="modal-brand-badge">${product.brand} • ${product.category}</span>
        <h2 class="modal-title">${product.name}</h2>
        <div class="product-rating">
          ${renderStars(product.rating)}
          <span style="font-weight:700; color:#fff;">${product.rating}</span>
          <span class="reviews-count">(${product.reviews} avis clients)</span>
        </div>

        <div class="modal-price-box">
          <span class="modal-price">${formatFCFA(product.price)}</span>
          ${product.oldPrice ? `<span class="modal-old-price">${formatFCFA(product.oldPrice)}</span>` : ''}
          ${discountPercent > 0 ? `<span class="discount-tag">-${discountPercent}% PROMO</span>` : ''}
        </div>

        <p class="modal-description">${product.description}</p>

        <div class="stock-status ${stockClass}" style="margin-bottom: 16px;">
          ● ${stockText}
        </div>

        <div class="modal-specs-title">Caractéristiques Techniques</div>
        <div class="modal-specs-list">
          ${specsHtml}
        </div>

        <div class="modal-action-row">
          <div class="quantity-control">
            <button class="qty-btn" onclick="changeModalQty(-1)">-</button>
            <input type="text" id="modal-qty-val" class="qty-input" value="1" readonly>
            <button class="qty-btn" onclick="changeModalQty(1, ${product.stock})">+</button>
          </div>
          <button class="btn btn-primary" style="flex-grow:1;" onclick="addModalItemToCart(${product.id})">
            🛒 Ajouter au panier
          </button>
        </div>

        <a href="https://wa.me/22379792629?text=${encodeURIComponent('Bonjour FKTECH, je suis intéressé par : ' + product.name + ' (' + formatFCFA(product.price) + ')')}" 
           target="_blank" class="btn-whatsapp-order">
          💬 Commander directement sur WhatsApp
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Empêche le défilement arrière
}

/**
 * Modifie la quantité sélectionnée dans la modale
 */
function changeModalQty(delta, maxStock = 99) {
  const input = document.getElementById('modal-qty-val');
  if (!input) return;
  let val = parseInt(input.value, 10) || 1;
  val += delta;
  if (val < 1) val = 1;
  if (val > maxStock) val = maxStock;
  input.value = val;
}

/**
 * Ajoute l'article depuis la modale avec la quantité choisie
 */
function addModalItemToCart(productId) {
  const input = document.getElementById('modal-qty-val');
  const qty = input ? parseInt(input.value, 10) : 1;
  addToCart(productId, qty);
  closeProductModal();
  openCartDrawer();
}

/**
 * Ferme la modale produit
 */
function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ----------------------------------------------------------------------------
// 8. SECTION CATÉGORIES (Rendu dynamique et navigation filtrée)
// ----------------------------------------------------------------------------

/**
 * Affiche les cartes de catégories avec compteurs
 */
function renderCategoriesGrid() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;

  let html = '';
  CATEGORIES_CONFIG.forEach(cat => {
    // Calculer le nombre de produits de cette catégorie
    const count = PRODUCTS_DATA.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;

    html += `
      <div class="category-card" onclick="filterByCategory('${cat.name}')">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-name">${cat.name}</div>
        <div class="category-count">${count} articles</div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

/**
 * Filtrer depuis une catégorie et scroller vers la boutique
 */
function filterByCategory(categoryName) {
  state.filters.category = categoryName;

  // Mise à jour de la barre latérale
  const buttons = document.querySelectorAll('.category-filter-btn');
  buttons.forEach(btn => {
    if (btn.dataset.category === categoryName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();
  scrollToSection('shop');
}

// ----------------------------------------------------------------------------
// 9. SECTION PROMOTIONS (« 🔥 Nos offres du moment »)
// ----------------------------------------------------------------------------

/**
 * Affiche la grille des produits en promotion
 */
function renderPromoSection() {
  const promoGrid = document.getElementById('promo-grid');
  if (!promoGrid) return;

  const promoProducts = PRODUCTS_DATA.filter(p => p.isPromo).slice(0, 4);

  let html = '';
  promoProducts.forEach(product => {
    const discountPercent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    const isFav = state.wishlist.includes(product.id);

    html += `
      <div class="product-card">
        <div class="product-image-box">
          <div class="product-badges">
            <span class="badge badge-promo">-${discountPercent}% PROMO</span>
          </div>
          <button class="btn-wishlist ${isFav ? 'active' : ''}" onclick="toggleWishlist(${product.id})" title="Ajouter aux favoris">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500';">
        </div>
        <div class="product-details">
          <div class="product-meta">
            <span class="product-brand">${product.brand}</span>
            <span class="product-category-tag">${product.category}</span>
          </div>
          <h3 class="product-title" title="${product.name}">${product.name}</h3>
          <div class="product-rating">
            ${renderStars(product.rating)}
            <span style="color:#fff; font-weight:700;">${product.rating}</span>
            <span class="reviews-count">(${product.reviews})</span>
          </div>
          <div class="product-pricing">
            <div class="price-row">
              <span class="current-price">${formatFCFA(product.price)}</span>
              <span class="old-price">${formatFCFA(product.oldPrice)}</span>
            </div>
            <div class="stock-status stock-in">● En stock garanti</div>
          </div>
          <div class="product-card-actions">
            <button class="btn-add-cart" onclick="addToCart(${product.id})">
              🛒 Ajouter
            </button>
            <button class="btn-quick-view" onclick="openProductModal(${product.id})" title="Voir les détails">
              👁️
            </button>
          </div>
        </div>
      </div>
    `;
  });

  promoGrid.innerHTML = html;
}

/**
 * Compte à rebours dynamique pour les ventes flash (ex: 18h 42m 15s)
 */
function initPromoCountdown() {
  const hoursEl = document.getElementById('promo-hours');
  const minutesEl = document.getElementById('promo-minutes');
  const secondsEl = document.getElementById('promo-seconds');
  if (!hoursEl || !minutesEl || !secondsEl) return;

  // Calcul d'une heure de fin basée sur la journée en cours
  let targetTime = new Date();
  targetTime.setHours(23, 59, 59, 999);

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetTime.getTime() - now;

    if (diff <= 0) {
      targetTime = new Date(now + 24 * 60 * 60 * 1000);
      return;
    }

    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ----------------------------------------------------------------------------
// 10. SECTION CATALOGUE PRINCIPAL & FILTRES DYNAMIQUES
// ----------------------------------------------------------------------------

/**
 * Initialise les filtres (catégories sidebar, liste des marques, curseur de prix)
 */
function initFilterControls() {
  // 1. Catégories dans la barre latérale
  const catList = document.getElementById('sidebar-categories');
  if (catList) {
    let catHtml = `
      <button class="category-filter-btn ${state.filters.category === 'all' ? 'active' : ''}" 
              data-category="all" onclick="setCategoryFilter('all')">
        <span>Toutes les catégories</span>
        <span class="count-tag">${PRODUCTS_DATA.length}</span>
      </button>
    `;

    CATEGORIES_CONFIG.forEach(cat => {
      const count = PRODUCTS_DATA.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
      catHtml += `
        <button class="category-filter-btn ${state.filters.category === cat.name ? 'active' : ''}" 
                data-category="${cat.name}" onclick="setCategoryFilter('${cat.name}')">
          <span>${cat.icon} ${cat.name}</span>
          <span class="count-tag">${count}</span>
        </button>
      `;
    });

    catList.innerHTML = catHtml;
  }

  // 2. Remplissage des Marques uniques
  const brandSelect = document.getElementById('filter-brand');
  if (brandSelect) {
    const brands = [...new Set(PRODUCTS_DATA.map(p => p.brand))].sort();
    brands.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      brandSelect.appendChild(opt);
    });
  }

  // 3. Curseur de prix max
  const priceSlider = document.getElementById('price-slider');
  const priceDisplay = document.getElementById('slider-max-price');
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      state.filters.maxPrice = val;
      priceDisplay.textContent = formatFCFA(val);
      renderProducts();
    });
  }

  // 4. Case promotion
  const promoCheck = document.getElementById('filter-promo-only');
  if (promoCheck) {
    promoCheck.addEventListener('change', (e) => {
      state.filters.onlyPromo = e.target.checked;
      renderProducts();
    });
  }

  // 5. Case en stock
  const stockCheck = document.getElementById('filter-stock-only');
  if (stockCheck) {
    stockCheck.addEventListener('change', (e) => {
      state.filters.onlyInStock = e.target.checked;
      renderProducts();
    });
  }

  // 6. Tri
  const sortSelect = document.getElementById('shop-sort-by');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.filters.sortBy = e.target.value;
      renderProducts();
    });
  }

  // 7. Recherche
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.filters.search = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  const headerSearchInput = document.getElementById('header-search-input');
  if (headerSearchInput) {
    headerSearchInput.addEventListener('input', (e) => {
      state.filters.search = e.target.value.toLowerCase().trim();
      if (searchInput) searchInput.value = e.target.value;
      renderProducts();
      scrollToSection('shop');
    });
  }
}

/**
 * Définit le filtre catégorie depuis la barre latérale
 */
function setCategoryFilter(category) {
  state.filters.category = category;

  const buttons = document.querySelectorAll('.category-filter-btn');
  buttons.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();
}

/**
 * Réinitialise tous les filtres
 */
function resetAllFilters() {
  state.filters = {
    search: '',
    category: 'all',
    brand: 'all',
    maxPrice: 2000000,
    onlyPromo: false,
    onlyInStock: false,
    sortBy: 'popular'
  };

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const headerSearch = document.getElementById('header-search-input');
  if (headerSearch) headerSearch.value = '';

  const brandSelect = document.getElementById('filter-brand');
  if (brandSelect) brandSelect.value = 'all';

  const priceSlider = document.getElementById('price-slider');
  const priceDisplay = document.getElementById('slider-max-price');
  if (priceSlider && priceDisplay) {
    priceSlider.value = 2000000;
    priceDisplay.textContent = formatFCFA(2000000);
  }

  const promoCheck = document.getElementById('filter-promo-only');
  if (promoCheck) promoCheck.checked = false;

  const stockCheck = document.getElementById('filter-stock-only');
  if (stockCheck) stockCheck.checked = false;

  const sortSelect = document.getElementById('shop-sort-by');
  if (sortSelect) sortSelect.value = 'popular';

  setCategoryFilter('all');
  showToast('Filtres réinitialisés', 'info');
}

/**
 * Filtrer par marque via le sélecteur
 */
function onBrandChange(brand) {
  state.filters.brand = brand;
  renderProducts();
}

/**
 * Rendu dynamique des produits avec prise en compte des filtres et du tri
 */
function renderProducts() {
  const container = document.getElementById('products-grid');
  const countEl = document.getElementById('product-count-display');
  if (!container) return;

  // Filtrage
  let filtered = PRODUCTS_DATA.filter(product => {
    // 1. Recherche par texte (nom, marque ou catégorie)
    if (state.filters.search) {
      const q = state.filters.search;
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCat) return false;
    }

    // 2. Filtre par Catégorie
    if (state.filters.category !== 'all') {
      if (product.category.toLowerCase() !== state.filters.category.toLowerCase()) {
        return false;
      }
    }

    // 3. Filtre par Marque
    if (state.filters.brand !== 'all') {
      if (product.brand.toLowerCase() !== state.filters.brand.toLowerCase()) {
        return false;
      }
    }

    // 4. Filtre par Prix Max
    if (product.price > state.filters.maxPrice) {
      return false;
    }

    // 5. Filtre Promotion uniquement
    if (state.filters.onlyPromo && !product.isPromo) {
      return false;
    }

    // 6. Filtre En stock uniquement
    if (state.filters.onlyInStock && product.stock <= 0) {
      return false;
    }

    return true;
  });

  // Tri
  switch (state.filters.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'popular':
    default:
      filtered.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      break;
  }

  // Mise à jour du compteur
  if (countEl) {
    countEl.textContent = `${filtered.length} produit${filtered.length > 1 ? 's' : ''} trouvé${filtered.length > 1 ? 's' : ''}`;
  }

  // Si aucun produit ne correspond
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>Aucun produit ne correspond à vos critères</h3>
        <p>Essayez de modifier votre recherche, d'augmenter le prix maximum ou de désactiver certains filtres.</p>
        <button class="btn btn-outline" onclick="resetAllFilters()">Réinitialiser les filtres</button>
      </div>
    `;
    return;
  }

  // Rendu des cartes produits
  let html = '';
  filtered.forEach(product => {
    const isFav = state.wishlist.includes(product.id);
    const discountPercent = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const stockClass = product.stock > 5 ? 'stock-in' : (product.stock > 0 ? 'stock-low' : 'stock-out');
    const stockText = product.stock > 5 ? 'En stock' : (product.stock > 0 ? `Plus que ${product.stock} dispo` : 'Rupture');

    html += `
      <div class="product-card">
        <div class="product-image-box">
          <div class="product-badges">
            ${product.isPromo ? `<span class="badge badge-promo">-${discountPercent}% PROMO</span>` : ''}
            ${product.isNew ? `<span class="badge badge-new">NOUVEAU</span>` : ''}
          </div>
          <button class="btn-wishlist ${isFav ? 'active' : ''}" onclick="toggleWishlist(${product.id})" title="Ajouter aux favoris">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500';">
        </div>

        <div class="product-details">
          <div class="product-meta">
            <span class="product-brand">${product.brand}</span>
            <span class="product-category-tag">${product.category}</span>
          </div>

          <h3 class="product-title" title="${product.name}">${product.name}</h3>

          <div class="product-rating">
            ${renderStars(product.rating)}
            <span style="color:#fff; font-weight:700;">${product.rating}</span>
            <span class="reviews-count">(${product.reviews})</span>
          </div>

          <div class="product-pricing">
            <div class="price-row">
              <span class="current-price">${formatFCFA(product.price)}</span>
              ${product.oldPrice ? `<span class="old-price">${formatFCFA(product.oldPrice)}</span>` : ''}
            </div>
            <div class="stock-status ${stockClass}">● ${stockText}</div>
          </div>

          <div class="product-card-actions">
            <button class="btn-add-cart" onclick="addToCart(${product.id})" ${product.stock <= 0 ? 'disabled' : ''}>
              ${product.stock > 0 ? '🛒 Ajouter' : 'Épuisé'}
            </button>
            <button class="btn-quick-view" onclick="openProductModal(${product.id})" title="Voir les détails">
              👁️
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ----------------------------------------------------------------------------
// 11. FORMULAIRE DE CONTACT & BOUTON WHATSAPP
// ----------------------------------------------------------------------------

/**
 * Gère l'envoi du formulaire de contact avec validation
 */
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const phone = document.getElementById('contact-phone').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !phone || !message) {
    showToast('Veuillez remplir tous les champs obligatoires.', 'info');
    return;
  }

  // Simulation d'envoi réussi
  showToast(`Merci ${name} ! Votre message a été transmis à l'équipe FKTECH.`, 'success');
  event.target.reset();
}

/**
 * Défilement fluide vers une section de la page
 */
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    const yOffset = -75; // Compense la hauteur du header fixe
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// ----------------------------------------------------------------------------
// 12. INITIALISATION GÉNÉRALE AU CHARGEMENT DE LA PAGE
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialiser les compteurs de badges
  updateCartBadge();
  updateWishlistBadge();

  // 2. Rendu des catégories
  renderCategoriesGrid();

  // 3. Rendu de la section promotions et son compte à rebours
  renderPromoSection();
  initPromoCountdown();

  // 4. Initialisation des contrôles de filtrage et catalogue
  initFilterControls();
  renderProducts();

  // 5. Gestion du Menu Hamburger Mobile
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });

    // Fermer le menu mobile lors d'un clic sur un lien
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });
  }

  // 6. Header au scroll (effet translucide prononcé)
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 7. Fermeture de la modale en cliquant à l'extérieur
  const productModal = document.getElementById('product-modal');
  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) {
        closeProductModal();
      }
    });
  }

  // 8. Fermeture du drawer panier en cliquant sur le backdrop
  const backdrop = document.getElementById('drawer-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeCartDrawer();
    });
  }

  // 9. Raccourci touche Echap pour fermer modale et drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCartDrawer();
    }
  });

  // 10. Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        showToast('Merci pour votre inscription à la newsletter FKTECH !', 'success');
        input.value = '';
      }
    });
  }
});
