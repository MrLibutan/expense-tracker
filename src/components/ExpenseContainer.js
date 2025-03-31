export default function ExpenseContainer() {
  return (
    <form div class="expense-container">
      <div class="total-expense">Total Expense: Php 2500</div>

      <div class="input-field">
        <label>Date: </label>
        <input type="date" />
      </div>

      <div class="input-field">
        <label>Expense Name:</label>
        <input type="text" />
      </div>

      <div class="input-field">
        <label>Expense Value (Php):</label>
        <input type="number" />
      </div>

      <button>Add Expense</button>
    </form>
  );
}
