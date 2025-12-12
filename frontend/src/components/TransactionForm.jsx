import { useState, useEffect } from "react";

const initialForm = {
    date: "",
    description: "",
    amount: "",
    type: "expense",
    category: "",
};

export default function TransactionForm({ onSave, editing }) {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (editing) {
            setForm({
                date: editing.date?.slice(0, 10) || "",
                description: editing.description || "",
                amount: editing.amount?.toString() || "",
                type: editing.type || "expense",
                category: editing.category || "",
            });
        } else {
            setForm(initialForm);
        }
    }, [editing]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.date || !form.description || !form.amount || !form.category) {
            alert("Fill in all fields.");
            return;
        }
        onSave({
            ...form,
            amount: parseFloat(form.amount),
        });
        if (!editing) {
            setForm(initialForm);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card">
            <h2>{editing ? "Edit transaction" : "Add transaction"}</h2>

            <div className="field">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                />
            </div>

            <div className="field">
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="e.g. Groceries, Salary"
                />
            </div>

            <div className="field">
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={form.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="field">
                <label htmlFor="type">Type</label>
                <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="category">Category</label>
                <input
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Food, Rent, Salary..."
                />
            </div>

            <button type="submit">
                {editing ? "Save changes" : "Add"}
            </button>
        </form>
    );
}