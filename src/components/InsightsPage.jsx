import React from 'react';
import { useStore } from '../store/useStore';
import { TrendingUp, TrendingDown, Target, Brain, PieChart, Wallet, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const InsightsPage = () => {
  const { transactions, getStats } = useStore();
  const { totalIncome, totalExpense, totalBalance } = getStats();

  // 1. Highest Spending Category
  const spendingByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const sortedCategories = Object.entries(spendingByCategory)
    .sort(([, a], [, b]) => b - a);
  
  const highestCategory = sortedCategories[0] || ["None", 0];
  const top3Expenses = sortedCategories.slice(0, 3);

  // 2. Savings Rate
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0;

  // 3. Average Transaction
  const avgExpense = transactions.filter(t => t.type === 'expense').length > 0 
    ? (totalExpense / transactions.filter(t => t.type === 'expense').length).toFixed(2) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      {/* Top Insights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Highest Spending Card */}
        <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--expense)', display: 'grid', placeItems: 'center' }}>
              <TrendingDown size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Highest Spending</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginBottom: '0.5rem' }}>Your biggest expense category is:</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>{highestCategory[0]}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--expense)', fontWeight: '600' }}>${highestCategory[1].toFixed(2)}</span>
          </div>
        </div>

        {/* Savings Rate Card */}
        <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--income)', display: 'grid', placeItems: 'center' }}>
              <Target size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Savings Rate</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginBottom: '0.5rem' }}>You're currently saving:</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--income)' }}>{savingsRate}%</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>of total income</span>
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}>
              <Wallet size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Monthly Overview</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Total Income</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--income)' }}>+${totalIncome.toFixed(2)}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Total Expenses</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--expense)' }}>-${totalExpense.toFixed(2)}</span>
             </div>
             <div style={{ height: '1px', background: 'var(--border)', margin: '0.25rem 0' }}></div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: '600' }}>Net Balance</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '700' }}>${totalBalance.toFixed(2)}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Observation Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
         <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Brain size={20} className="text-gradient" />
              <h3 style={{ fontSize: '1.125rem' }}>Spending Observations</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--primary)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>Diverse Revenue Streams</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>You have multiple income sources (Salary, Freelance). This provides excellent financial stability.</p>
               </div>
               <div style={{ paddingLeft: '1rem', borderLeft: highestCategory[0] === 'Food' ? '3px solid var(--expense)' : '3px solid var(--accent)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>Category Focus: {top3Expenses[0]?.[0] || 'N/A'}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Your top 3 spending categories make up a significant portion of your expenses. Reviewing these could unlock major savings.</p>
               </div>
               <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--income)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>Average Expense Ticket: ${avgExpense}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>On average, each expense transaction is around ${avgExpense}. This is a healthy baseline for your lifestyle.</p>
               </div>
            </div>
         </div>

         <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Top Expense Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {top3Expenses.map(([cat, amt]) => {
                  const percentage = ((amt / totalExpense) * 100).toFixed(0);
                  return (
                    <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                          <span style={{ fontWeight: '500' }}>{cat}</span>
                          <span style={{ color: 'var(--text-muted)' }}>{percentage}%</span>
                       </div>
                       <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${percentage}%`, 
                            background: 'var(--primary)', 
                            borderRadius: '10px' 
                          }}></div>
                       </div>
                    </div>
                  );
               })}
               {top3Expenses.length === 0 && <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>No expense data available.</p>}
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export default InsightsPage;
