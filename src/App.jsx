import React, { useState, useEffect } from 'react';
import { LayoutGrid, TrendingUp, ListTodo, PieChart, Shield, PlusCircle, LogOut, ChevronRight, Menu, X, Wallet, ArrowUpCircle, ArrowDownCircle, Search, Filter, Brain } from 'lucide-react';
import { useStore } from './store/useStore';
import SummaryStats from './components/SummaryStats';
import FinanceCharts from './components/FinanceCharts';
import TransactionTable from './components/TransactionTable';
import TransactionModal from './components/TransactionModal';
import InsightsPage from './components/InsightsPage';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'transactions', label: 'Transactions', icon: ListTodo },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
  { id: 'insights', label: 'Insights', icon: Brain },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role, setRole, fetchTransactions } = useStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const toggleRole = () => {
    setRole(role === 'admin' ? 'viewer' : 'admin');
  };

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      {/* Sidebar */}
      <aside className={`sidebar-container glass-card ${!isSidebarOpen ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`} 
        style={{
          width: isSidebarOpen ? '240px' : '80px',
          height: 'calc(100vh - 2rem)',
          margin: '1rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          padding: '1.25rem',
          zIndex: 100,
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div className="logo-box btn-primary" style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'grid', placeItems: 'center' }}>
            <Wallet size={20} />
          </div>
          {isSidebarOpen && <h2 style={{ fontSize: '1.125rem' }} className="text-gradient">Finance Dashboard</h2>}
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`btn btn-secondary ${activeTab === item.id ? 'active' : ''}`}
              style={{
                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                padding: '0.875rem',
                border: activeTab === item.id ? '1px solid var(--primary)' : '1px solid transparent',
                background: activeTab === item.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                color: activeTab === item.id ? 'var(--primary)' : 'var(--text-secondary)'
              }}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem' }}>
             <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(45deg, #6366f1, #a855f7)', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>
               {role === 'admin' ? 'AD' : 'VW'}
             </div>
             {isSidebarOpen && (
               <div style={{ overflow: 'hidden' }}>
                 <p style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'capitalize' }}>{role}</p>
                 <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Account: 1234****</p>
               </div>
             )}
          </div>
          <button className="btn btn-secondary" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center' }}>
            <LogOut size={18} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ 
        marginLeft: isSidebarOpen ? '270px' : '120px', 
        flex: 1, 
        padding: '1.5rem 2rem',
        transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <header className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '0.125rem' }}>Welcome Back!</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Track your financial progress and insights.</p>
            </div>
          </div>

          <div className="header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Role Toggle */}
            <div className="glass-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.375rem 0.5rem' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '8px', background: role === 'admin' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                display: 'grid', placeItems: 'center', color: role === 'admin' ? 'var(--primary)' : 'var(--expense)'
               }}>
                <Shield size={18} />
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Role: <span style={{ color: 'var(--text-primary)' }}>{role.toUpperCase()}</span></span>
              <button onClick={toggleRole} className="btn-primary" style={{ padding: '0.375rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem' }}>Switch</button>
            </div>

            {role === 'admin' && (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary"
              >
                <PlusCircle size={20} />
                <span>New Transaction</span>
              </motion.button>
            )}
          </div>
        </header>

        {/* Dashboard Grid */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               key="dashboard"
            >
              <SummaryStats />
              <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                     <h3 style={{ fontSize: '1.125rem' }}>Core Financial Insights</h3>
                     <TrendingUp size={18} className="income-text" />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '1rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--income)', marginBottom: '0.375rem' }}>Monthly Performance</p>
                        <p style={{ opacity: 0.8, fontSize: '0.8125rem', lineHeight: '1.5' }}>Your income grew by **12%** this month. Most of this growth came from your new **Freelance** project.</p>
                      </div>
                      <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '1rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '0.375rem' }}>Expense Alert</p>
                        <p style={{ opacity: 0.8, fontSize: '0.8125rem', lineHeight: '1.5' }}>You've reached **85%** of your Food budget for April. Consider reducing dining out for the remaining 10 days.</p>
                      </div>
                   </div>
                </div>
                
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.125rem' }}>Quick Actions</h3>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                     <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.625rem 1rem', fontSize: '0.875rem' }}>🔔 Create a Budget Alert</button>
                     <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.625rem 1rem', fontSize: '0.875rem' }}>💳 Link New Card</button>
                     <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.625rem 1rem', fontSize: '0.875rem' }}>📄 Generate Monthly Report</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'transactions' && (
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               key="transactions"
            >
               <TransactionTable />
            </motion.div>
          )}
          {activeTab === 'analytics' && (
            <motion.div
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               key="analytics"
            >
               <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                  <FinanceCharts />
               </div>
            </motion.div>
          )}
          {activeTab === 'insights' && (
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -15 }}
               key="insights"
            >
               <InsightsPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        .active {
          color: var(--primary) !important;
          border-color: var(--primary) !important;
          background: rgba(99, 102, 241, 0.1) !important;
        }
        .income-text { color: var(--income); }
        .expense-text { color: var(--expense); }
      `}</style>
    </div>
  );
}

export default App;
