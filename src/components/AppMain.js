import { useState } from "react";
import ExpenseContainer from "./ExpenseContainer";
import HistoryContainer from "./HistoryContainer";

export default function AppMain() {
  const [expenses, setExpenses] = useState([]);

  function handleAddExpense(expense) {
    setExpenses((s) => [...s, expense]);
  }

  function handleDeleteExpense(id) {
    setExpenses((s) => s.filter((expense) => expense.id !== id));
  }

  function handleClearExpenses() {
    setExpenses([]);
  }
  return (
    <main>
      <ExpenseContainer expenses={expenses} onAddExpense={handleAddExpense} />
      <HistoryContainer
        expenses={expenses}
        onDeleteExpense={handleDeleteExpense}
        onClearExpenses={handleClearExpenses}
      />
    </main>
  );
}
