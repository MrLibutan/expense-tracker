import { useState } from "react";

export default function ExpenseContainer({ expenses, onAddExpense }) {
  const [date, setDate] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseValue, setExpenseValue] = useState("");

  const [dateError, setDateError] = useState("");
  const [expenseNameError, setExpenseNameError] = useState("");
  const [expenseValueError, setExpenseValueError] = useState("");

  const [expenseAddedVisible, setExpenseAddedVisible] = useState(false);

  // derived state
  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );
  return (
    <form
      className="expense-container"
      onSubmit={(e) => {
        e.preventDefault();

        let hasError = false;

        if (!date) {
          setDateError("Required ⚠️");
          hasError = true;
          setTimeout(() => setDateError(""), 3000);
        }

        if (!expenseName) {
          setExpenseNameError("Required ⚠️");
          hasError = true;
          setTimeout(() => setExpenseNameError(""), 3000);
        }

        if (!expenseValue || isNaN(expenseValue)) {
          setExpenseValueError("Required ⚠️");
          hasError = true;
          setTimeout(() => setExpenseValueError(""), 3000);
        }

        if (isNaN(expenseValue)) {
          setExpenseValueError("Invalid Expense Value ⚠️");
          hasError = true;
          setTimeout(() => setExpenseValueError(""), 3000);
        }

        if (hasError) return;

        // put all states in an object and use radom UUID for the id property
        const expense = {
          id: crypto.randomUUID(),
          date,
          name: expenseName,
          value: Number(expenseValue),
        };
        // Add expense
        onAddExpense(expense);

        // Notif user that an expense was added
        setExpenseAddedVisible(true);
        setTimeout(() => setExpenseAddedVisible(false), 5000);

        // Reset state values
        setDate("");
        setExpenseName("");
        setExpenseValue("");
      }}
    >
      {expenseAddedVisible && (
        <div className="expense-added">
          <p>☑️</p>
          <p>Expense Added</p>
        </div>
      )}
      <div className="total-expense">Total Expense: Php {totalExpense}</div>
      <div className="input-field">
        <div className="label-container">
          <label>Date:</label>
          {dateError && <span className="error">{dateError}</span>}
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="input-field">
        <div className="label-container">
          <label>Expense Name:</label>
          {expenseNameError && (
            <span className="error">{expenseNameError}</span>
          )}
        </div>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
      </div>

      <div className="input-field">
        <div className="label-container">
          <label>Expense Value (Php):</label>
          {expenseValueError && (
            <span className="error">{expenseValueError}</span>
          )}
        </div>
        <input
          type="text"
          value={expenseValue}
          onChange={(e) => {
            const value = e.target.value;

            // if value is empty
            if (value.length === 0) {
              setExpenseValueError("");
              setExpenseValue(value);
              return;
            }

            // Convert value to Number
            const numberValue = Number(value);

            // Check if value is a positive number
            if (isNaN(numberValue) || numberValue <= 0) {
              setExpenseValueError("Invalid Expense Value ⚠️");
            } else {
              setExpenseValueError("");
            }

            // set the expense value
            setExpenseValue(value);
          }}
        />
      </div>

      <button>Add Expense</button>
    </form>
  );
}
