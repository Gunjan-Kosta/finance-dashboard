import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useStore = create(
  persist(
    (set, get) => ({
      transactions: [],
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

      fetchTransactions: async () => {
        try {
          const res = await fetch(`${API_URL}/transactions`);
          if (!res.ok) throw new Error('Failed to fetch');
          const data = await res.json();
          set({ transactions: data });
        } catch (error) {
          console.error("Fetch transactions error:", error);
        }
      },

      addTransaction: async (tx) => {
        try {
          const res = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tx)
          });
          if (!res.ok) throw new Error('Failed to add transaction');
          const data = await res.json();
          set((state) => ({ 
            transactions: [data, ...state.transactions] 
          }));
        } catch (error) {
          console.error("Add transaction error:", error);
        }
      },

      deleteTransaction: async (id) => {
        try {
          await fetch(`${API_URL}/transactions/${id}`, { method: 'DELETE' });
          set((state) => ({ 
            transactions: state.transactions.filter((t) => t.id !== id) 
          }));
        } catch (error) {
          console.error("Delete transaction error:", error);
        }
      },

      editTransaction: async (updatedTx) => {
        try {
          const res = await fetch(`${API_URL}/transactions/${updatedTx.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTx)
          });
          const data = await res.json();
          set((state) => ({
            transactions: state.transactions.map((t) => t.id === updatedTx.id ? data : t)
          }));
        } catch (error) {
           console.error("Edit transaction error:", error);
        }
      },

      // Derived State
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        if (!transactions) return [];
        return transactions.filter((tx) => {
          const noteStr = tx.note ? tx.note.toLowerCase() : '';
          const categoryStr = tx.category ? tx.category.toLowerCase() : '';
          const searchStr = filters.search.toLowerCase();
          const matchSearch = noteStr.includes(searchStr) || categoryStr.includes(searchStr);
          const matchCategory = filters.category === 'All' || tx.category === filters.category;
          const matchType = filters.type === 'All' || tx.type === filters.type;
          return matchSearch && matchCategory && matchType;
        });
      },

      getStats: () => {
        const { transactions } = get();
        if (!transactions) return { totalBalance: 0, totalIncome: 0, totalExpense: 0 };
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
      partialize: (state) => ({ role: state.role, filters: state.filters }),
    }
  )
);
