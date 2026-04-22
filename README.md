# 💎 Finance Dashboard

A premium, interactive finance dashboard built with **React** and **Vanilla CSS**. Designed for high-end aesthetics with glassmorphism, smooth animations, and robust functionality.

## ✨ Key Features

-   **Live Financial Summary**: Real-time overview of Balance, Income, and Expenses.
-   **Interactive Visualizations**: Time-based balance trends and categorical spending breakdown using `recharts`.
-   **Advanced Transaction Management**:
    -   Sort, filter, and search through transactions.
    -   Persistent data using Local Storage.
    -   Export functionality (JSON).
-   **Simulated Role-Based Access Control (RBAC)**:
    -   **Viewer**: Read-only access to dashboard and history.
    -   **Admin**: Full permissions to add, edit, or delete transactions.
-   **Premium UI/UX**:
    -   Dark-mode by default with glassmorphism effects.
    -   Fluid animations powered by `framer-motion`.
    -   Fully responsive layout for desktop and mobile.
-   **State Management**: Centralized application state management.

## 🚀 Tech Stack

-   **Framework**: React (Vite)
-   **Styling**: Vanilla CSS (Variables, Flexbox, Grid)
-   **Icons**: Lucide React
-   **Charts**: Recharts
-   **Animations**: Framer Motion

## 🛠️ Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run in development mode**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## 📂 Project Structure

-   `src/store`: Core application state management.
-   `src/components`: Modular UI components (Charts, Tables, Modals, Stats).
-   `src/index.css`: Core design system and global styles.
-   `src/App.jsx`: Main layout and dashboard assembly.

## 📝 Design Decisions

-   **Aesthetics**: Chose a "Deep Slate" color palette with "Indigo" and "Rose" accents to create a modern, professional look that is easy on the eyes.
-   **UX**: Implemented a fixed sidebar for fast navigation and one-click role switching to demonstrate RBAC easily.
-   **Responsiveness**: Used CSS Grid's `auto-fit` and `minmax` strategies to ensure cards and charts adapt naturally to screen width.
-   **Empty States**: Handled cases where no transactions match filters with clear visual indicators.

---

## 👨‍💻 Developed By

This project was built using AI by **GUNJAN KOSTA**.

🔗 **GitHub**: [Gunjan-Kosta](https://github.com/Gunjan-Kosta)
