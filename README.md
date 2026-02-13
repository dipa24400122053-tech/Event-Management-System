# 🎯 Event Management System

A web-based Event Management System built using React and Vite.  
This application demonstrates authentication flow, role-based access control, protected routing, and session management.

---

## 🚀 Project Overview

The Event Management System allows users to register, log in, and manage event-related activities based on their role (Admin or User).

The application follows this flow:

Sign Up → Login → Dashboard → Modules (Maintenance / Reports / Transactions) → Logout

---

## 🔐 Authentication

- User Registration (Sign Up) with full validation:
  - Required fields validation
  - Email format validation
  - Password confirmation check
- Login using username and password
- Session persistence using localStorage
- Logout destroys the session and redirects to login

---

## 👥 Role-Based Access Control

The system supports two roles:

### 🔹 Admin
- Access to Maintenance module
- Access to Reports
- Access to Transactions

### 🔹 User
- Access to Reports
- Access to Transactions
- No access to Maintenance module

Protected routes are implemented to restrict unauthorized access.

---

## 📂 Modules

### Maintenance (Admin Only)
Manage master data such as events or memberships.

### 📊 Reports
View and filter event-related data.

### 💳 Transactions
Track and manage event transactions.

---

## Project Structure

src
│
├── components → Reusable UI components
├── pages → Full screen pages (Login, Dashboard, etc.)
├── contexts → Global state management (Authentication)
├── ProtectedRoute → Role-based route protection
└── main.tsx → Application entry point

##  Technologies Used

- React
- Vite
- TypeScript
- React Context API
