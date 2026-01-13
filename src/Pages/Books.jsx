import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Wallet, Trash2, CheckCircle2 } from "lucide-react";

export default function Books() {
  const { books, activeBookId, setActiveBookId, addBook, deleteBook } =
    useContext(DataContext);
  const [newBookName, setNewBookName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (newBookName.trim()) {
      addBook(newBookName);
      setNewBookName("");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-bold mb-3">Create New Book</h3>
        <form onSubmit={handleAdd} className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="e.g. Travel Fund"
              value={newBookName}
              onChange={(e) => setNewBookName(e.target.value)}
            />
          </div>
          <Button type="submit">Add</Button>
        </form>
      </Card>

      <div className="space-y-3">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => setActiveBookId(book.id)}
            className={`
              relative p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4
              ${
                book.id === activeBookId
                  ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                  : "bg-surface/40 hover:bg-surface/60 border-white/10"
              }
            `}
          >
            <div
              className={`p-3 rounded-full ${
                book.id === activeBookId
                  ? "bg-primary text-white"
                  : "bg-surface text-text"
              }`}
            >
              <Wallet size={20} />
            </div>

            <div className="flex-1">
              <h4
                className={`font-bold ${
                  book.id === activeBookId ? "text-primary" : ""
                }`}
              >
                {book.name}
              </h4>
              <p className="text-xs opacity-50">
                {book.id === activeBookId ? "Active Wallet" : "Click to switch"}
              </p>
            </div>

            {book.id === activeBookId && (
              <CheckCircle2 className="text-primary" size={20} />
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteBook(book.id);
              }}
              className="p-2 text-text/30 hover:text-red-500 transition-colors z-10"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
