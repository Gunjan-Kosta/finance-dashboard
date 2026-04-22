import React from 'react';
import { useStore } from '../store/useStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend } from 'recharts';

const FinanceCharts = () => {
  const { transactions } = useStore();

  const spendingByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, current) => {
      acc[current.category] = (acc[current.category] || 0) + current.amount;
      return acc;
    }, {});

  const pieData = Object.keys(spendingByCategory).map(key => ({
    name: key,
    value: spendingByCategory[key]
  }));

  const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#a855f7'];

  // Dynamically calculate balance trend
  const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;
  const trendMap = {};

  sortedTx.forEach(tx => {
    const dateStr = new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    runningBalance += tx.type === 'income' ? tx.amount : -tx.amount;
    trendMap[dateStr] = runningBalance;
  });

  let trendData = Object.keys(trendMap).map(date => ({
    name: date,
    balance: trendMap[date]
  }));

  if (trendData.length === 0) {
    trendData = [{ name: 'No data', balance: 0 }];
  } else if (trendData.length > 14) {
    // Show last 14 unique dates max to avoid crowding
    trendData = trendData.slice(-14);
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          background: 'var(--bg-dark)', 
          border: '1px solid var(--border)', 
          padding: '0.75rem', 
          borderRadius: '0.75rem', 
          boxShadow: 'var(--shadow-lg)' 
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>{label}</p>
          <p style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '1rem' }}>${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gridColumn: 'span 2' }}>
      {/* Trend Chart */}
      <div className="glass-card" style={{ padding: '1.5rem', minHeight: '350px' }}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Balance Trend</h3>
        <div style={{ width: '100%', height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--text-muted)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="var(--text-muted)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99, 102, 241, 0.3)', strokeWidth: 2 }} />
              <Area type="monotone" dataKey="balance" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Categories Chart */}
      <div className="glass-card" style={{ padding: '1.5rem', minHeight: '350px' }}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Spending Breakdown</h3>
        <div style={{ width: '100%', height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={8}
                dataKey="value"
                strokeWidth={0}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinanceCharts;
