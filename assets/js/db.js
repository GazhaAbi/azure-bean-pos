/**
 * db.js — Flat JSON & LocalStorage Client Database Manager
 * Menggantikan backend PHP agar aplikasi 100% berjalan murni dengan HTML, CSS, dan JSON.
 * Data disimpan secara persisten di localStorage browser.
 */

// Data Awal Bawaan (Default Seed Data)
const INITIAL_CATEGORIES = [
  { "id": "CAT-01", "name": "Kopi", "icon": "coffee", "color": "#0c4a7e" },
  { "id": "CAT-02", "name": "Non-Kopi", "icon": "local_cafe", "color": "#135c9a" },
  { "id": "CAT-03", "name": "Makanan", "icon": "bakery_dining", "color": "#8c5532" },
  { "id": "CAT-04", "name": "Minuman Dingin", "icon": "local_drink", "color": "#082c4f" }
];

const INITIAL_PRODUCTS = [
  { "id": "PRD-001", "category_id": "CAT-01", "sku": "CF-ESP-01", "name": "Iced Americano", "price": 28000, "stock": 50, "image_url": "assets/img/products/product_20261101_091055_fb5fb4a0.jpeg", "is_available": true },
  { "id": "PRD-002", "category_id": "CAT-01", "sku": "CF-LAT-02", "name": "Caramel Macchiato", "price": 45000, "stock": 30, "image_url": "assets/img/products/product_20261101_092725_469f9513.jpeg", "is_available": true },
  { "id": "PRD-003", "category_id": "CAT-01", "sku": "CF-FLT-03", "name": "V60 Pour Over", "price": 38000, "stock": 20, "image_url": "assets/img/products/product_20261101_093005_756bbb29.jpeg", "is_available": true },
  { "id": "PRD-007", "category_id": "CAT-02", "sku": "NC-CHO-02", "name": "Dark Chocolate", "price": 38000, "stock": 40, "image_url": "assets/img/products/product_20261101_093816_1dbd122d.jpeg", "is_available": true },
  { "id": "PRD-008", "category_id": "CAT-02", "sku": "NC-CHA-03", "name": "Chai Tea Latte", "price": 35000, "stock": 30, "image_url": "assets/img/products/product_20261101_093828_d59af1df.jpeg", "is_available": true },
  { "id": "PRD-009", "category_id": "CAT-03", "sku": "FK-CRS-01", "name": "Almond Croissant", "price": 35000, "stock": 15, "image_url": "assets/img/products/product_20261101_093840_ea88ff03.jpeg", "is_available": true },
  { "id": "PRD-010", "category_id": "CAT-03", "sku": "FK-BNR-02", "name": "Banana Bread", "price": 28000, "stock": 10, "image_url": "assets/img/products/product_20261101_093852_5a264587.jpeg", "is_available": true },
  { "id": "PRD-011", "category_id": "CAT-03", "sku": "FK-SND-03", "name": "Tuna Sandwich", "price": 45000, "stock": 8, "image_url": "assets/img/products/product_20261101_093920_e27fda66.jpeg", "is_available": true },
  { "id": "PRD-012", "category_id": "CAT-04", "sku": "MD-ICT-01", "name": "Mineral Water", "price": 18000, "stock": 60, "image_url": "assets/img/products/product_20261101_094237_90981980.jpeg", "is_available": true },
  { "id": "PRD-013", "category_id": "CAT-04", "sku": "MD-LMN-02", "name": "Sparkling Water", "price": 22000, "stock": 45, "image_url": "assets/img/products/product_20261101_094258_894b8bae.jpeg", "is_available": true }
];

const INITIAL_USERS = [
  { "id": "USR-001", "name": "Admin Azure Bean", "username": "admin", "password": "password", "role": "admin" },
  { "id": "USR-002", "name": "Kasir 1", "username": "kasir1", "password": "password", "role": "cashier" }
];

