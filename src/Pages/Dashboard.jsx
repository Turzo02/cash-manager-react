import React, { useContext, useState } from 'react';
import Card from '../components/ui/Card';
import TransactionList from '../components/features/TransactionList';
import Modal from '../components/ui/Modal';
import TransactionForm from '../components/features/TransactionForm';
import { DataContext } from '../context/DataContext';

export default function Dashboard({ isAddModalOpen, closeAddModal }) {
  const { activeBook, balance, totalIncome, totalExpense, currentTransactions, addTransaction, updateTransaction, deleteTransaction } = useContext(DataContext)
  const [editingTx, setEditingTx] = useState(null);

  const handleSave = (data) => {
    if (editingTx) {
      updateTransaction(editingTx.id, data);
      setEditingTx(null);
    } else {
      addTransaction(data);
      closeAddModal();
    }
  };

  return (
    <div className="space-y-8">
      {/* Balance Card */}
      <Card className="relative overflow-hidden bg-linear-to-br from-primary/20 via-surface to-accent/10 border-white/10">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <p className="relative text-muted text-sm mb-2">{activeBook?.name}</p>
        <h2 className="relative text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-r from-text via-primary to-accent">${balance.toFixed(2)}</h2>
        <div className="relative grid grid-cols-2 gap-3">
          <div className="bg-surface-raised/65 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
            <p className="text-xs text-muted mb-1">Income</p>
            <p className="font-bold text-emerald-300">+${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-surface-raised/65 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
            <p className="text-xs text-muted mb-1">Expenses</p>
            <p className="font-bold text-red-300">-${totalExpense.toFixed(2)}</p>
          </div>
        </div>
      </Card>

      {/* Transactions */}
      <div>
        <h3 className="text-lg font-bold mb-4 px-1">Recent Activity</h3>
        <TransactionList 
          transactions={currentTransactions} 
          onEdit={setEditingTx}
          onDelete={deleteTransaction}
        />
      </div>

      {/* Modals */}
      <Modal isOpen={isAddModalOpen || !!editingTx} onClose={() => { closeAddModal(); setEditingTx(null); }} title={editingTx ? "Edit Transaction" : "New Transaction"}>
        <TransactionForm 
          onSubmit={handleSave} 
          initialData={editingTx || {}} 
          onCancel={() => { closeAddModal(); setEditingTx(null); }}
        />
      </Modal>
    </div>
  );
}
