export default function Summary({ summary }) {
    const { totalIncome = 0, totalExpense = 0, balance = 0 } = summary || {};

    return (
        <div className="card summary">
            <h2>Summary</h2>
            <div className="summary-row">
                <span>Total income:</span>
                <span>€{totalIncome.toFixed(2)}</span>
            </div>
            <div className="summary-row">
                <span>Total expense:</span>
                <span>€{totalExpense.toFixed(2)}</span>
            </div>
            <div className="summary-row balance">
                <span>Balance:</span>
                <span className={balance >= 0 ? "positive" : "negative"}>
                    €{balance.toFixed(2)}
                </span>
            </div>
        </div>
    );
}