const INITIAL_TABLES = [
  { id: "T-01", name: "Meja 01", capacity: 2, shape: "round", zone: "Area Jendela", status: "available", order_id: null, customer_name: null, updated_at: null },
  { id: "T-02", name: "Meja 02", capacity: 2, shape: "round", zone: "Area Jendela", status: "available", order_id: null, customer_name: null, updated_at: null },
  { id: "T-03", name: "Meja 03", capacity: 4, shape: "rect", zone: "Area Tengah", status: "occupied",  order_id: "ORD-0001", customer_name: "Budi Santoso", updated_at: "09:15" },
  { id: "T-04", name: "Meja 04", capacity: 4, shape: "rect", zone: "Area Tengah", status: "available", order_id: null, customer_name: null, updated_at: null },
  { id: "T-05", name: "Meja 05", capacity: 4, shape: "rect", zone: "Area Tengah", status: "occupied",  order_id: "ORD-0002", customer_name: "Sarah", updated_at: "10:20" },
  { id: "T-06", name: "Meja 06", capacity: 6, shape: "long-rect", zone: "Area Komunal", status: "cleaning",  order_id: null, customer_name: null, updated_at: "11:00" },
  { id: "T-VIP", name: "Meja VIP", capacity: 8, shape: "sofa", zone: "Lounge VIP", status: "available", order_id: null, customer_name: null, updated_at: null }
];

const INITIAL_ORDERS = [
  {
    "id": "ORD-20261026-0001",
    "cashier_name": "Kasir 1",
    "customer_name": "Pelanggan Umum",
    "created_at": "2026-10-26 19:10:00",
    "subtotal": 73000,
    "tax": 7300,
    "discount": 0,
    "total_amount": 80300,
    "payment_method": "QRIS",
    "amount_paid": 80300,
    "change_amount": 0,
    "items": [
      { "product_id": "PRD-001", "name": "Iced Americano", "quantity": 1, "unit_price": 28000, "subtotal": 28000, "notes": "Less ice" },
      { "product_id": "PRD-008", "name": "Chai Tea Latte", "quantity": 1, "unit_price": 35000, "subtotal": 35000, "notes": "" }
    ]
  }
];

class JsonDatabaseManager {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    if (!localStorage.getItem('pos_products')) {
      localStorage.setItem('pos_products', JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem('pos_categories')) {
      localStorage.setItem('pos_categories', JSON.stringify(INITIAL_CATEGORIES));
    }
    if (!localStorage.getItem('pos_users')) {
      localStorage.setItem('pos_users', JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem('pos_tables')) {
      localStorage.setItem('pos_tables', JSON.stringify(INITIAL_TABLES));
    }
    if (!localStorage.getItem('pos_orders')) {
      const today = new Date().toISOString().slice(0, 10);
      const dateNum = today.replace(/-/g, '');
      const sampleOrders = [
        {
          "id": `ORD-${dateNum}-0001`,
          "order_type": "self_order",
          "table_number": "Meja 03",
          "cashier_name": "Self-Order (Meja 03)",
          "customer_name": "Budi Santoso (Meja 03)",
          "created_at": `${today} 09:15:00`,
          "subtotal": 63000,
          "tax": 6300,
          "discount": 0,
          "total_amount": 69300,
          "payment_method": "Bayar di Kasir",
          "payment_status": "unpaid",
          "order_status": "pending",
          "amount_paid": 0,
          "change_amount": 0,
          "items": [
            { "product_id": "PRD-001", "name": "Iced Americano", "quantity": 1, "unit_price": 28000, "subtotal": 28000, "notes": "Less sweet, extra ice" },
            { "product_id": "PRD-009", "name": "Almond Croissant", "quantity": 1, "unit_price": 35000, "subtotal": 35000, "notes": "Hangatkan" }
          ]
        },
        {
          "id": `ORD-${dateNum}-0002`,
          "order_type": "self_order",
          "table_number": "Meja 05",
          "cashier_name": "Self-Order (Meja 05)",
          "customer_name": "Sarah (Meja 05)",
          "created_at": `${today} 10:20:00`,
          "subtotal": 83000,
          "tax": 8300,
          "discount": 0,
          "total_amount": 91300,
          "payment_method": "QRIS",
          "payment_status": "paid",
          "order_status": "processing",
          "amount_paid": 91300,
          "change_amount": 0,
          "items": [
            { "product_id": "PRD-002", "name": "Caramel Macchiato", "quantity": 1, "unit_price": 45000, "subtotal": 45000, "notes": "Oat milk" },
            { "product_id": "PRD-007", "name": "Dark Chocolate", "quantity": 1, "unit_price": 38000, "subtotal": 38000, "notes": "Extra hot" }
          ]
        },
        {
          "id": `ORD-${dateNum}-0003`,
          "order_type": "pos",
          "table_number": "Meja 01",
          "cashier_name": "Kasir 1",
          "customer_name": "Dimas (Meja 01)",
          "created_at": `${today} 11:05:00`,
          "subtotal": 45000,
          "tax": 4500,
          "discount": 0,
          "total_amount": 49500,
          "payment_method": "Tunai",
          "payment_status": "paid",
          "order_status": "completed",
          "amount_paid": 50000,
          "change_amount": 500,
          "items": [
            { "product_id": "PRD-002", "name": "Caramel Macchiato", "quantity": 1, "unit_price": 45000, "subtotal": 45000, "notes": "" }
          ]
        }
      ];
      localStorage.setItem('pos_orders', JSON.stringify(sampleOrders));
    }
  }

