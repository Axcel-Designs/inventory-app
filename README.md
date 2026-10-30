# 📦 Stockman – Modern Inventory & Warehouse Management System

A full-featured, responsive inventory and warehouse management web application built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Firebase Authentication & Firestore**.

Stockman provides inventory tracking, stock health monitoring, category classification, dynamic reordering matrices, and secure role-based access.

---

## 🚀 Features

- **🔐 Robust Authentication & Protected Routes**
  - Email & Password authentication with error handling.
  - One-click **Google OAuth Sign-In** via popup.
  - Persistent session management with Firebase Auth state listeners.
  - Route guards (`ProtectedRoute`) protecting internal dashboards and redirecting unauthorized traffic.

- **📊 Centralized Dashboard Overview**
  - High-level KPIs: Total Products, Active Categories, Asset Valuation, and Stock Alerts.
  - Live inventory distribution and warehouse capacity meters.
  - Quick summary of recent products with stock status tags (*In Stock*, *Low Stock*, *Critical*).

- **📦 Product Inventory Management**
  - Real-time instant search across product names and SKUs.
  - Multi-criteria filtering by category and operational stock status.
  - In-place product management actions (View, Edit, Delete).
  - Summary metrics for stock levels and critical thresholds.

- **🏷️ Categories & Reorder Matrix Configuration**
  - Department and taxonomy code classification (`TAXON-ID`).
  - Warehouse node assignment (US-East, US-West, Midwest nodes).
  - Reorder threshold sliders, safety buffers, and lead-time tracking.
  - Interactive reorder rules and category creation modal.

- **🎨 Modern, Responsive UI / UX**
  - Tailored color palette with warm earthen tones.
  - Mobile-responsive navigation with collapsible sidebar and slide-over panels.
  - Smooth micro-interactions and transitions powered by Tailwind CSS v4.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Build Tool & Dev Server** | [Vite 8](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Routing** | [React Router v8](https://reactrouter.com/) |
| **Backend & Auth** | [Firebase 13 (Auth & Firestore)](https://firebase.google.com/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) (Feather & FontAwesome) |
| **Data Visualization** | [Recharts](https://recharts.org/) |

---

## 📂 Project Structure

```text
capstone/
├── public/                 # Static assets & favicon
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/         # Reusable presentation components
│   │   ├── ui/             # Atomic design elements (Buttons, Inputs)
│   │   ├── LoadingSec.jsx  # Themed full-page spinner
│   │   ├── LoginForm.jsx   # Authentication form (Email & Google OAuth)
│   │   ├── Navbar.jsx      # Top header with search & profile badge
│   │   ├── Sidebar.jsx     # Side navigation with active link highlighting
│   │   └── StatCard.jsx    # Metric / KPI display card
│   ├── context/            # React Context providers
│   │   ├── AuthProvider.jsx    # Auth state management & observer
│   │   └── ProtectedRoute.jsx  # Route guard for authenticated views
│   ├── data/               # Mock datasets and domain schemas
│   │   ├── categories.js   # Category metadata & threshold defaults
│   │   └── data.js         # Dashboard statistics & recent items
│   ├── firebase/           # Firebase initialization & SDK exports
│   │   └── firebase.js
│   ├── layout/             # Layout wrappers
│   │   └── DashboardLayout.jsx # Standard authenticated layout (Navbar + Sidebar + Main)
│   ├── lib/                # Helper libraries & Firebase auth functions
│   │   └── auth.js         # sign in, sign up, Google login, and logout
│   ├── pages/              # Application route views
│   │   ├── Categories.jsx  # Category rules & node management
│   │   ├── Dashboard.jsx   # Main metrics overview
│   │   ├── Login.jsx       # Public login page
│   │   ├── Product.jsx     # Single product view
│   │   └── Products.jsx    # Complete inventory list table
│   ├── App.jsx             # Top-level route configuration
│   ├── index.css           # Global stylesheet & Tailwind directives
│   └── main.jsx            # Application entry point
├── .env.example            # Environment variables template
├── package.json            # Dependencies and npm scripts
└── vite.config.js          # Vite build & plugin configuration
```

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** or **yarn**

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/capstone.git
cd capstone

# Install project dependencies
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory by copying the template:

```bash
cp .env.example .env.local
```

Fill in your Firebase credentials in `.env.local`:

```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project-id.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
```

---

## 🔥 Firebase Setup Guide

To enable authentication for this project:

1. Open the [Firebase Console](https://console.firebase.google.com/) and select or create your project.
2. Navigate to **Build > Authentication** and click **Get Started**.
3. Under the **Sign-in method** tab:
   - Enable **Email/Password**.
   - Enable **Google** (select a support email and save).
4. Under the **Settings > Authorized domains** tab:
   - Ensure `localhost` is present in the authorized domains list.
5. Navigate to **Project Settings > General**, scroll to **Your apps**, create a Web app, and copy the `firebaseConfig` keys into your `.env.local`.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local Vite development server at `http://localhost:5173`. |
| `npm run build` | Compiles and bundles production assets into the `dist/` directory. |
| `npm run preview` | Locally serves the production build for testing. |
| `npm run lint` | Runs ESLint across the codebase to catch errors and code style issues. |

---

## 🔒 Routes Architecture

| Path | Access | Component | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | Public | `Login.jsx` | Authentication entry point (auto-redirects if already logged in). |
| `/dashboard` | Protected | `Dashboard.jsx` | KPI statistics, stock charts, alerts, and recent product list. |
| `/products` | Protected | `Products.jsx` | Full searchable and filterable inventory table. |
| `/categories` | Protected | `Categories.jsx` | Warehouse department groupings and reorder threshold matrix. |
| `*` | Fallback | `Login.jsx` | Catches undefined routes and directs users to safety. |

---

## 📄 License

This project is developed as part of the Tech4Youth Capstone program. Released under the [MIT License](LICENSE).
