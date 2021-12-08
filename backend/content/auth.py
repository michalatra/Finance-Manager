from flask import Blueprint, request, jsonify
import json

from content.dbBlueprints import User
from .database import users

def find_user(email):
    for user in users:
        if user.email == email:
            return user
    return False

auth = Blueprint('auth', __name__)
@auth.route('/auth/login', methods=['POST'])
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

@auth.route('/auth/register', methods=['POST'])
def register():
    data = json.loads(request.data)
    email = data['email']
    db_user = find_user(email)
    if db_user:
        return jsonify({"response": "userExists"})

    new_user = User(users[-1].id + 1, data['username'], data['email'], data['password'], data['name'], data['surname'])
    users.append(new_user)
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