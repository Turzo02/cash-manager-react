import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import { Wallet, Trash2, CheckCircle2 } from "lucide-react";

export default function Books({ onNotify }) {
  const { books, activeBookId, setActiveBookId, addBook, deleteBook } =
    useContext(DataContext);
  const [newBookName, setNewBookName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newBookName.trim()) {
      addBook(newBookName);
      onNotify?.("Book created successfully");
      setNewBookName("");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <h3 className="font-bold text-lg mb-4">Create New Book</h3>
        <form onSubmit={handleAdd} className="flex gap-2 ">
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
            onClick={() => {
              setActiveBookId(book.id);
              onNotify?.(`${book.name} selected`);
            }}
            className={`
              relative p-4 rounded-3xl border transition-all cursor-pointer flex items-center gap-4 hover:scale-[1.01] hover:shadow-xl hover:shadow-black/30
              ${
                book.id === activeBookId
                  ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                  : "bg-surface/70 hover:bg-surface-raised border-white/5"
              }
            `}
          >
            <div
              className={`p-3 rounded-full ${
                book.id === activeBookId
                  ? "bg-linear-to-br from-primary to-accent text-white shadow-lg shadow-primary/30"
                  : "bg-surface-raised text-muted"
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
              <p className="text-xs text-muted">
                {book.id === activeBookId ? "Active Wallet" : "Click to switch"}
              </p>
            </div>

            {book.id === activeBookId && (
              <CheckCircle2 className="text-primary" size={20} />
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTarget(book);
              }}
              className="p-2 text-muted/60 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors z-10"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Book?"
      >
        <p className="text-muted mb-6">
          Delete “{deleteTarget?.name}” and all its transactions?
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setDeleteTarget(null)}
            className="flex-1 px-4 py-3 rounded-2xl font-medium bg-surface-raised/70 border border-white/5 text-muted hover:text-white hover:bg-surface-raised"
          >
            No
          </button>
          <button
            type="button"
            onClick={() => {
              deleteBook(deleteTarget.id);
              onNotify?.("Book deleted");
              setDeleteTarget(null);
            }}
            disabled={books.length <= 1}
            className="flex-1 px-4 py-3 rounded-2xl font-medium bg-red-500/90 text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Yes, delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
