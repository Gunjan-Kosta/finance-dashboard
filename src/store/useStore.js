import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialTransactions = [
  { id: '1', date: '2026-04-01', amount: 2500, category: 'Salary', type: 'income', note: 'Monthly Paycheck' },
  { id: '2', date: '2026-04-02', amount: 120.50, category: 'Food', type: 'expense', note: 'Grocery shopping' },
  { id: '3', date: '2026-04-02', amount: 45.00, category: 'Transport', type: 'expense', note: 'Uber ride' },
  { id: '4', date: '2026-04-03', amount: 800, category: 'Freelance', type: 'income', note: 'Project delivery' },
  { id: '5', date: '2026-04-03', amount: 65.00, category: 'Entertainment', type: 'expense', note: 'Movie tickets' },
  { id: '6', date: '2026-04-04', amount: 300, category: 'Shopping', type: 'expense', note: 'New sneakers' },
  { id: '7', date: '2026-03-25', amount: 1500, category: 'Rent', type: 'expense', note: 'March Rent' },
  { id: '8', date: '2026-03-28', amount: 200, category: 'Utilities', type: 'expense', note: 'Electricity bill' },
];

export const useStore = create(
  persist(
    (set, get) => ({
      transactions: initialTransactions,
      role: 'admin', // 'admin' | 'viewer'
      filters: {
        search: '',
        category: 'All',
        type: 'All',
      },

      // Actions
      setRole: (role) => set({ role }),
      
      setFilters: (newFilters) => 
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),

      addTransaction: (tx) => 
        set((state) => ({ 
          transactions: [{ ...tx, id: Date.now().toString() }, ...state.transactions] 
        })),

      deleteTransaction: (id) => 
        set((state) => ({ 
          transactions: state.transactions.filter((t) => t.id !== id) 
        })),

      editTransaction: (updatedTx) => 
        set((state) => ({
          transactions: state.transactions.map((t) => t.id === updatedTx.id ? updatedTx : t)
        })),

      // Derived State
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        return transactions.filter((tx) => {
          const matchSearch = tx.note.toLowerCase().includes(filters.search.toLowerCase()) || 
                              tx.category.toLowerCase().includes(filters.search.toLowerCase());
          const matchCategory = filters.category === 'All' || tx.category === filters.category;
          const matchType = filters.type === 'All' || tx.type === filters.type;
          return matchSearch && matchCategory && matchType;
        });
      },

      getStats: () => {
        const { transactions } = get();
        const income = transactions
          .filter((t) => t.type === 'income')
          .reduce((acc, t) => acc + t.amount, 0);
        const expense = transactions
          .filter((t) => t.type === 'expense')
          .reduce((acc, t) => acc + t.amount, 0);
        return {
          totalBalance: income - expense,
          totalIncome: income,
          totalExpense: expense,
        };
      }
    }),
    {
      name: 'finance-storage',
    }
  )
);
