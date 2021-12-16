from datetime import datetime
from flask import Blueprint, request, jsonify
import json

from datetime import datetime
from dbBlueprints import User, db
from main import registerBlueprint

auth = Blueprint('auth', __name__)
registerBlueprint(auth)

def find_user(email):
    return db.session.query(User).filter_by(email=email).first()

def add_user(data):
    user = User(username = data['username'], email = data['email'], password = data['password'], name = data['name'], surname = data['surname'], tokenExpiry = datetime.now())
    db.session.add(user)
    db.session.commit()

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

