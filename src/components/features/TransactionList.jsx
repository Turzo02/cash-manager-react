import { format } from 'date-fns';
import { Trash2, Edit2, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';
import React, { memo } from 'react';

const TransactionItem = memo(function TransactionItem({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === 'income';

  return (
    <Card lightweight className="transaction-row p-4 flex items-center justify-between">
      <div className="flex items-center gap-4 min-w-0">
        <div className={`shrink-0 p-3 rounded-2xl ${isIncome ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'}`}>
          {isIncome ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold truncate">{transaction.description}</h3>
          <p className="text-xs text-muted">{format(new Date(transaction.date), 'MMM dd, yyyy')}</p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className={`font-bold ${isIncome ? 'text-emerald-300' : 'text-text'}`}>
          {isIncome ? '+' : '-'}${parseFloat(transaction.amount).toFixed(2)}
        </span>

        <div className="flex gap-1">
          <button onClick={() => onEdit(transaction)} className="p-2 rounded-xl hover:bg-primary/15 hover:text-primary" aria-label={`Edit ${transaction.description}`} title="Edit transaction">
            <Edit2 size={14} strokeWidth={2.25} />
          </button>
          <button onClick={() => onDelete(transaction)} className="p-2 rounded-xl hover:bg-red-500/15 hover:text-red-300" aria-label={`Delete ${transaction.description}`} title="Delete transaction">
            <Trash2 size={14} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </Card>
  );
});

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 opacity-50">
        <p>No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 [contain:layout_style]">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
