from .dbBlueprints import User, Expense, Saving, Goal

users = [User(0, "test", "test@test.com", "1234", "TestName", "TestSurname", weeklyBudget=1000, monthlyBudget=5000, totalSavings=1000)]
expenses = [Expense(0, 0, "TestExpense", 120, "electronics"), Expense(1, 1, "TestExpense", 120, "fees"), Expense(2, 0, "TestExpense2", 189, "fees")]
savings = []
goals = []