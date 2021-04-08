from flask_mongoengine import MongoEngine
from application import *
# from flask_pymongo import PyMongo

db = MongoEngine()


class Player(db.Document):
    player_id = db.IntField(required=True, primary_key=True)
    name = db.StringField(required=True)
    team = db.StringField(required=True)
    price = db.IntField(required=True)
