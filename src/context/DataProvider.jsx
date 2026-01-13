import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'; // <--- 1. Import this

import { DataContext } from './DataContext';
const INITIAL_BOOKS = [{ id: 'default-book', name: 'Personal Wallet' }];

export function DataProvider({ children }) {

  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  const [activeBookId, setActiveBookId] = useState(() => {
    return localStorage.getItem('activeBookId') || INITIAL_BOOKS[0].id;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => localStorage.setItem('books', JSON.stringify(books)), [books]);
  useEffect(() => localStorage.setItem('transactions', JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem('activeBookId', activeBookId), [activeBookId]);

  const activeBook = books.find(b => b.id === activeBookId);
  
  const currentTransactions = transactions.filter(t => t.bookId === activeBookId);
  
  const balance = currentTransactions.reduce((acc, t) => 
    t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount), 0
  );

  const totalIncome = currentTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const totalExpense = currentTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const addTransaction = (data) => {
    const newTx = { ...data, id: uuidv4(), bookId: activeBookId, createdAt: new Date() };
    setTransactions(prev => [newTx, ...prev]);
  };

  const updateTransaction = (id, data) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  };

  const deleteTransaction = (id) => {
    alert("Delete this transaction?");
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addBook = (name) => {
    const newBook = { id: uuidv4(), name };
    setBooks(prev => [...prev, newBook]);
    setActiveBookId(newBook.id);
  };

  const updateBook = (id, name) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, name } : b));
  };

  const deleteBook = (id) => {
    if (books.length <= 1) return alert("Cannot delete the last book.");
    if (confirm("Delete this book and all its transactions?")) {
      setBooks(prev => prev.filter(b => b.id !== id));
      setTransactions(prev => prev.filter(t => t.bookId !== id));
      if (activeBookId === id) setActiveBookId(books[0].id);
    }
  };

  return (
    <DataContext value={{
      books, activeBook, activeBookId, setActiveBookId,
      currentTransactions, balance, totalIncome, totalExpense,
      addTransaction, updateTransaction, deleteTransaction,
      addBook, updateBook, deleteBook
    }}>
      {children}
    </DataContext>
  );
}

export default DataProvider;