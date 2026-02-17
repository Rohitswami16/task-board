# 🚀 Task Board - React + Vite

[![React](https://img.shields.io/badge/React-17.0.2-blue)](https://reactjs.org/) 
[![Vite](https://img.shields.io/badge/Vite-4.5.0-yellowgreen)](https://vitejs.dev/) 
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blueviolet)](https://tailwindcss.com/) 
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A **drag-and-drop task management web app** built with **React.js**, **Vite**, and **Tailwind CSS**.  
Supports **creating, editing, deleting, filtering, and sorting tasks** with persistence and activity logs.

---

## 🛠️ Features

- **Task Management**
  - Add, edit, delete tasks.
  - Task fields: **Title**, **Description**, **Priority**, **Due Date**, **Tags**, **Created At**.
  - Form validation: mandatory fields and due date (cannot be in the past).
- **Drag & Drop**
  - Move tasks between columns: **Todo**, **Doing**, **Done**.
  - Smooth animations with `@hello-pangea/dnd`.
- **Filtering & Sorting**
  - Search by task title.
  - Filter by priority: Low, Medium, High, or All.
  - Sort tasks by due date.
- **Persistence**
  - Tasks saved in **localStorage** to survive page refresh.
  - Reset board option with confirmation.
- **Activity Log**
  - Tracks actions: create, update, delete, move tasks.
- **Responsive UI**
  - Tailwind CSS for mobile-first design and smooth interactions.

---

## ⚡ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS  
- **State Management:** React Context + useReducer  
- **Drag & Drop:** @hello-pangea/dnd  
- **Storage:** localStorage  
- **Routing:** React Router DOM  

---

## 📁 Project Structure

```
task-board/
│
├─ src/
│ ├─ components/
│ │ ├─ Column.js
│ │ ├─ TaskCard.js
│ │ ├─ TaskModal.js
│ │ └─ ActivityLog.js
│ │
│ ├─ context/
│ │ └─ BoardContext.js
│ │
│ ├─ utils/
│ │ └─ storage.js
│ │
│ ├─ pages/
│ │ └─ Board.js
│ │
│ └─ App.js
│
├─ package.json
└─ README.md

```

## 🔧 React + Vite Setup

This project uses **Vite** for fast development and **React** with HMR.

### Plugins used:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) – uses **Babel** for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) – uses **SWC** for Fast Refresh

### React Compiler

Enabled on this template. Learn more [here](https://react.dev/learn/react-compiler).  
> Note: Impacts Vite dev & build performance.

### ESLint Configuration

For production apps, it’s recommended to use **TypeScript** and type-aware lint rules via [`typescript-eslint`](https://typescript-eslint.io). Check the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for details.

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/task-board.git
cd task-board



Navigate into the project directory:
cd task-board


Install dependencies:
npm install


Set up Tailwind CSS (if not already configured):
npx tailwindcss init


This generates a tailwind.config.js file.
Make sure your CSS file imports Tailwind:

@tailwind base;
@tailwind components;
@tailwind utilities;


Run the development server:
npm run dev