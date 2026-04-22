import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

const categories = ['Salary', 'Freelance', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Rent', 'Utilities'];

const TransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction } = useStore();
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Salary',
    type: 'income',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.note) return;
    
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    
    setFormData({ amount: '', category: 'Salary', type: 'income', date: new Date().toISOString().split('T')[0], note: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card" 
            style={{ width: '100%', maxWidth: '500px', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Add Transaction</h2>
              <button onClick={onClose} className="btn-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
               {/* Type Toggle */}
               <div className="form-group">
                 <label className="form-label">Transaction Type</label>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <button 
                      type="button" 
                      onClick={() => setFormData({ ...formData, type: 'income' })}
                      className={`btn ${formData.type === 'income' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ border: formData.type === 'income' ? 'none' : '1px solid var(--border)' }}
                    >
                      <ArrowUpCircle size={18} /> Income
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'expense' })}
                      className={`btn ${formData.type === 'expense' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ background: formData.type === 'expense' ? 'var(--expense)' : '', border: formData.type === 'expense' ? 'none' : '1px solid var(--border)' }}
                    >
                      <ArrowDownCircle size={18} /> Expense
                    </button>
                 </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div className="form-group">
                   <label className="form-label">Amount ($)</label>
                   <input 
                     type="number" 
                     className="input-field" 
                     placeholder="0.00" 
                     value={formData.amount}
                     onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                     required
                   />
                 </div>
                 <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      className="input-field" 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                 </div>
               </div>

               <div className="form-group">
                 <label className="form-label">Date</label>
                 <input 
                   type="date" 
                   className="input-field" 
                   value={formData.date}
                   onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                 />
               </div>

               <div className="form-group">
                 <label className="form-label">Description / Note</label>
                 <input 
                   type="text" 
                   className="input-field" 
                   placeholder="e.g. Monthly Rent, Coffee, etc." 
                   value={formData.note}
                   onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                   required
                 />
               </div>

               <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                    <Save size={20} /> Save Transaction
                  </button>
               </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;
