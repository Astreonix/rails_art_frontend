import api, { hasApiBase } from './api.js';

export const CATEGORIES = [
  { slug: 'fine-arts', name: 'Fine Arts' },
  { slug: 'office-supplies', name: 'Office Supplies' },
  { slug: 'school-supplies', name: 'School Supplies' },
  { slug: 'painting', name: 'Painting' },
  { slug: 'sketching', name: 'Sketching' },
  { slug: 'crafts', name: 'Crafts' },
];

export const formatPrice = (value) =>
  `Rs ${Number(value || 0).toLocaleString('en-PK')}`;

const SEED_PRODUCTS = [
  {
    id: 'p1',
    name: 'Acrylic Colour Set (12 Pcs) 15ml',
    brand: 'Rails Art',
    category: 'painting',
    price: 1450,
    compareAt: 1800,
    stock: 24,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    ],
    description:
      'A complete 12-colour acrylic set for students and artists. Smooth coverage on canvas, paper, and wood.',
    variants: [
      { id: 'p1-15', name: '15ml', price: 1450, stock: 24 },
      { id: 'p1-75', name: '75ml', price: 2890, stock: 10 },
    ],
  },
  {
    id: 'p2',
    name: 'Professional Watercolour Cake Set',
    brand: 'Rails Art',
    category: 'fine-arts',
    price: 2200,
    compareAt: 0,
    stock: 18,
    images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80'],
    description: 'Rich pigments with excellent blending for studio and classroom painting.',
    variants: [
      { id: 'p2-12', name: '12 colours', price: 2200, stock: 18 },
      { id: 'p2-24', name: '24 colours', price: 3450, stock: 8 },
    ],
  },
  {
    id: 'p3',
    name: 'Sketchbook A4 120gsm (50 Sheets)',
    brand: 'Rails Art',
    category: 'sketching',
    price: 650,
    compareAt: 790,
    stock: 40,
    images: ['https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80'],
    description: 'Acid-free sketch paper suitable for pencil, charcoal, and light ink work.',
    variants: [
      { id: 'p3-a5', name: 'A5', price: 450, stock: 20 },
      { id: 'p3-a4', name: 'A4', price: 650, stock: 40 },
      { id: 'p3-a3', name: 'A3', price: 980, stock: 12 },
    ],
  },
  {
    id: 'p4',
    name: 'Graphite Pencil Set 2H–8B',
    brand: 'Rails Art',
    category: 'sketching',
    price: 890,
    compareAt: 0,
    stock: 32,
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80'],
    description: 'Twelve graded graphite pencils for technical drawing and portrait work.',
    variants: [{ id: 'p4-std', name: 'Standard', price: 890, stock: 32 }],
  },
  {
    id: 'p5',
    name: 'Round Brush Set (7 Pcs)',
    brand: 'Rails Art',
    category: 'painting',
    price: 1190,
    compareAt: 1490,
    stock: 21,
    images: ['https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80'],
    description: 'Synthetic round brushes from fine detail to wash sizes.',
    variants: [{ id: 'p5-std', name: '7 pcs', price: 1190, stock: 21 }],
  },
  {
    id: 'p6',
    name: 'Office Ballpoint Pen Box (50 Pcs)',
    brand: 'Rails Art',
    category: 'office-supplies',
    price: 750,
    compareAt: 0,
    stock: 60,
    images: ['https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80'],
    description: 'Smooth-writing office pens for daily use in schools and workplaces.',
    variants: [
      { id: 'p6-blue', name: 'Blue', price: 750, stock: 30 },
      { id: 'p6-black', name: 'Black', price: 750, stock: 30 },
    ],
  },
  {
    id: 'p7',
    name: 'School Geometry Box',
    brand: 'Rails Art',
    category: 'school-supplies',
    price: 420,
    compareAt: 0,
    stock: 45,
    images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'],
    description: 'Complete geometry set with compass, divider, ruler, and protractor.',
    variants: [{ id: 'p7-std', name: 'Standard', price: 420, stock: 45 }],
  },
  {
    id: 'p8',
    name: 'Craft Glue Stick Pack (6 Pcs)',
    brand: 'Rails Art',
    category: 'crafts',
    price: 380,
    compareAt: 0,
    stock: 0,
    images: ['https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900&q=80'],
    description: 'Non-toxic glue sticks for paper crafts and classroom projects.',
    variants: [{ id: 'p8-std', name: '6 pcs', price: 380, stock: 0 }],
  },
  {
    id: 'p9',
    name: 'Canvas Board 8x10 (Pack of 3)',
    brand: 'Rails Art',
    category: 'fine-arts',
    price: 1650,
    compareAt: 1990,
    stock: 16,
    images: ['https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&q=80'],
    description: 'Primed canvas boards ready for acrylic and oil painting.',
    variants: [
      { id: 'p9-810', name: '8x10', price: 1650, stock: 16 },
      { id: 'p9-1216', name: '12x16', price: 2450, stock: 9 },
    ],
  },
  {
    id: 'p10',
    name: 'Marker Set Dual Tip 24 Colours',
    brand: 'Rails Art',
    category: 'crafts',
    price: 2590,
    compareAt: 0,
    stock: 14,
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80'],
    description: 'Dual-tip alcohol markers for illustration, lettering, and design.',
    variants: [
      { id: 'p10-12', name: '12 colours', price: 1590, stock: 10 },
      { id: 'p10-24', name: '24 colours', price: 2590, stock: 14 },
    ],
  },
  {
    id: 'p11',
    name: 'A4 Copier Paper Ream 80gsm',
    brand: 'Rails Art',
    category: 'office-supplies',
    price: 1290,
    compareAt: 0,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80'],
    description: 'Bright white copier paper for office printing and documentation.',
    variants: [{ id: 'p11-std', name: '500 sheets', price: 1290, stock: 50 }],
  },
  {
    id: 'p12',
    name: 'Kids Colour Pencil Set 24 Pcs',
    brand: 'Rails Art',
    category: 'school-supplies',
    price: 540,
    compareAt: 690,
    stock: 28,
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=750&q=80'],
    description: 'Break-resistant colour pencils for school art periods and homework.',
    variants: [{ id: 'p12-std', name: '24 pcs', price: 540, stock: 28 }],
  },
];

