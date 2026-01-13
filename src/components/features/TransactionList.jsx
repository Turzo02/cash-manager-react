import { format } from 'date-fns';
import { Trash2, Edit2, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';
import React from 'react';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 opacity-50">
        <p>No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {transactions.map((t) => (
        <Card key={t.id} className="p-4 flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${t.type === 'income' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
              {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
            <div>
              <h3 className="font-semibold">{t.description}</h3>
              <p className="text-xs opacity-50">{format(new Date(t.date), 'MMM dd, yyyy')}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <span className={`font-bold ${t.type === 'income' ? 'text-green-500' : 'text-text'}`}>
              {t.type === 'income' ? '+' : '-'}${parseFloat(t.amount).toFixed(2)}
            </span>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onEdit(t)} className="p-1 hover:text-primary">
                <Edit2 size={14} />
              </button>
              <button onClick={() => onDelete(t.id)} className="p-1 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
