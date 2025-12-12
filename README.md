---
# 💰 Finance Tracker

Full-stack personal finance tracking application

A clean, modern full-stack app for tracking income and expenses, built with React, Express, and MySQL.
Designed as a portfolio project with a strong focus on clarity, structure, and real-world practices.

---

## ✨ Features

 - Add, edit, and delete financial transactions
 - Categorize transactions as income or expense
 - Automatic balance calculation
 - Clean, centered, modern UI
 - Persistent data stored in MySQL
 - RESTful API backend
 - Environment-based configuration (no secrets in GitHub)

---

## 🧱 Tech Stack

Frontend
 - React (Vite)
 - Plain CSS (no frameworks)
 - Fetch API

Backend
 - Node.js
 - Express
 - MySQL
 - mysql2
 - dotenv
 - cors

---

## ⚙️ Setup & Installation

1️⃣ Clone the repository
``` bash
git clone https://github.com/tinojs/finance-tracker.git
cd finance-tracker
```
2️⃣ Database setup (MySQL)
```bash
CREATE DATABASE finance_tracker
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE finance_tracker;

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
3️⃣ Backend setup
```bash
cd backend
npm install
```
Create a .env file based on the example:
```bash
Create a .env file based on the example:
```
Edit .env:
```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=finance_tracker
```
Start the backend:
```bash
npm run dev
```
Backend runs at:
```bash
http://localhost:5000
```
4️⃣ Frontend setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at:
  ```bash
http://localhost:5173
```

## 🔌 API Endpoints
| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| GET    | `/api/health`           | Health check         |
| GET    | `/api/transactions`     | Get all transactions |
| POST   | `/api/transactions`     | Create transaction   |
| PUT    | `/api/transactions/:id` | Update transaction   |
| DELETE | `/api/transactions/:id` | Delete transaction   |
| GET    | `/api/summary`          | Get totals & balance |


## 📜 License
MIT — feel free to use this project as a learning reference.
