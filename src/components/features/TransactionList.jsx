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
        <Card key={t.id} className="p-4 flex items-center justify-between group hover:scale-[1.01] hover:border-primary/30 hover:shadow-primary/10">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${t.type === 'income' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'}`}>
              {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
            <div>
              <h3 className="font-semibold">{t.description}</h3>
              <p className="text-xs text-muted">{format(new Date(t.date), 'MMM dd, yyyy')}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <span className={`font-bold ${t.type === 'income' ? 'text-emerald-300' : 'text-text'}`}>
              {t.type === 'income' ? '+' : '-'}${parseFloat(t.amount).toFixed(2)}
            </span>
            
            <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onEdit(t)} className="p-2 rounded-xl hover:bg-primary/15 hover:text-primary transition-colors" aria-label={`Edit ${t.description}`} title="Edit transaction">
                <Edit2 size={14} strokeWidth={2.25} />
              </button>
              <button onClick={() => onDelete(t.id)} className="p-2 rounded-xl hover:bg-red-500/15 hover:text-red-300 transition-colors" aria-label={`Delete ${t.description}`} title="Delete transaction">
                <Trash2 size={14} strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
