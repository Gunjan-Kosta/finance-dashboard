import React from 'react';
import { useStore } from '../store/useStore';
import { Search, Filter, Trash2, Edit3, MoreVertical, Download, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Salary', 'Freelance', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Rent', 'Utilities'];

const TransactionTable = () => {
  const { getFilteredTransactions, deleteTransaction, role, filters, setFilters } = useStore();
  const transactions = getFilteredTransactions();

  const handleSearch = (e) => setFilters({ search: e.target.value });
  const handleCategory = (e) => setFilters({ category: e.target.value });
  const handleType = (type) => setFilters({ type });

  const exportData = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(transactions)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'transactions.json';
    link.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Filtering Header */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search by note or category..." 
            value={filters.search}
            onChange={handleSearch}
            className="input-field" 
            style={{ paddingLeft: '2.75rem' }} 
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select value={filters.category} onChange={handleCategory} className="input-field" style={{ minWidth: '150px' }}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="glass-pill" style={{ display: 'flex', padding: '0.25rem' }}>
             {['All', 'income', 'expense'].map((t) => (
               <button 
                 key={t}
                 onClick={() => handleType(t)}
                 className={`btn ${filters.type === t ? 'btn-primary' : ''}`}
                 style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', borderRadius: '999px', background: filters.type === t ? '' : 'transparent' }}
               >
                 {t.slice(0, 1).toUpperCase() + t.slice(1)}
               </button>
             ))}
          </div>

          <button onClick={exportData} className="btn btn-secondary btn-icon" title="Export as JSON">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>History</h3>
        
        {transactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
             <Inbox size={48} strokeWidth={1.5} style={{ marginBottom: '1.25rem' }} />
             <p style={{ fontSize: '1rem' }}>No transactions found matching your filters.</p>
          </div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>CATEGORY</th>
                <th>NOTE</th>
                <th>TYPE</th>
                <th style={{ textAlign: 'right' }}>AMOUNT</th>
                {role === 'admin' && <th style={{ textAlign: 'right' }}>ACTIONS</th>}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {transactions.map((tx) => (
                  <motion.tr 
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                  >
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{tx.date}</td>
                    <td>
                      <span className="glass-pill" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {tx.category}
                      </span>
                    </td>
                    <td>{tx.note}</td>
                    <td>
                      <span className={`badge ${tx.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '700', fontSize: '1.125rem' }}>
                      <span style={{ color: tx.type === 'income' ? 'var(--income)' : 'var(--expense)' }}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                           <button onClick={() => deleteTransaction(tx.id)} className="btn btn-secondary btn-icon" style={{ borderColor: 'transparent', color: 'var(--expense)' }}>
                             <Trash2 size={16} />
                           </button>
                           <button className="btn btn-secondary btn-icon" style={{ borderColor: 'transparent' }}>
                             <MoreVertical size={16} />
                           </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}

        {/* Pagination placeholder */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', alignItems: 'center', color: 'var(--text-muted)' }}>
          <span style={{ fontSize: '0.875rem' }}>Showing 1 - {transactions.length} of {transactions.length}</span>
          <button className="btn btn-secondary btn-icon" disabled><ChevronLeft size={16} /></button>
          <button className="btn btn-secondary btn-icon" disabled><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