const LS_KEY = 'rails_art_products';

const readLocal = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeLocal = (products) => {
  localStorage.setItem(LS_KEY, JSON.stringify(products));
};

export const getLocalProducts = () => readLocal() || SEED_PRODUCTS;

export const getCategories = async () => {
  if (hasApiBase) {
    try {
      const { data } = await api.get('/api/categories');
      return data.categories || data;
    } catch {
      /* fallback */
    }
  }
  return CATEGORIES;
};

export const getProducts = async (params = {}) => {
  if (hasApiBase) {
    try {
      const { data } = await api.get('/api/products', { params });
      return data.products || data;
    } catch {
      /* fallback */
    }
  }
  let list = getLocalProducts();
  if (params.category && params.category !== 'all') {
    list = list.filter((p) => p.category === params.category);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }
  if (params.sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
  if (params.sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
  if (params.sort === 'name-asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (params.sort === 'name-desc') list = [...list].sort((a, b) => b.name.localeCompare(a.name));
  return list;
};

export const getProductById = async (id) => {
  if (hasApiBase) {
    try {
      const { data } = await api.get(`/api/products/${id}`);
      return data.product || data;
    } catch {
      /* fallback */
    }
  }
  return getLocalProducts().find((p) => p.id === id) || null;
};

export const saveProduct = async (product) => {
  if (hasApiBase) {
    if (product.id) {
      const { data } = await api.put(`/api/products/${product.id}`, product);
      return data.product || data;
    }
    const { data } = await api.post('/api/products', product);
    return data.product || data;
  }
  const list = getLocalProducts();
  if (product.id) {
    const next = list.map((p) => (p.id === product.id ? { ...p, ...product } : p));
    writeLocal(next);
    return next.find((p) => p.id === product.id);
  }
  const created = {
    ...product,
    id: `p${Date.now()}`,
    images: product.images?.length ? product.images : [SEED_PRODUCTS[0].images[0]],
    variants: product.variants?.length
      ? product.variants
      : [{ id: `v${Date.now()}`, name: 'Standard', price: Number(product.price) || 0, stock: Number(product.stock) || 0 }],
  };
  writeLocal([created, ...list]);
  return created;
};

export const deleteProduct = async (id) => {
  if (hasApiBase) {
    await api.delete(`/api/products/${id}`);
    return;
  }
  writeLocal(getLocalProducts().filter((p) => p.id !== id));
};
