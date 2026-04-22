import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryStats = () => {
  const { getStats } = useStore();
  const { totalBalance, totalIncome, totalExpense } = getStats();

  const cards = [
    { 
      title: 'Total Balance', 
      amount: totalBalance, 
      icon: Wallet, 
      color: 'var(--primary)', 
      bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.1))' 
    },
    { 
      title: 'Total Income', 
      amount: totalIncome, 
      icon: ArrowUpRight, 
      color: 'var(--income)', 
      bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1))',
      trend: '+12%'
    },
    { 
      title: 'Total Expense', 
      amount: totalExpense, 
      icon: ArrowDownRight, 
      color: 'var(--expense)', 
      bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))',
      trend: '-4.3%'
    },
  ];

  return (
    <div className="summary-grid" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '1.5rem' 
    }}>
      {cards.map((card, idx) => (
        <motion.div
           key={card.title}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: idx * 0.1 }}
           className="glass-card"
           style={{ padding: '1.25rem', background: card.bg }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)',
              display: 'grid', placeItems: 'center', color: card.color
            }}>
              <card.icon size={20} />
            </div>
            {card.trend && (
              <span style={{ 
                fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.4rem', borderRadius: '5px',
                background: card.trend.startsWith('+') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: card.trend.startsWith('+') ? 'var(--income)' : 'var(--expense)'
              }}>
                {card.trend}
              </span>
            )}
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginBottom: '0.125rem' }}>{card.title}</p>
            <h2 style={{ fontSize: '1.375rem', fontWeight: '700' }}>
              ${card.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryStats;
