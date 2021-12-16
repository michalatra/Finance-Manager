from os import remove
from flask import Blueprint, request, jsonify
import json
from dbBlueprints import Expense, db, User
from database import expenses, savings, goals
from main import registerBlueprint

api = Blueprint("api", __name__)
registerBlueprint(api)

def find_user(id):
    return db.session.query(User).filter_by(id=id).first()

def findExpenses(userId):
    expensesFound = []
    for expense in expenses:
        if expense.userId == userId:
            expensesFound.append({
                "id": expense.id,
                "userId": expense.userId,
                "name": expense.name,
                "value": expense.value,
                "type": expense.type,
                })
    return expensesFound

def deleteExpenseFromDatabase(expenseId):
    for expense in expenses:
        if expense.id == expenseId:
            expenses.remove(expense)
            return

@api.route('/api/expenses', methods=['GET'])
def getExpenses():
    data = request.values
    userId = int(data['userId'])
    expensesFound = findExpenses(userId)
    return jsonify({"response": "success", "expenses": expensesFound})

@api.route('/api/expenses', methods=['POST'])
def addExpense():
    data = json.loads(request.data)
    userId = int(data['userId'])
    newExpense = Expense(1 or expenses[-1].id+1, int(userId), data['expenseName'], int(data['expenseValue']), data['expenseType'])
    expenses.append(newExpense)
    return jsonify({"response": "success", "expense": {"id": newExpense.id, "userId": newExpense.userId, "name": newExpense.name, "value": newExpense.value, "type": newExpense.type}})

@api.route('/api/expenses', methods=['DELETE'])
def deleteExpense():
    data = json.loads(request.data)
    userId = int(data['userId'])
    expenseId = int(data['expenseId'])
    deleteExpenseFromDatabase(expenseId)
    return jsonify({"response": "success"})

@api.route('/api/account', methods=['POST'])
def updateUserAccount():
    data = json.loads(request.data)
    userId = int(data['userId'])
    db_user = find_user(userId)
    if db_user:
        db_user.name = data['name']
        db_user.surname = data['surname']
        db_user.username = data['username']
        db_user.email = data['email']
        db_user = {
            "id": db_user.id, 
            "username": db_user.username, 
            "email": db_user.email, 
            "name": db_user.name, 
            "surname": db_user.surname, 
            "budgetModel": db_user.budgetModel, 
            "weeklyBudget": db_user.weeklyBudget, 
            "monthlyBudget": db_user.monthlyBudget, 
            "language": db_user.language, 
            "currency": db_user.currency,
            "totalSavings": db_user.totalSavings,
            "lastToken": db_user.lastToken,
        }
        return jsonify({"response": "success"})
    return jsonify({"response": "error"})

@api.route('/api/settings', methods=['POST'])
def updateUserSettings():
    data = json.loads(request.data)
    userId = int(data['userId'])
    db_user = find_user(userId)
    if db_user:
        db_user.budgetModel = data['budgetModel']
        db_user.weeklyBudget = int(data['weeklyBudget'])
        db_user.monthlyBudget = int(data['monthlyBudget'])
        db_user.currency = data['currency']
        db_user.language = data['language']
        db_user = {
            "id": db_user.id, 
            "username": db_user.username, 
            "email": db_user.email, 
            "name": db_user.name, 
            "surname": db_user.surname, 
            "budgetModel": db_user.budgetModel, 
            "weeklyBudget": db_user.weeklyBudget, 
            "monthlyBudget": db_user.monthlyBudget, 
            "language": db_user.language, 
            "currency": db_user.currency,
            "totalSavings": db_user.totalSavings,
            "lastToken": db_user.lastToken,
        }
        return jsonify({"response": "success"})
    return jsonify({"response": "error"})
