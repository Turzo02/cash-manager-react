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
    <div className="space-y-6">
      {/* Balance Card */}
      <Card className="bg-linear-to-br from-primary/80 to-purple-600/80 text-white border-none">
        <p className="opacity-80 text-sm mb-1">{activeBook?.name}</p>
        <h2 className="text-4xl font-bold mb-6">${balance.toFixed(2)}</h2>
        <div className="flex gap-4">
          <div className="flex-1 bg-black/20 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs opacity-70 mb-1">Income</p>
            <p className="font-semibold text-green-300">+${totalIncome.toFixed(2)}</p>
          </div>
          <div className="flex-1 bg-black/20 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs opacity-70 mb-1">Expenses</p>
            <p className="font-semibold text-red-300">-${totalExpense.toFixed(2)}</p>
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
