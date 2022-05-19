import json

from pymongo import MongoClient

keys_file = open("keys/db.json")
keys = json.load(keys_file)

client = MongoClient(keys["uri"])
db=client.get_database("hockey-data")


def get_collection(name):
  return db.get_collection(name)