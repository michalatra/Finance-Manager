from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
import db

db = SQLAlchemy(main.app)

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

db.create_all()


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
