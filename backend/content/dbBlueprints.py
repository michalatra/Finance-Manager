from datetime import datetime


class User:
    def __init__(self, id, username, email, password, name="", surname="", budgetModel="monthly", weeklyBudget=0, monthlyBudget=0, language="polish", currency="PLN", totalSavings=0, lastToken = ""):
        self.id = id
        self.username = username
        self.email = email
        self.password = password
        self.name = name
        self.surname = surname
        self.budgetModel = budgetModel
        self.weeklyBudget = weeklyBudget
        self.monthlyBudget = monthlyBudget
        self.language = language
        self.currency = currency
        self.totalSavings = totalSavings
        self.tokenExpiry = datetime.now()
        self.lastToken = lastToken


class Expense:
    def __init__(self, id, userId, name, value, type):
        self.id = id
        self.userId = userId
        self.name = name
        self.value = value
        self.type = type
        self.date = datetime.now()


class Saving:
    def __init__(self, id, userId, value):
        self.id = id
        self.userId = userId
        self.value = value


class Goal:
    def __init__(self, id, userId, name, currentValue, goalValue):
        self.id = id
        self.userId = userId
        self.name = name
        self.currentValue = currentValue
        self.goalValue = goalValue
