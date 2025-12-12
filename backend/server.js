import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

// GET all transactions
app.get("/api/transactions", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM transactions ORDER BY date DESC, id DESC"
        );
        res.json(rows);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
});

// CREATE transaction
app.post("/api/transactions", async (req, res) => {
    try {
        const { date, description, amount, type, category } = req.body;

        if (!date || !description || !amount || !type || !category) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({ error: "Invalid type" });
        }

        const [result] = await pool.query(
            `INSERT INTO transactions (date, description, amount, type, category)
       VALUES (?, ?, ?, ?, ?)`,
            [date, description, amount, type, category]
        );

        const [inserted] = await pool.query(
            "SELECT * FROM transactions WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json(inserted[0]);
    } catch (err) {
        console.error("Error creating transaction:", err);
        res.status(500).json({ error: "Failed to create transaction" });
    }
});


// UPDATE transaction
app.put("/api/transactions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { date, description, amount, type, category } = req.body;

        const [existingRows] = await pool.query(
            "SELECT * FROM transactions WHERE id = ?",
            [id]
        );
        if (existingRows.length === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        await pool.query(
            `UPDATE transactions
       SET date = ?, description = ?, amount = ?, type = ?, category = ?
       WHERE id = ?`,
            [date, description, amount, type, category, id]
        );

        const [updatedRows] = await pool.query(
            "SELECT * FROM transactions WHERE id = ?",
            [id]
        );
        res.json(updatedRows[0]);
    } catch (err) {
        console.error("Error updating transaction:", err);
        res.status(500).json({ error: "Failed to update transaction" });
    }
});

// DELETE transaction
app.delete("/api/transactions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM transactions WHERE id = ?", [id]);
        res.status(204).send();
    } catch (err) {
        console.error("Error deleting transaction:", err);
        res.status(500).json({ error: "Failed to delete transaction" });
    }
});

// Summary (total income, total expenses, balance)
app.get("/api/summary", async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
         SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
         SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
       FROM transactions`
        );

        const { total_income = 0, total_expense = 0 } = rows[0] || {};
        const balance = Number(total_income) - Number(total_expense);

        res.json({
            totalIncome: Number(total_income) || 0,
            totalExpense: Number(total_expense) || 0,
            balance,
        });
    } catch (err) {
        console.error("Error fetching summary:", err);
        res.status(500).json({ error: "Failed to fetch summary" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
});