export async function createOrder(db, data) {
  return db.prepare(`INSERT INTO orders (stripe_session_id, customer_name, customer_email, shipping_address, items, subtotal, shipping, total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(data.stripe_session_id, data.customer_name, data.customer_email, data.shipping_address, data.items, data.subtotal, data.shipping, data.total, data.status).run()
}
export async function getOrderBySession(db, sessionId) {
  return db.prepare('SELECT * FROM orders WHERE stripe_session_id = ?').bind(sessionId).first()
}
export async function getAllOrders(db) {
  const { results } = await db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all()
  return results
}
export async function updateOrderStatus(db, id, status, tracking = null) {
  return db.prepare('UPDATE orders SET status = ?, tracking_number = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(status, tracking, id).run()
}
export async function updateOrderNotes(db, id, notes) {
  return db.prepare('UPDATE orders SET notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(notes, id).run()
}
export async function getInventory(db) {
  const { results } = await db.prepare('SELECT * FROM inventory').all()
  return results
}
export async function getStock(db, productId) {
  const row = await db.prepare('SELECT stock FROM inventory WHERE product_id = ?').bind(productId).first()
  return row ? row.stock : 0
}
export async function deductStock(db, productId, qty) {
  return db.prepare('UPDATE inventory SET stock = MAX(0, stock - ?), updated_at = CURRENT_TIMESTAMP WHERE product_id = ?').bind(qty, productId).run()
}
export async function setStock(db, productId, qty) {
  return db.prepare('UPDATE inventory SET stock = ?, updated_at = CURRENT_TIMESTAMP WHERE product_id = ?').bind(qty, productId).run()
}
export async function getLowStockItems(db) {
  const { results } = await db.prepare('SELECT * FROM inventory WHERE stock <= low_stock_threshold').all()
  return results
}
