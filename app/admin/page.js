'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  LogOut, Search, Download, Package, Truck, PoundSterling, Clock,
  AlertTriangle, ChevronDown, ChevronUp, Mail, MapPin, Save, X, Check,
} from 'lucide-react'

const STATUS_STYLE = {
  paid:       { dot: 'bg-fynbos-500',  text: 'text-fynbos-700',  label: 'Paid'       },
  dispatched: { dot: 'bg-sage-600',    text: 'text-sage-700',    label: 'Dispatched' },
  refunded:   { dot: 'bg-clay-500',    text: 'text-clay-600',    label: 'Refunded'   },
  pending:    { dot: 'bg-mountain-900/40', text: 'text-mountain-900/60', label: 'Pending' },
}

function gbp(pence) {
  return `£${(pence / 100).toFixed(2)}`
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function ordersToCsv(orders) {
  const headers = [
    'order_id', 'created_at', 'customer_name', 'customer_email', 'status',
    'subtotal_gbp', 'shipping_gbp', 'total_gbp', 'tracking_number', 'shipping_address', 'notes',
  ]
  const escape = (v) => {
    if (v == null) return ''
    const s = String(v).replace(/\r?\n/g, ' ').replace(/"/g, '""')
    return /[",]/.test(s) ? `"${s}"` : s
  }
  const rows = orders.map((o) => [
    o.id,
    o.created_at,
    o.customer_name,
    o.customer_email,
    o.status,
    (o.subtotal / 100).toFixed(2),
    (o.shipping / 100).toFixed(2),
    (o.total / 100).toFixed(2),
    o.tracking_number || '',
    o.shipping_address || '',
    o.notes || '',
  ].map(escape).join(','))
  return [headers.join(','), ...rows].join('\n')
}

export default function AdminPage() {
  const [authed, setAuthed]       = useState(false)
  const [bootLoading, setBootLoading] = useState(true)
  const [password, setPassword]   = useState('')
  const [authErr, setAuthErr]     = useState('')

  const [tab, setTab]             = useState('orders')
  const [orders, setOrders]       = useState([])
  const [inventory, setInventory] = useState([])
  const [expanded, setExpanded]   = useState(null)
  const [tracking, setTracking]   = useState({})
  const [notesDraft, setNotesDraft] = useState({})
  const [newStock, setNewStock]   = useState({})
  const [saving, setSaving]       = useState({})
  const [toast, setToast]         = useState('')

  const [search, setSearch]         = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const loadOrders = useCallback(async () => {
    const res = await fetch('/api/admin/orders')
    if (res.ok) {
      const d = await res.json()
      setOrders(d.orders)
      // hydrate notes draft
      const drafts = {}
      d.orders.forEach((o) => { drafts[o.id] = o.notes || '' })
      setNotesDraft(drafts)
    }
  }, [])

  const loadInventory = useCallback(async () => {
    const res = await fetch('/api/admin/inventory')
    if (res.ok) {
      const d = await res.json()
      setInventory(d.inventory)
    }
  }, [])

  const loadAll = useCallback(() => {
    loadOrders()
    loadInventory()
  }, [loadOrders, loadInventory])

  useEffect(() => {
    fetch('/api/admin/orders').then((r) => {
      if (r.ok) {
        setAuthed(true)
        loadAll()
      }
      setBootLoading(false)
    })
  }, [loadAll])

  async function login(e) {
    e.preventDefault()
    setAuthErr('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setAuthed(true)
      loadAll()
    } else {
      setAuthErr('Incorrect password.')
    }
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuthed(false)
    setOrders([])
    setInventory([])
  }

  async function markDispatched(order) {
    const t = (tracking[order.id] || '').trim()
    if (!t) {
      showToast('Please add a tracking number first')
      return
    }
    setSaving((s) => ({ ...s, [`disp-${order.id}`]: true }))
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: order.id, status: 'dispatched', tracking: t }),
    })
    await loadOrders()
    setSaving((s) => ({ ...s, [`disp-${order.id}`]: false }))
    showToast('Marked as dispatched · email sent to customer')
  }

  async function saveNotes(orderId) {
    setSaving((s) => ({ ...s, [`notes-${orderId}`]: true }))
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, notes: notesDraft[orderId] || '' }),
    })
    await loadOrders()
    setSaving((s) => ({ ...s, [`notes-${orderId}`]: false }))
    showToast('Notes saved')
  }

  async function updateStock(productId) {
    const qty = newStock[productId]
    if (qty === undefined || qty === '') return
    setSaving((s) => ({ ...s, [`stock-${productId}`]: true }))
    await fetch('/api/admin/inventory', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, stock: parseInt(qty, 10) }),
    })
    await loadInventory()
    setSaving((s) => ({ ...s, [`stock-${productId}`]: false }))
    setNewStock((s) => ({ ...s, [productId]: '' }))
    showToast('Stock updated')
  }

  function downloadCsv() {
    const csv = ordersToCsv(filteredOrders)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `riolargo-orders-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast(`Exported ${filteredOrders.length} order${filteredOrders.length === 1 ? '' : 's'}`)
  }

  // ── Computed ─────────────────────────────────────────────────────
  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase()
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false
      if (!q) return true
      return (
        String(o.id).includes(q) ||
        (o.customer_name || '').toLowerCase().includes(q) ||
        (o.customer_email || '').toLowerCase().includes(q) ||
        (o.tracking_number || '').toLowerCase().includes(q)
      )
    })
  }, [orders, search, statusFilter])

  const stats = useMemo(() => {
    const now = new Date()
    const startOfDay = new Date(now)
    startOfDay.setHours(0, 0, 0, 0)
    const startOfWeek = new Date(startOfDay)
    startOfWeek.setDate(startOfDay.getDate() - ((startOfDay.getDay() + 6) % 7)) // Monday
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const counted = orders.filter((o) => ['paid', 'dispatched'].includes(o.status))
    const sumFrom = (since) =>
      counted
        .filter((o) => new Date(o.created_at) >= since)
        .reduce((sum, o) => sum + o.total, 0)

    return {
      pending:  orders.filter((o) => o.status === 'paid').length,
      total:    orders.length,
      revenue:  counted.reduce((sum, o) => sum + o.total, 0),
      today:    sumFrom(startOfDay),
      week:     sumFrom(startOfWeek),
      month:    sumFrom(startOfMonth),
    }
  }, [orders])

  const lowStock = inventory.filter((i) => i.stock <= i.low_stock_threshold)

  // ── Boot loading ─────────────────────────────────────────────────
  if (bootLoading) {
    return (
      <div className="min-h-screen bg-limestone-50 flex items-center justify-center">
        <p className="text-mountain-900/50 text-sm">Loading…</p>
      </div>
    )
  }

  // ── Login ────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-limestone-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <p className="eyebrow mb-5">Rio Largo &middot; Admin</p>
          <h1 className="font-display text-h1 text-mountain-900 leading-tight mb-10">
            Sign in to manage orders.
          </h1>
          <form onSubmit={login} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-eyebrow uppercase tracking-eyebrow text-sage-600 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-mountain-900/30 rounded-sharp px-4 py-3 text-mountain-900 focus:border-mountain-900 focus:outline-none transition-colors"
                autoFocus
              />
              {authErr && <p className="text-clay-600 text-sm mt-2">{authErr}</p>}
            </div>
            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-limestone-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 bg-mountain-900 text-limestone-50 px-5 py-3 z-50 text-sm flex items-center gap-2 shadow-lg">
          <Check size={16} strokeWidth={1.5} className="text-fynbos-400" />
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-mountain-900 text-limestone-50">
        <div className="container-x flex items-center justify-between h-20">
          <div>
            <p className="eyebrow !text-fynbos-400 mb-1">Admin</p>
            <p className="font-display text-2xl text-limestone-50">Rio Largo</p>
          </div>
          <button
            onClick={logout}
            className="text-limestone-50/70 hover:text-fynbos-400 text-sm flex items-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut size={16} strokeWidth={1.5} />
            Sign out
          </button>
        </div>
      </header>

      <div className="container-x py-12">
        {/* Sales summary */}
        <section className="mb-12">
          <p className="eyebrow mb-5">Sales</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-mountain-900/10 border border-mountain-900/10">
            <StatTile
              label="Today"
              value={gbp(stats.today)}
              icon={PoundSterling}
            />
            <StatTile
              label="This week"
              value={gbp(stats.week)}
              icon={PoundSterling}
            />
            <StatTile
              label="This month"
              value={gbp(stats.month)}
              icon={PoundSterling}
            />
            <StatTile
              label="All time"
              value={gbp(stats.revenue)}
              icon={PoundSterling}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <SecondaryStat label="Total orders"      value={stats.total}    icon={Package} />
            <SecondaryStat label="Awaiting dispatch" value={stats.pending}  icon={Clock}    alert={stats.pending > 0} />
            <SecondaryStat label="Low stock items"   value={lowStock.length} icon={AlertTriangle} alert={lowStock.length > 0} />
          </div>
        </section>

        {/* Low stock alert */}
        {lowStock.length > 0 && (
          <div className="mb-10 border border-clay-500/30 bg-clay-500/5 p-5 flex items-start gap-4">
            <AlertTriangle size={20} strokeWidth={1.5} className="text-clay-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-mountain-900 mb-1">Low stock</p>
              <p className="text-sm text-mountain-900/70">
                {lowStock.map((i) => `${i.product_name}: ${i.stock} left`).join(' · ')}
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-mountain-900/15">
          {[
            { id: 'orders', label: `Orders (${orders.length})` },
            { id: 'stock',  label: 'Stock' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
                tab === t.id
                  ? 'border-mountain-900 text-mountain-900'
                  : 'border-transparent text-mountain-900/50 hover:text-mountain-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ============ ORDERS TAB ============ */}
        {tab === 'orders' && (
          <>
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-mountain-900/50" />
                <input
                  type="search"
                  placeholder="Search by name, email, order # or tracking…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border border-mountain-900/20 rounded-sharp pl-10 pr-4 py-2.5 text-sm text-mountain-900 placeholder-mountain-900/40 focus:border-mountain-900 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-2">
                {[
                  { id: 'all',        label: 'All' },
                  { id: 'paid',       label: 'Awaiting' },
                  { id: 'dispatched', label: 'Dispatched' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilter(f.id)}
                    className={`px-4 py-2 text-sm border transition-colors cursor-pointer ${
                      statusFilter === f.id
                        ? 'border-mountain-900 bg-mountain-900 text-limestone-50'
                        : 'border-mountain-900/20 text-mountain-900/70 hover:border-mountain-900/50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                onClick={downloadCsv}
                disabled={filteredOrders.length === 0}
                className="ml-auto inline-flex items-center gap-2 border border-mountain-900/20 px-4 py-2 text-sm text-mountain-900 hover:border-mountain-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Download size={16} strokeWidth={1.5} />
                Export CSV
              </button>
            </div>

            {/* Order list */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-24 text-mountain-900/50">
                <Package size={32} strokeWidth={1.25} className="mx-auto mb-4 text-mountain-900/30" />
                <p>{orders.length === 0 ? 'No orders yet. They will appear here as soon as customers buy.' : 'No orders match your filter.'}</p>
              </div>
            ) : (
              <div className="border border-mountain-900/10 divide-y divide-mountain-900/10">
                {filteredOrders.map((order) => {
                  const items  = JSON.parse(order.items || '[]')
                  const isOpen = expanded === order.id
                  const style  = STATUS_STYLE[order.status] || STATUS_STYLE.pending
                  return (
                    <div key={order.id} className="bg-limestone-50">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : order.id)}
                        className="w-full flex items-center justify-between px-5 py-4 hover:bg-limestone-100 transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-6 min-w-0">
                          <span className="font-display text-xl text-mountain-900 tabular-nums">
                            #{order.id}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-mountain-900 truncate">{order.customer_name}</p>
                            <p className="text-xs text-mountain-900/50">{formatDate(order.created_at)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 flex-shrink-0">
                          <span className={`text-xs font-medium flex items-center gap-2 ${style.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                            {style.label}
                          </span>
                          <span className="font-medium text-mountain-900 tabular-nums w-20 text-right">{gbp(order.total)}</span>
                          {isOpen
                            ? <ChevronUp size={16} strokeWidth={1.5} className="text-mountain-900/40" />
                            : <ChevronDown size={16} strokeWidth={1.5} className="text-mountain-900/40" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="bg-limestone-100 border-t border-mountain-900/10 px-5 py-8">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Items + summary */}
                            <div>
                              <p className="eyebrow mb-3">Items</p>
                              <ul className="text-sm divide-y divide-mountain-900/10 mb-4">
                                {items.map((item, i) => (
                                  <li key={i} className="flex justify-between py-2">
                                    <span className="text-mountain-900">{item.qty} &times; {item.name} {item.subtitle}</span>
                                    <span className="text-mountain-900 tabular-nums">{gbp(item.price * item.qty)}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="border-t border-mountain-900/15 pt-3 text-sm space-y-1">
                                <div className="flex justify-between text-mountain-900/65">
                                  <span>Shipping</span>
                                  <span className="tabular-nums">{order.shipping === 0 ? 'Free' : gbp(order.shipping)}</span>
                                </div>
                                <div className="flex justify-between text-mountain-900 font-medium pt-1">
                                  <span>Total</span>
                                  <span className="tabular-nums">{gbp(order.total)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Customer + address */}
                            <div className="space-y-6">
                              <div>
                                <p className="eyebrow mb-2 flex items-center gap-2"><Mail size={12} strokeWidth={1.5} /> Customer</p>
                                <a href={`mailto:${order.customer_email}`} className="text-sm text-mountain-900 hover:text-fynbos-700 transition-colors cursor-pointer">
                                  {order.customer_email}
                                </a>
                              </div>
                              <div>
                                <p className="eyebrow mb-2 flex items-center gap-2"><MapPin size={12} strokeWidth={1.5} /> Ship to</p>
                                <p className="text-sm text-mountain-900 whitespace-pre-line leading-relaxed">{order.shipping_address}</p>
                              </div>
                            </div>
                          </div>

                          {/* Dispatch action */}
                          {order.status === 'paid' && (
                            <div className="mt-8 pt-8 border-t border-mountain-900/10">
                              <p className="eyebrow mb-3">Dispatch this order</p>
                              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                                <input
                                  type="text"
                                  placeholder="Royal Mail tracking number"
                                  value={tracking[order.id] || ''}
                                  onChange={(e) => setTracking((t) => ({ ...t, [order.id]: e.target.value }))}
                                  className="flex-1 bg-transparent border border-mountain-900/25 rounded-sharp px-4 py-2.5 text-sm text-mountain-900 focus:border-mountain-900 focus:outline-none transition-colors"
                                />
                                <button
                                  onClick={() => markDispatched(order)}
                                  disabled={saving[`disp-${order.id}`]}
                                  className="btn-primary !py-2.5 !px-6 text-sm"
                                >
                                  <Truck size={16} strokeWidth={1.5} className="mr-2" />
                                  {saving[`disp-${order.id}`] ? 'Saving…' : 'Confirm dispatch'}
                                </button>
                              </div>
                              <p className="text-xs text-mountain-900/55 mt-2">A dispatch email with the tracking number is sent to the customer automatically.</p>
                            </div>
                          )}

                          {order.status === 'dispatched' && order.tracking_number && (
                            <div className="mt-8 pt-8 border-t border-mountain-900/10">
                              <p className="eyebrow mb-2">Tracking</p>
                              <p className="text-sm text-mountain-900 font-medium">{order.tracking_number}</p>
                            </div>
                          )}

                          {/* Notes */}
                          <div className="mt-8 pt-8 border-t border-mountain-900/10">
                            <p className="eyebrow mb-3">Internal notes</p>
                            <textarea
                              value={notesDraft[order.id] ?? ''}
                              onChange={(e) => setNotesDraft((d) => ({ ...d, [order.id]: e.target.value }))}
                              placeholder="Add notes for this order — gift message, repacking, refund reasons, etc."
                              rows={3}
                              className="w-full bg-transparent border border-mountain-900/25 rounded-sharp px-4 py-3 text-sm text-mountain-900 focus:border-mountain-900 focus:outline-none transition-colors resize-none"
                            />
                            <button
                              onClick={() => saveNotes(order.id)}
                              disabled={saving[`notes-${order.id}`] || (notesDraft[order.id] || '') === (order.notes || '')}
                              className="mt-3 inline-flex items-center gap-2 text-sm border border-mountain-900/25 px-4 py-2 hover:border-mountain-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                              <Save size={14} strokeWidth={1.5} />
                              {saving[`notes-${order.id}`] ? 'Saving…' : 'Save notes'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* ============ STOCK TAB ============ */}
        {tab === 'stock' && (
          <div>
            <p className="text-mountain-900/65 text-sm mb-8 max-w-prose">
              Update stock levels here when a new shipment arrives from South Africa. Stock is
              deducted automatically when orders are placed. You&rsquo;ll get an automatic email
              when any product drops below its low-stock threshold.
            </p>
            <div className="border border-mountain-900/10 divide-y divide-mountain-900/10">
              {inventory.map((item) => {
                const low = item.stock <= item.low_stock_threshold
                return (
                  <div key={item.product_id} className="bg-limestone-50 px-5 py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5">
                      <p className="font-medium text-mountain-900">{item.product_name}</p>
                      {low && (
                        <p className="text-clay-600 text-xs mt-1 flex items-center gap-1.5">
                          <AlertTriangle size={12} strokeWidth={1.5} />
                          Low &mdash; reorder soon (threshold {item.low_stock_threshold})
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-3">
                      <p className="eyebrow mb-1">In stock</p>
                      <p className={`font-display text-3xl tabular-nums ${low ? 'text-clay-600' : 'text-mountain-900'}`}>
                        {item.stock}
                      </p>
                    </div>
                    <div className="md:col-span-4 flex gap-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="New level"
                        value={newStock[item.product_id] || ''}
                        onChange={(e) => setNewStock((s) => ({ ...s, [item.product_id]: e.target.value }))}
                        className="flex-1 min-w-0 bg-transparent border border-mountain-900/25 rounded-sharp px-3 py-2 text-sm text-mountain-900 focus:border-mountain-900 focus:outline-none transition-colors"
                      />
                      <button
                        onClick={() => updateStock(item.product_id)}
                        disabled={saving[`stock-${item.product_id}`] || !newStock[item.product_id]}
                        className="btn-primary !py-2 !px-4 text-sm"
                      >
                        {saving[`stock-${item.product_id}`] ? '…' : 'Update'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatTile({ label, value, icon: Icon }) {
  return (
    <div className="bg-limestone-50 p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="eyebrow">{label}</p>
        <Icon size={16} strokeWidth={1.5} className="text-fynbos-600" />
      </div>
      <p className="font-display text-3xl text-mountain-900 tabular-nums">{value}</p>
    </div>
  )
}

function SecondaryStat({ label, value, icon: Icon, alert }) {
  return (
    <div className={`flex items-center gap-4 border-l-2 pl-5 py-2 ${alert ? 'border-clay-500' : 'border-mountain-900/20'}`}>
      <Icon size={20} strokeWidth={1.5} className={alert ? 'text-clay-600' : 'text-mountain-900/50'} />
      <div>
        <p className="text-eyebrow uppercase tracking-eyebrow text-mountain-900/55">{label}</p>
        <p className={`font-display text-2xl tabular-nums ${alert ? 'text-clay-600' : 'text-mountain-900'}`}>{value}</p>
      </div>
    </div>
  )
}
