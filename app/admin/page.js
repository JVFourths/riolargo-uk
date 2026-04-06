'use client'
import { useState, useEffect, useCallback } from 'react'

const STATUS_COLOURS = {
  paid:       'bg-blue-100 text-blue-800',
  dispatched: 'bg-green-100 text-green-800',
  pending:    'bg-yellow-100 text-yellow-800',
  refunded:   'bg-red-100 text-red-800',
}

export default function AdminPage() {
  const [authed,    setAuthed]    = useState(false)
  const [password,  setPassword]  = useState('')
  const [authErr,   setAuthErr]   = useState('')
  const [tab,       setTab]       = useState('orders')
  const [orders,    setOrders]    = useState([])
  const [inventory, setInventory] = useState([])
  const [loading,   setLoading]   = useState(false)
  const [expanded,  setExpanded]  = useState(null)
  const [tracking,  setTracking]  = useState({})
  const [newStock,  setNewStock]  = useState({})
  const [saving,    setSaving]    = useState({})
  const [toast,     setToast]     = useState('')

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function login(e) {
    e.preventDefault()
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) { setAuthed(true); loadAll() }
    else setAuthErr('Incorrect password')
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuthed(false)
  }

  const loadOrders = useCallback(async () => {
    const res  = await fetch('/api/admin/orders')
    if (res.ok) { const d = await res.json(); setOrders(d.orders) }
  }, [])

  const loadInventory = useCallback(async () => {
    const res = await fetch('/api/admin/inventory')
    if (res.ok) { const d = await res.json(); setInventory(d.inventory) }
  }, [])

  function loadAll() { loadOrders(); loadInventory() }

  useEffect(() => {
    // Check if already authed
    fetch('/api/admin/orders').then(r => {
      if (r.ok) { setAuthed(true); loadAll() }
    })
  }, [])

  async function markDispatched(order) {
    const t = tracking[order.id] || ''
    if (!t.trim()) { alert('Please enter a tracking number first'); return }
    setSaving(s => ({ ...s, [order.id]: true }))
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: order.id, status: 'dispatched', tracking: t }),
    })
    await loadOrders()
    setSaving(s => ({ ...s, [order.id]: false }))
    showToast('Marked as dispatched — dispatch email sent to customer')
  }

  async function updateStock(productId) {
    const qty = newStock[productId]
    if (qty === undefined || qty === '') return
    setSaving(s => ({ ...s, [productId]: true }))
    await fetch('/api/admin/inventory', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, stock: qty }),
    })
    await loadInventory()
    setSaving(s => ({ ...s, [productId]: false }))
    setNewStock(s => ({ ...s, [productId]: '' }))
    showToast('Stock updated')
  }

  const pending    = orders.filter(o => o.status === 'paid')
  const dispatched = orders.filter(o => o.status === 'dispatched')
  const revenue    = orders.filter(o => ['paid','dispatched'].includes(o.status))
                           .reduce((sum, o) => sum + o.total, 0)

  // ── Login screen ─────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-olive-700 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">RL</div>
            <h1 className="text-2xl font-bold text-olive-900">Rio Largo Admin</h1>
            <p className="text-olive-500 text-sm mt-1">Enter your password to continue</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-olive-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-olive-400"
            />
            {authErr && <p className="text-red-500 text-sm">{authErr}</p>}
            <button type="submit" className="w-full bg-olive-700 text-white font-semibold py-3 rounded-lg hover:bg-olive-800 transition-colors">
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 text-sm font-medium">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-olive-800 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-olive-900 font-bold text-sm">RL</div>
          <span className="font-semibold">Rio Largo Admin</span>
        </div>
        <button onClick={logout} className="text-olive-300 hover:text-white text-sm transition-colors">Sign Out</button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orders.length, icon: '📦' },
            { label: 'To Dispatch', value: pending.length, icon: '🕐', alert: pending.length > 0 },
            { label: 'Dispatched', value: dispatched.length, icon: '✅' },
            { label: 'Total Revenue', value: `£${(revenue / 100).toFixed(2)}`, icon: '💷' },
          ].map(s => (
            <div key={s.label} className={`bg-white rounded-xl p-5 shadow-sm border ${s.alert ? 'border-orange-300' : 'border-gray-100'}`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-2xl font-bold ${s.alert ? 'text-orange-600' : 'text-gray-900'}`}>{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Low stock warning */}
        {inventory.some(i => i.stock <= i.low_stock_threshold) && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <div className="font-semibold text-orange-800">Low Stock Warning</div>
              <div className="text-orange-700 text-sm mt-1">
                {inventory.filter(i => i.stock <= i.low_stock_threshold).map(i => `${i.product_name}: ${i.stock} left`).join(' · ')}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['orders', 'stock'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                tab === t ? 'border-olive-700 text-olive-700' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t === 'orders' ? `Orders (${orders.length})` : 'Stock Management'}
            </button>
          ))}
        </div>

        {/* Orders tab */}
        {tab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📭</div>
                <p>No orders yet. When someone buys, it will appear here.</p>
              </div>
            )}
            {orders.map(order => {
              const items = JSON.parse(order.items || '[]')
              const isOpen = expanded === order.id
              return (
                <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Order header */}
                  <div
                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpanded(isOpen ? null : order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-semibold text-gray-900">Order #{order.id}</div>
                        <div className="text-gray-500 text-sm">{order.customer_name} · {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">£{(order.total / 100).toFixed(2)}</span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_COLOURS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                        {order.status}
                      </span>
                      <span className="text-gray-400 text-sm">{isOpen ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                      {/* Items */}
                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Items Ordered</div>
                        {items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                            <span className="text-gray-700">{item.qty}x {item.name} {item.subtitle}</span>
                            <span className="text-gray-900 font-medium">£{(item.price * item.qty / 100).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-sm py-2 text-gray-500">
                          <span>Shipping</span>
                          <span>{order.shipping === 0 ? 'FREE' : `£${(order.shipping / 100).toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2">
                          <span>Total</span>
                          <span>£{(order.total / 100).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Ship To</div>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-line">{order.shipping_address}</div>
                      </div>

                      {/* Customer */}
                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Customer Email</div>
                        <a href={`mailto:${order.customer_email}`} className="text-olive-700 text-sm hover:underline">{order.customer_email}</a>
                      </div>

                      {/* Dispatch action */}
                      {order.status === 'paid' && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="font-semibold text-blue-900 mb-3">Mark as Dispatched</div>
                          <div className="flex gap-3">
                            <input
                              type="text"
                              placeholder="Royal Mail tracking number"
                              value={tracking[order.id] || ''}
                              onChange={e => setTracking(t => ({ ...t, [order.id]: e.target.value }))}
                              className="flex-1 border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                              onClick={() => markDispatched(order)}
                              disabled={saving[order.id]}
                              className="bg-olive-700 text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-olive-800 disabled:opacity-50 transition-colors whitespace-nowrap"
                            >
                              {saving[order.id] ? 'Saving...' : 'Confirm Dispatch'}
                            </button>
                          </div>
                          <p className="text-blue-600 text-xs mt-2">This will automatically send a dispatch email with tracking to the customer.</p>
                        </div>
                      )}

                      {order.status === 'dispatched' && order.tracking_number && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                          <span className="text-green-700 font-medium">Tracking: </span>
                          <span className="text-green-800">{order.tracking_number}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Stock tab */}
        {tab === 'stock' && (
          <div className="space-y-4">
            <p className="text-gray-500 text-sm mb-4">Update stock levels here when a new shipment arrives from South Africa. Stock is deducted automatically when orders are placed.</p>
            {inventory.map(item => {
              const low = item.stock <= item.low_stock_threshold
              return (
                <div key={item.product_id} className={`bg-white rounded-xl p-5 border shadow-sm ${low ? 'border-orange-300' : 'border-gray-100'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-gray-900">{item.product_name}</div>
                      {low && <div className="text-orange-600 text-xs mt-0.5 font-medium">⚠️ Running low — order more stock soon</div>}
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${low ? 'text-orange-600' : 'text-gray-900'}`}>{item.stock}</div>
                      <div className="text-gray-400 text-xs">units in stock</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min="0"
                      placeholder="New stock level"
                      value={newStock[item.product_id] || ''}
                      onChange={e => setNewStock(s => ({ ...s, [item.product_id]: e.target.value }))}
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
                    />
                    <button
                      onClick={() => updateStock(item.product_id)}
                      disabled={saving[item.product_id] || !newStock[item.product_id]}
                      className="bg-olive-700 text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-olive-800 disabled:opacity-40 transition-colors"
                    >
                      {saving[item.product_id] ? 'Saving...' : 'Update'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
