CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, stripe_session_id TEXT UNIQUE, status TEXT DEFAULT 'pending', customer_name TEXT, customer_email TEXT, shipping_address TEXT, items TEXT, subtotal INTEGER, shipping INTEGER, total INTEGER, tracking_number TEXT, notes TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS inventory (product_id TEXT PRIMARY KEY, product_name TEXT, stock INTEGER DEFAULT 0, low_stock_threshold INTEGER DEFAULT 5, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO inventory VALUES ('rl-500ml','Rio Largo 500ml',50,10,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO inventory VALUES ('rl-1l','Rio Largo 1 Litre',40,8,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO inventory VALUES ('rl-2l','Rio Largo 2 Litre',25,5,CURRENT_TIMESTAMP);
