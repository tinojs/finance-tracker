export default function TransactionList({ transactions, onEdit, onDelete }) {
    if (!transactions.length) {
        return <p>No transactions yet. Add your first one!</p>;
    }

    return (
        <table className="transactions-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {transactions.map((t) => (
                    <tr key={t.id}>
                        <td>{t.date?.slice(0, 10)}</td>
                        <td>{t.description}</td>
                        <td>{t.category}</td>
                        <td className={t.type === "income" ? "tag-income" : "tag-expense"}>
                            {t.type}
                        </td>
                        <td>
                            {t.type === "expense" ? "-" : "+"}
                            {Number(t.amount).toFixed(2)}
                        </td>
                        <td>
                            <button onClick={() => onEdit(t)}>Edit</button>
                            <button onClick={() => onDelete(t.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
