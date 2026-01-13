import { useState} from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function TransactionForm({ onSubmit, initialData = {}, onCancel }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    ...initialData
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex bg-surface/50 p-1 rounded-xl border border-white/10">
        {['expense', 'income'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFormData({ ...formData, type: t })}
            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              formData.type === t 
                ? (t === 'income' ? 'bg-green-500 text-white shadow-md' : 'bg-red-500 text-white shadow-md')
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Input 
        type="number" 
        label="Amount" 
        placeholder="0.00" 
        value={formData.amount}
        onChange={(e) => setFormData({...formData, amount: e.target.value})}
        autoFocus
      />
      
      <Input 
        type="text" 
        label="Description" 
        placeholder="e.g. Groceries"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />

      <Input 
        type="date" 
        label="Date"
        value={formData.date}
        onChange={(e) => setFormData({...formData, date: e.target.value})}
      />

      <div className="flex gap-3 mt-4">
        <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Save Transaction
        </Button>
      </div>
    </form>
  );
}
