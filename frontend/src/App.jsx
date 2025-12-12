import { useEffect, useState } from "react";
import "./App.css";
import {
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    fetchSummary,
} from "./api";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";

function App() {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState(null);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadData() {
        try {
            setLoading(true);
            setError("");
            const [txs, sum] = await Promise.all([
                fetchTransactions(),
                fetchSummary(),
            ]);
            setTransactions(txs);
            setSummary(sum);
        } catch (err) {
            console.error(err);
            setError("Failed to load data from server.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    async function handleSave(data) {
        try {
            if (editing) {
                const updated = await updateTransaction(editing.id, data);
                setTransactions((txs) =>
                    txs.map((t) => (t.id === editing.id ? updated : t))
                );
                setEditing(null);
            } else {
                const created = await createTransaction(data);
                setTransactions((txs) => [created, ...txs]);
            }
            const sum = await fetchSummary();
            setSummary(sum);
        } catch (err) {
            console.error(err);
            alert("Error saving transaction.");
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this transaction?")) return;
        try {
            await deleteTransaction(id);
            setTransactions((txs) => txs.filter((t) => t.id !== id));
            const sum = await fetchSummary();
            setSummary(sum);
        } catch (err) {
            console.error(err);
            alert("Error deleting transaction.");
        }
    }

    return (
        <div className="app">
            <header>
                <h1>Finance Tracker</h1>
                <p>React + Express + MySQL</p>
            </header>

            {error && <div className="error">{error}</div>}

            <div className="layout">
                <div className="left">
                    <TransactionForm onSave={handleSave} editing={editing} />
                    <Summary summary={summary} />
                </div>
                <div className="right">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <TransactionList
                            transactions={transactions}
                            onEdit={setEditing}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
