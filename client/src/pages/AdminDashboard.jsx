import React, { useState, useEffect } from 'react';
import {
  Lock,
  DollarSign,
  Ticket,
  Users,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Download,
  ArrowLeft,
  RefreshCw,
  LogOut,
  ShieldCheck,
  TrendingUp,
  BarChart3
} from 'lucide-react';

export default function AdminDashboard({ onBackToHome }) {
  const [token, setToken] = useState(sessionStorage.getItem('aftrhrs_admin_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'tickets', 'payments'
  const [isLoadingData, setIsLoadingData] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      setToken(data.token);
      sessionStorage.setItem('aftrhrs_admin_token', data.token);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('aftrhrs_admin_token');
  };

  const fetchDashboardData = async () => {
    if (!token) return;
    setIsLoadingData(true);

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, ordersRes, ticketsRes, paymentsRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/orders', { headers }),
        fetch('/api/admin/tickets', { headers }),
        fetch('/api/admin/payments', { headers })
      ]);

      if (statsRes.status === 401) {
        handleLogout();
        return;
      }

      const statsData = await statsRes.json();
      const ordersData = await ordersRes.json();
      const ticketsData = await ticketsRes.json();
      const paymentsData = await paymentsRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (ordersData.success) setOrders(ordersData.orders);
      if (ticketsData.success) setTickets(ticketsData.tickets);
      if (paymentsData.success) setPayments(paymentsData.payments);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const handleExportCSV = () => {
    window.open('/api/admin/export?token=' + encodeURIComponent(token), '_blank');
  };

  // Filtered lists
  const filteredOrders = orders.filter((o) => {
    const q = searchTerm.toLowerCase();
    return (
      o.order_id.toLowerCase().includes(q) ||
      o.full_name.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.mobile.toLowerCase().includes(q)
    );
  });

  const filteredTickets = tickets.filter((t) => {
    const q = searchTerm.toLowerCase();
    return (
      t.ticket_id.toLowerCase().includes(q) ||
      t.customer_name.toLowerCase().includes(q) ||
      t.qr_identifier.toLowerCase().includes(q)
    );
  });

  // Login Gate
  if (!token) {
    return (
      <div className="min-h-screen bg-[#060608] flex items-center justify-center p-4">
        <div className="cyber-card w-full max-w-md rounded-3xl p-8 border border-purple-500/40 bg-[#0c0c14] shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center mx-auto mb-3 text-purple-300">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-black text-2xl text-white uppercase tracking-wider">
              NEXORA ADMIN PORTAL
            </h2>
            <p className="text-xs text-purple-300 mt-1 uppercase tracking-widest">
              AFTRHRS // AUTHORIZED ACCESS ONLY
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn-primary w-full py-3.5 rounded-xl font-heading text-xs font-black uppercase tracking-wider mt-2 cursor-pointer"
            >
              {isLoggingIn ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button
              onClick={onBackToHome}
              className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Event Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060608] text-gray-100 flex flex-col p-4 sm:p-6 lg:p-8">
      {/* Top Navbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-purple-400"
            title="Return to Website"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-purple-400 font-extrabold uppercase block">
              NEXORA PRODUCTIONS
            </span>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight -mt-1">
              AFTRHRS ADMIN CONSOLE
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={isLoadingData}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Metric Cards (Instruction 26: TOTAL SALES, TICKETS SOLD, TOTAL REVENUE, SUCCESSFUL, PENDING, FAILED, CHECK-INS) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          <div className="cyber-card p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">TOTAL REVENUE</span>
            <div className="font-heading text-xl sm:text-2xl font-black text-purple-300 mt-1">
              ₹{(stats?.revenue || 0).toLocaleString('en-IN')}
            </div>
            <span className="text-[9px] text-gray-500">Verified Paid</span>
          </div>

          <div className="cyber-card p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">TICKETS SOLD</span>
            <div className="font-heading text-xl sm:text-2xl font-black text-white mt-1">
              {stats?.ticketsSold || 0}
            </div>
            <span className="text-[9px] text-gray-500">Pass holders</span>
          </div>

          <div className="cyber-card p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">ORDERS</span>
            <div className="font-heading text-xl sm:text-2xl font-black text-white mt-1">
              {stats?.totalOrders || 0}
            </div>
            <span className="text-[9px] text-gray-500">Total placed</span>
          </div>

          <div className="cyber-card p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">SUCCESSFUL</span>
            <div className="font-heading text-xl sm:text-2xl font-black text-emerald-300 mt-1">
              {orders.filter(o => o.payment_status === 'PAID').length}
            </div>
            <span className="text-[9px] text-emerald-500">Captured</span>
          </div>

          <div className="cyber-card p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">PENDING</span>
            <div className="font-heading text-xl sm:text-2xl font-black text-amber-300 mt-1">
              {orders.filter(o => o.payment_status === 'PENDING').length}
            </div>
            <span className="text-[9px] text-amber-500">Awaiting pay</span>
          </div>

          <div className="cyber-card p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">FAILED</span>
            <div className="font-heading text-xl sm:text-2xl font-black text-rose-300 mt-1">
              {orders.filter(o => o.payment_status === 'FAILED').length}
            </div>
            <span className="text-[9px] text-rose-500">Declined/Void</span>
          </div>

          <div className="cyber-card p-4 rounded-2xl border border-white/10 bg-purple-950/20">
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">CHECK-INS</span>
            <div className="font-heading text-xl sm:text-2xl font-black text-cyan-200 mt-1">
              {stats?.checkins || 0}
            </div>
            <span className="text-[9px] text-cyan-400">Gate Scanned</span>
          </div>
        </div>

        {/* Tier Sales Progress Analytics */}
        {stats?.tierBreakdown && stats.tierBreakdown.length > 0 && (
          <div className="cyber-card p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
                PASS TIER BREAKDOWN
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {stats.tierBreakdown.map((tb) => (
                <div key={tb.ticket_type} className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-bold text-purple-300 uppercase block">{tb.ticket_type}</span>
                  <div className="flex justify-between items-baseline mt-1">
                    <span className="text-lg font-black font-heading text-white">₹{tb.revenue?.toLocaleString('en-IN') || 0}</span>
                    <span className="text-xs text-gray-400">{tb.tickets_count} tickets</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'orders' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'tickets' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Digital Tickets ({tickets.length})
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'payments' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Gateway Payments ({payments.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customer, order, ticket..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Tab 1: Orders Table */}
        {activeTab === 'orders' && (
          <div className="cyber-card rounded-2xl border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-[10px] uppercase font-bold text-gray-400 border-b border-white/10">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Attendee Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Pass Type</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Total (₹)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500">
                      No orders found matching search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => (
                    <tr key={o.order_id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono font-bold text-purple-300">{o.order_id}</td>
                      <td className="p-4 font-bold text-white">{o.full_name}</td>
                      <td className="p-4 font-mono text-gray-400">
                        {o.mobile}<br />{o.email}
                      </td>
                      <td className="p-4 uppercase font-bold text-white">{o.ticket_type}</td>
                      <td className="p-4">{o.quantity}</td>
                      <td className="p-4 font-black text-white">₹{o.total?.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            o.payment_status === 'PAID'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                              : o.payment_status === 'PENDING'
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                              : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          {o.payment_status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{o.created_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Tickets Table */}
        {activeTab === 'tickets' && (
          <div className="cyber-card rounded-2xl border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-[10px] uppercase font-bold text-gray-400 border-b border-white/10">
                <tr>
                  <th className="p-4">Ticket ID</th>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Pass Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">QR Token</th>
                  <th className="p-4">Check-in Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      No tickets generated yet.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((t) => (
                    <tr key={t.ticket_id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono font-bold text-purple-300">{t.ticket_id}</td>
                      <td className="p-4 font-mono text-gray-400">{t.order_id}</td>
                      <td className="p-4 font-bold text-white">{t.customer_name}</td>
                      <td className="p-4 uppercase font-semibold">{t.ticket_type}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            t.status === 'CHECKED_IN'
                              ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                              : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[10px] text-gray-400 max-w-xs truncate">
                        {t.qr_identifier}
                      </td>
                      <td className="p-4 text-gray-400">
                        {t.check_in_time || 'NOT CHECKED IN'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Payments Gateway Logs */}
        {activeTab === 'payments' && (
          <div className="cyber-card rounded-2xl border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-[10px] uppercase font-bold text-gray-400 border-b border-white/10">
                <tr>
                  <th className="p-4">Payment Record ID</th>
                  <th className="p-4">Razorpay Payment ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Gateway Status</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No payment gateway records found.
                    </td>
                  </tr>
                ) : (
                  payments.map((p) => (
                    <tr key={p.payment_id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-purple-300">{p.payment_id}</td>
                      <td className="p-4 font-mono font-bold text-white">{p.gateway_payment_id || 'N/A'}</td>
                      <td className="p-4 text-white font-bold">{p.full_name}</td>
                      <td className="p-4 font-black text-white">₹{p.amount?.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{p.created_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