  // ─── AUTHENTICATION ────────────────────────────────────────────────────────
  getAuthUser() {
    const raw = sessionStorage.getItem('pos_current_user') || localStorage.getItem('pos_current_user');
    return raw ? JSON.parse(raw) : null;
  }

  requireAuth() {
    const user = this.getAuthUser();
    if (!user) {
      window.location.href = 'login.html';
      return null;
    }
    return user;
  }

  login(username, password) {
    const users = JSON.parse(localStorage.getItem('pos_users') || '[]');
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      const userData = { id: found.id, name: found.name, username: found.username, role: found.role };
      sessionStorage.setItem('pos_current_user', JSON.stringify(userData));
      localStorage.setItem('pos_current_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Username atau password salah.' };
  }

  logout() {
    sessionStorage.removeItem('pos_current_user');
    localStorage.removeItem('pos_current_user');
    window.location.href = 'login.html';
  }

  // ─── PRODUCTS ──────────────────────────────────────────────────────────────
  getProducts() {
    return JSON.parse(localStorage.getItem('pos_products') || '[]');
  }

  getAvailableProducts() {
    return this.getProducts().filter(p => p.is_available);
  }

  getProductById(id) {
    return this.getProducts().find(p => p.id === id) || null;
  }

  saveProduct(data, editingId = null) {
    let products = this.getProducts();
    if (editingId) {
      const idx = products.findIndex(p => p.id === editingId);
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...data };
        localStorage.setItem('pos_products', JSON.stringify(products));
        return { success: true, message: 'Produk berhasil diperbarui.', data: products[idx] };
      }
      return { success: false, message: 'Produk tidak ditemukan.' };
    } else {
      // Generate ID unik baru: PRD-XXX
      const maxNum = products.reduce((max, p) => {
        const num = parseInt(p.id.replace('PRD-', ''), 10);
        return !isNaN(num) && num > max ? num : max;
      }, 0);
      const newId = 'PRD-' + String(maxNum + 1).padStart(3, '0');
      const newProduct = {
        id: newId,
        sku: data.sku || 'SKU-' + Date.now().toString().slice(-6),
        name: data.name,
        category_id: data.category_id || 'CAT-01',
        price: parseFloat(data.price) || 0,
        stock: parseInt(data.stock, 10) || 0,
        image_url: data.image_url || 'assets/img/coffee_placeholder.svg',
        is_available: data.is_available !== undefined ? data.is_available : true
      };
      products.push(newProduct);
      localStorage.setItem('pos_products', JSON.stringify(products));
      return { success: true, message: 'Produk berhasil ditambahkan.', data: newProduct };
    }
  }

  deleteProduct(id) {
    let products = this.getProducts();
    const initLen = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length !== initLen) {
      localStorage.setItem('pos_products', JSON.stringify(products));
      return { success: true, message: 'Produk berhasil dihapus.' };
    }
    return { success: false, message: 'Produk tidak ditemukan.' };
  }

  // ─── CATEGORIES ────────────────────────────────────────────────────────────
  getCategories() {
    return JSON.parse(localStorage.getItem('pos_categories') || '[]');
  }

  // ─── ORDERS & TRANSACTIONS ─────────────────────────────────────────────────
  getOrders() {
    return JSON.parse(localStorage.getItem('pos_orders') || '[]');
  }

  createOrder(payload) {
    const products = this.getProducts();

    // 1. Validasi Stok
    for (const item of payload.items) {
      const prod = products.find(p => p.id === item.product_id);
      if (!prod) {
        return { success: false, message: `Produk ${item.name} tidak ditemukan.` };
      }
      if (prod.stock < item.quantity) {
        return { success: false, message: `Stok ${prod.name} tidak cukup (sisa: ${prod.stock}).` };
      }
    }

    // 2. Potong Stok
    for (const item of payload.items) {
      const prod = products.find(p => p.id === item.product_id);
      if (prod) {
        prod.stock -= item.quantity;
      }
    }
    localStorage.setItem('pos_products', JSON.stringify(products));

    // 3. Buat ID Nota: ORD-YYYYMMDD-XXXX
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const orders = this.getOrders();
    const todayOrders = orders.filter(o => o.id.includes(`ORD-${dateStr}`));
    const orderId = `ORD-${dateStr}-${String(todayOrders.length + 1).padStart(4, '0')}`;

    // Hitung Subtotal, Pajak PB1 10%, Total
    const subtotal = payload.items.reduce((s, i) => s + (i.unit_price * i.quantity), 0);
    const tax = Math.round(subtotal * 0.10);
    const discount = payload.discount || 0;
    const totalAmount = subtotal + tax - discount;
    const amountPaid = payload.amount_paid || totalAmount;
    const changeAmount = Math.max(0, amountPaid - totalAmount);

    const isSelfOrder = payload.order_type === 'self_order' || (payload.cashier_name && payload.cashier_name.includes('Self-Order'));
    const isBayarDiKasir = payload.payment_method === 'Bayar di Kasir';

    // Ekstrak nama meja jika ada
    let tableNum = payload.table_number || 'Kasir Langsung';
    if (!payload.table_number && payload.customer_name) {
      const match = payload.customer_name.match(/Meja\s\w+|Take\sAway|VIP/i);
      if (match) tableNum = match[0];
    }

    const newOrder = {
      id: orderId,
      order_type: payload.order_type || (isSelfOrder ? 'self_order' : 'pos'),
      table_number: tableNum,
      cashier_name: payload.cashier_name || 'Kasir',
      customer_name: payload.customer_name || 'Pelanggan Umum',
      created_at: now.toISOString().replace('T', ' ').slice(0, 19),
      subtotal: subtotal,
      tax: tax,
      discount: discount,
      total_amount: totalAmount,
      payment_method: payload.payment_method || 'Tunai',
      payment_status: payload.payment_status || (isBayarDiKasir ? 'unpaid' : 'paid'),
      order_status: payload.order_status || (isBayarDiKasir ? 'pending' : (isSelfOrder ? 'processing' : 'completed')),
      amount_paid: amountPaid,
      change_amount: changeAmount,
      items: payload.items
    };

    orders.unshift(newOrder); // Urutkan terbaru di awal
    localStorage.setItem('pos_orders', JSON.stringify(orders));

    // Update status meja jika order menempati meja kafe
    if (tableNum && tableNum.startsWith('Meja')) {
      this.updateTableStatus(tableNum, 'occupied', payload.customer_name, orderId);
    }

    // Kirim sinyal event ke window/tab lain
    try {
      window.dispatchEvent(new CustomEvent('pos_order_created', { detail: newOrder }));
    } catch(e) {}

    return {
      success: true,
      message: 'Transaksi berhasil disimpan.',
      data: newOrder
    };
  }

  // Update status alur pesanan (pending -> processing -> ready -> completed -> cancelled)
  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      orders[idx].order_status = newStatus;
      localStorage.setItem('pos_orders', JSON.stringify(orders));

      // Jika pesanan selesai, tandai meja terkait sebagai 'cleaning' (Perlu Dibersihkan)
      if (newStatus === 'completed') {
        const tableNum = orders[idx].table_number;
        if (tableNum && tableNum.startsWith('Meja')) {
          this.updateTableStatus(tableNum, 'cleaning');
        }
      }

      try {
        window.dispatchEvent(new CustomEvent('pos_orders_updated', { detail: { orderId, newStatus } }));
      } catch(e) {}
      return { success: true, message: `Status pesanan berhasil diubah menjadi "${newStatus}".`, order: orders[idx] };
    }
    return { success: false, message: 'Pesanan tidak ditemukan.' };
  }

  // Kasir memproses pembayaran untuk pesanan "Bayar di Kasir"
  payOrder(orderId, paymentData) {
    const orders = this.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      const order = orders[idx];
      const amountPaid = parseFloat(paymentData.amount_paid) || order.total_amount;
      const changeAmount = Math.max(0, amountPaid - order.total_amount);

      order.payment_method = paymentData.payment_method || 'Tunai';
      order.payment_status = 'paid';
      order.amount_paid = amountPaid;
      order.change_amount = changeAmount;
      order.order_status = 'processing'; // Langsung lanjut ke status sedang diracik
      if (paymentData.cashier_name) {
        order.cashier_name = paymentData.cashier_name;
      }

      localStorage.setItem('pos_orders', JSON.stringify(orders));
      try {
        window.dispatchEvent(new CustomEvent('pos_orders_updated', { detail: { orderId, action: 'paid' } }));
      } catch(e) {}
      return { success: true, message: 'Pembayaran kasir berhasil diselesaikan.', order: order };
    }
    return { success: false, message: 'Pesanan tidak ditemukan.' };
  }

  // Batalkan pesanan dan kembalikan stok produk otomatis
  cancelOrder(orderId, reason = '') {
    const orders = this.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      const order = orders[idx];
      if (order.order_status === 'cancelled') {
        return { success: false, message: 'Pesanan ini sudah dibatalkan sebelumnya.' };
      }

      // Kembalikan stok produk ke inventaris
      const products = this.getProducts();
      for (const item of (order.items || [])) {
        const prod = products.find(p => p.id === item.product_id);
        if (prod) {
          prod.stock += item.quantity;
        }
      }
      localStorage.setItem('pos_products', JSON.stringify(products));

      order.order_status = 'cancelled';
      order.cancel_reason = reason || 'Dibatalkan oleh kasir';
      localStorage.setItem('pos_orders', JSON.stringify(orders));

      try {
        window.dispatchEvent(new CustomEvent('pos_orders_updated', { detail: { orderId, action: 'cancelled' } }));
      } catch(e) {}
      return { success: true, message: 'Pesanan berhasil dibatalkan dan stok dikembalikan.', order: order };
    }
    return { success: false, message: 'Pesanan tidak ditemukan.' };
  }

  // Hitung berapa pesanan mandiri yang butuh konfirmasi/bayar oleh kasir hari ini
  getPendingSelfOrdersCount() {
    const today = new Date().toISOString().slice(0, 10);
    const orders = this.getOrders().filter(o => o.created_at && o.created_at.startsWith(today));
    return orders.filter(o => o.order_type === 'self_order' && (o.order_status === 'pending' || o.payment_status === 'unpaid')).length;
  }

  getTodaySummary() {
    const today = new Date().toISOString().slice(0, 10);
    const orders = this.getOrders().filter(o => o.created_at.startsWith(today));
    const totalRevenue = orders.reduce((s, o) => s + o.total_amount, 0);
    return {
      date: today,
      order_count: orders.length,
      total_revenue: totalRevenue
    };
  }

  // ─── TABLE MANAGEMENT (STATUS MEJA & KEBERSIHAN & ATURAN WAKTU) ──────────
  getTables() {
    if (!localStorage.getItem('pos_tables')) {
      // Setel seed awal dengan timer aktif untuk demo
      const now = Date.now();
      const seeded = INITIAL_TABLES.map(t => {
        if (t.name === 'Meja 03') {
          return { ...t, duration_limit_minutes: 60, seated_at: now - (20 * 60 * 1000), expires_at: now + (40 * 60 * 1000) };
        } else if (t.name === 'Meja 05') {
          return { ...t, duration_limit_minutes: 60, seated_at: now - (50 * 60 * 1000), expires_at: now + (10 * 60 * 1000) };
        } else if (t.name === 'Meja 06') {
          return { ...t, duration_limit_minutes: 60, seated_at: now - (70 * 60 * 1000), expires_at: now - (10 * 60 * 1000) };
        }
        return { ...t, duration_limit_minutes: 60, seated_at: null, expires_at: null };
      });
      localStorage.setItem('pos_tables', JSON.stringify(seeded));
    }

    const stored = JSON.parse(localStorage.getItem('pos_tables') || '[]');
    const now = Date.now();

    return stored.map(s => {
      const init = INITIAL_TABLES.find(i => i.id === s.id || (s.name && i.name.toLowerCase() === s.name.toLowerCase())) || {};
      const merged = { ...init, ...s };
      if (!merged.zone) merged.zone = init.zone || 'Area Tengah';
      if (!merged.shape) merged.shape = init.shape || 'rect';
      if (!merged.capacity) merged.capacity = init.capacity || 4;
      if (!merged.duration_limit_minutes) merged.duration_limit_minutes = 60;

      // Inisialisasi waktu jika status terpakai tapi belum punya expires_at
      if (merged.status === 'occupied') {
        if (!merged.seated_at) merged.seated_at = now - (15 * 60 * 1000);
        if (!merged.expires_at) merged.expires_at = merged.seated_at + (merged.duration_limit_minutes * 60 * 1000);
      }

      if (merged.customer_name) {
        merged.customer_name = merged.customer_name.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
      }
      return merged;
    });
  }

  getTableByName(name) {
    if (!name) return null;
    const cleanName = name.replace(/[()]/g, '').trim().toLowerCase();
    return this.getTables().find(t => t.name.toLowerCase() === cleanName || t.id.toLowerCase() === cleanName) || null;
  }

  updateTableStatus(tableName, status, customerName = null, orderId = null, durationMinutes = 60) {
    const tables = this.getTables();
    const cleanTarget = tableName.replace(/[()]/g, '').trim().toLowerCase();
    const idx = tables.findIndex(t => t.name.toLowerCase() === cleanTarget || t.id.toLowerCase() === cleanTarget);

    if (idx !== -1) {
      tables[idx].status = status;
      const now = Date.now();

      if (status === 'occupied') {
        const cleanCust = customerName ? customerName.replace(/\s*\([^)]*\)\s*/g, ' ').trim() : null;
        tables[idx].customer_name = cleanCust || tables[idx].customer_name || 'Pelanggan';
        tables[idx].order_id = orderId || tables[idx].order_id || null;
        tables[idx].updated_at = new Date().toTimeString().slice(0, 5);
        tables[idx].duration_limit_minutes = durationMinutes || tables[idx].duration_limit_minutes || 60;
        tables[idx].seated_at = now;
        tables[idx].expires_at = now + (tables[idx].duration_limit_minutes * 60 * 1000);
      } else if (status === 'cleaning') {
        // Meja selesai digunakan atau waktu habis, menunggu dibersihkan
        tables[idx].updated_at = new Date().toTimeString().slice(0, 5);
      } else if (status === 'available') {
        // Meja sudah dibersihkan dan siap dipakai
        tables[idx].customer_name = null;
        tables[idx].order_id = null;
        tables[idx].updated_at = new Date().toTimeString().slice(0, 5);
        tables[idx].seated_at = null;
        tables[idx].expires_at = null;
        tables[idx].duration_limit_minutes = 60;
      }

      localStorage.setItem('pos_tables', JSON.stringify(tables));

      try {
        window.dispatchEvent(new CustomEvent('pos_tables_updated', { detail: tables[idx] }));
      } catch (e) {}

      return { success: true, message: `Status ${tables[idx].name} diperbarui menjadi "${status}".`, table: tables[idx] };
    }
    return { success: false, message: `Meja ${tableName} tidak ditemukan.` };
  }

  // Perpanjang waktu santai tamu (+15, +30, atau +60 menit)
  extendTableTimer(tableName, extraMinutes = 30) {
    const tables = this.getTables();
    const cleanTarget = tableName.replace(/[()]/g, '').trim().toLowerCase();
    const idx = tables.findIndex(t => t.name.toLowerCase() === cleanTarget || t.id.toLowerCase() === cleanTarget);

    if (idx !== -1 && tables[idx].status === 'occupied') {
      const now = Date.now();
      const base = tables[idx].expires_at && tables[idx].expires_at > now ? tables[idx].expires_at : now;
      tables[idx].expires_at = base + (extraMinutes * 60 * 1000);
      tables[idx].duration_limit_minutes = (tables[idx].duration_limit_minutes || 60) + extraMinutes;

      localStorage.setItem('pos_tables', JSON.stringify(tables));
      try {
        window.dispatchEvent(new CustomEvent('pos_tables_updated', { detail: tables[idx] }));
      } catch (e) {}

      return { success: true, message: `Waktu ${tables[idx].name} diperpanjang +${extraMinutes} menit.`, table: tables[idx] };
    }
    return { success: false, message: `Meja ${tableName} tidak sedang terpakai.` };
  }

  // Cek timer meja secara otomatis: jika waktu habis, alihkan ke 'cleaning'
  checkTableTimers() {
    const tables = this.getTables();
    const now = Date.now();
    let updated = false;

    tables.forEach(t => {
      if (t.status === 'occupied' && t.expires_at && now >= t.expires_at) {
        t.status = 'cleaning';
        t.updated_at = new Date().toTimeString().slice(0, 5);
        updated = true;
      }
    });

    if (updated) {
      localStorage.setItem('pos_tables', JSON.stringify(tables));
      try {
        window.dispatchEvent(new CustomEvent('pos_tables_updated', { detail: { reason: 'timer_expired' } }));
      } catch (e) {}
    }
    return tables;
  }

  markTableCleaning(tableName) {
    return this.updateTableStatus(tableName, 'cleaning');
  }

  markTableCleaned(tableName) {
    return this.updateTableStatus(tableName, 'available');
  }

  // Reset database ke kondisi awal
  resetDatabase() {
    localStorage.removeItem('pos_products');
    localStorage.removeItem('pos_categories');
    localStorage.removeItem('pos_orders');
    localStorage.removeItem('pos_users');
    localStorage.removeItem('pos_tables');
    this.initStorage();
    location.reload();
  }
}

// Instance Global yang siap digunakan di semua halaman
window.DB = new JsonDatabaseManager();
