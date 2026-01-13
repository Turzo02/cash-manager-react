# Cash Manager

Cash Manager is a simple, client-side web application for managing personal finances.  
It helps you track income and expenses across multiple books while keeping all your data stored locally in your browser.

There is no backend, no account system, and no data leaving your device.

---

## Why This Project Exists

Most finance apps are either too complex or require signups and cloud storage.  
Cash Manager is built to be:

- Simple
- Private
- Fast
- Mobile-first

It focuses only on what matters: knowing where your money goes.

---

## Core Features

### Dashboard
- Shows the current balance
- Displays total income and total expenses
- Lists recent transactions for the active book

### Transaction Management
- Add income or expense transactions
- Edit existing transactions
- Delete transactions with confirmation
- Each transaction includes amount, description, date, and time

### Multiple Books
- Create separate books for different purposes
- Switch between books instantly
- Edit or delete books
- Deleting a book also removes its transactions

### Theme Mode
- Light and dark mode support
- Manual toggle
- Theme preference is saved locally

### Local Storage
- All data is stored in browser local storage
- Data persists across reloads
- No authentication or server required

---

## Tech Stack

- React
- Tailwind CSS
- Local Storage API

---

## Project Philosophy

- Mobile-first design
- Component-based architecture
- No unnecessary dependencies
- Easy to extend in the future

---

## Getting Started

```bash
npm install
npm run dev
