from pymongo import MongoClient
from data import data_convert
import config

client = MongoClient(f'mongodb+srv://erinkshaw:{config.mongo_db_pw}@turnstyle-hs7gg.mongodb.net/test')

db = client.mta

data_seed = data_convert()

keys = data_seed['keys']

data_seed = data_seed['data']

for line in data_seed:
  turns = dict(zip(keys, line))
  result = db.turns.insert_one(turns)
  print(f'succesfully created {result.inserted_id}...')

