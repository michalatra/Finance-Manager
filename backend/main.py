from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///finance.db'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(50))
    name = db.Column(db.String(100), default="")
    surname = db.Column(db.String(100), default="") 
    budgetModel = db.Column(db.String(30), default="monthly")
    weeklyBudget = db.Column(db.Integer, default=0)
    monthlyBudget = db.Column(db.Integer, default=0)
    language = db.Column(db.String(20), default="polish")
    currency = db.Column(db.String(10), default="PLN")
    totalSavings = db.Column(db.Integer, default=0)
    tokenExpiry = db.Column(db.DateTime)
    lastToken = db.Column(db.String(100), default="")

class Expense(db.Model):
    __tablename__ = 'expenses'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(100))
    value = db.Column(db.Integer)
    type = db.Column(db.String(20))
    creationDate = db.Column(db.DateTime)

db.create_all()



def find_user(email):
    return db.session.query(User).filter_by(email=email).first()

def find_user_by_id(userId):
    return db.session.query(User).filter_by(id=userId).first()

def add_user(data):
    user = User(username = data['username'], email = data['email'], password = data['password'], name = data['name'], surname = data['surname'], tokenExpiry = datetime.now())
    db.session.add(user)
    db.session.commit()

def update_user_account(user, userData):
    print('hello')

    user.name = userData['name']
    user.surname = userData['surname']
    user.username = userData['username']
    user.email = userData['email']
    db.session.commit()

def update_user_settings(user, userData):
    print('hello')
    user.budgetModel = userData['budgetModel']
    user.weeklyBudget = int(userData['weeklyBudget'])
    user.monthlyBudget = int(userData['monthlyBudget'])
    user.currency = userData['currency']
    user.language = userData['language']
    print(userData)
    db.session.commit()

def find_expense(expenseId):
    return db.session.query(Expense).filter_by(id=expenseId).first()

def find_expenses(userId):
    expenses =  db.session.query(Expense).filter_by(userId=userId).all()
    expenseObjects = []
    for expense in expenses:
        expenseObjects.append({"id": expense.id, "userId": expense.userId, "name": expense.name, "value": expense.value, "type": expense.type})
    return expenseObjects

def add_expense(data):
    expense = Expense(userId = int(data['userId']), name = data['expenseName'], value = int(data['expenseValue']), type=data['expenseType'], creationDate = datetime.now())
    db.session.add(expense)
    db.session.commit()
    return expense.id

def delete_expense(expenseId):
    db.session.query(Expense).filter_by(id=expenseId).delete()
    db.session.commit()

@app.route('/auth/login', methods=['POST'])
def login():
    data = json.loads(request.data)
    email = data['email']
    db_user = find_user(email)

    if db_user: 
        password = data['password']
        if db_user.password == password:
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
            return jsonify({"response": "logged", "user": db_user})
        else:
            return jsonify({"response": "wrongPassword"})
    else:
        return jsonify({"response": "userNotFound"})


@app.route('/auth/register', methods=['POST'])
def register():
    data = json.loads(request.data)
    email = data['email']
    db_user = find_user(email)
    if db_user:
        return jsonify({"response": "userExists"})

    add_user(data)
    new_user = find_user(data['email'])
    db_user = {
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "name": new_user.name,
        "surname": new_user.surname,
        "budgetModel": new_user.budgetModel,
        "weeklyBudget": new_user.weeklyBudget,
        "monthlyBudget": new_user.monthlyBudget,
        "language": new_user.language,
        "currency": new_user.currency,
        "totalSavings": new_user.totalSavings,
        "lastToken": new_user.lastToken,
    }
    return jsonify({"response": "success", "user": db_user})

@app.route('/api/expenses', methods=['GET'])
def getExpenses():
    data = request.values
    userId = int(data['userId'])
    expensesFound = find_expenses(userId)
    return jsonify({"response": "success", "expenses": expensesFound})

@app.route('/api/expenses', methods=['POST'])
def addExpense():
    data = json.loads(request.data)
    userId = int(data['userId'])
    expenseId = add_expense(data)
    expense = find_expense(expenseId)
    return jsonify({"response": "success", "expense": {"id": expense.id, "userId": expense.userId, "name": expense.name, "value": expense.value, "type": expense.type}})

@app.route('/api/expenses', methods=['DELETE'])
def deleteExpense():
    data = json.loads(request.data)
    userId = int(data['userId'])
    expenseId = int(data['expenseId'])
    delete_expense(expenseId)
    return jsonify({"response": "success"})

@app.route('/api/account', methods=['POST'])
def updateUserAccount():
    data = json.loads(request.data)
    userId = int(data['userId'])
    db_user = find_user_by_id(userId)
    if db_user:
        update_user_account(db_user, data)
        return jsonify({"response": "success"})
    return jsonify({"response": "error"})

@app.route('/api/settings', methods=['POST'])
def updateUserSettings():
    data = json.loads(request.data)
    userId = int(data['userId'])
    db_user = find_user_by_id(userId)
    print(db_user)
    if db_user:
        update_user_settings(db_user, data)
        return jsonify({"response": "success"})
    return jsonify({"response": "error"})


if __name__ == "__main__":
    app.run()