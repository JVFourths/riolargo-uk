function getResend() { const { Resend } = require('resend'); return new Resend(process.env.RESEND_API_KEY || 'placeholder') }
const FROM = () => process.env.FROM_EMAIL || 'orders@riolargo.co.uk'
const ADMIN = () => process.env.ADMIN_EMAIL || 'admin@riolargo.co.uk'

export async function sendOrderConfirmation(order) {
  const items = JSON.parse(order.items)
  const rows = items.map(i => `<tr><td>${i.name} ${i.subtitle}</td><td>${i.qty}</td><td>£${(i.price*i.qty/100).toFixed(2)}</td></tr>`).join('')
  await getResend().emails.send({ from: FROM(), to: order.customer_email, subject: `Your Rio Largo order #${order.id} is confirmed`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px"><div style="background:#4c5a23;padding:24px;text-align:center"><h1 style="color:#fff;margin:0">RIO LARGO</h1></div><div style="padding:24px"><h2 style="color:#4c5a23">Order Confirmed</h2><p>Hi ${order.customer_name}, thank you. We will dispatch within 1-2 working days.</p><table style="width:100%;border-collapse:collapse"><thead><tr style="background:#f5f5f5"><th style="padding:8px;text-align:left">Product</th><th>Qty</th><th>Price</th></tr></thead><tbody>${rows}</tbody><tfoot><tr><td colspan="2" style="text-align:right;font-weight:bold;padding:8px">Total</td><td style="font-weight:bold;color:#4c5a23">£${(order.total/100).toFixed(2)}</td></tr></tfoot></table><div style="background:#f6f7ee;padding:16px;border-radius:6px;margin:16px 0"><strong>Delivering to:</strong><br/><span style="white-space:pre-line">${order.shipping_address}</span></div><p>You will receive a tracking number when dispatched.</p></div></div>` })
}
export async function sendDispatchNotification(order) {
  await getResend().emails.send({ from: FROM(), to: order.customer_email, subject: `Your Rio Largo order has been dispatched`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px"><div style="background:#4c5a23;padding:24px;text-align:center"><h1 style="color:#fff;margin:0">RIO LARGO</h1></div><div style="padding:24px"><h2 style="color:#4c5a23">Your order is on its way</h2><p>Hi ${order.customer_name}, your Rio Largo has been dispatched.${order.tracking_number ? ` Tracking: <strong>${order.tracking_number}</strong>` : ''}</p><p>Enjoy your Rio Largo.</p></div></div>` })
}
export async function sendAdminNewOrder(order) {
  const items = JSON.parse(order.items)
  await getResend().emails.send({ from: FROM(), to: ADMIN(), subject: `New order #${order.id} — £${(order.total/100).toFixed(2)}`,
    html: `<h2>New Order</h2><p><strong>Customer:</strong> ${order.customer_name} (${order.customer_email})</p><p><strong>Items:</strong> ${items.map(i=>`${i.qty}x ${i.name} ${i.subtitle}`).join(', ')}</p><p><strong>Total:</strong> £${(order.total/100).toFixed(2)}</p><p><strong>Address:</strong><br/><span style="white-space:pre-line">${order.shipping_address}</span></p><p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">View in Admin Panel</a></p>` })
}
export async function sendLowStockAlert(items) {
  await getResend().emails.send({ from: FROM(), to: ADMIN(), subject: `Low stock alert — Rio Largo`,
    html: `<h2 style="color:#c0392b">Low Stock Alert</h2><p>${items.map(i=>`${i.product_name}: ${i.stock} remaining`).join('<br/>')}</p><p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">Update Stock</a></p>` })
}
