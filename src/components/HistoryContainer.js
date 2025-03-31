import { TrashIcon } from "@heroicons/react/24/solid";

export default function HistoryContainer({
  expenses,
  onDeleteExpense,
  onClearExpenses,
}) {
  return (
    <div className="history-container">
      <div className="history-label">Expense History</div>
      {expenses.length === 0 ? (
        <div className="empty-history">😔 History is Currently Empty 😔</div>
      ) : (
        <>
          <div className="history">
            {expenses.map((expense) => (
              <div key={expense.id} className="expense">
                <label>{expense.date}</label>
                <label>{expense.name}</label>
                <label>{expense.value}</label>
                <TrashIcon
                  className="icon delete-icon"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to delete this expense"
                    );
                    confirmed && onDeleteExpense(expense.id);
                  }}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to clear all expenses"
              );
              confirmed && onClearExpenses();
            }}
          >
            Clear Expenses
          </button>
        </>
      )}
    </div>
  );
}
