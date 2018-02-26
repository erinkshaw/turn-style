from pymongo import MongoClient
from pprint import pprint

import config

# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient(f'mongodb+srv://erinkshaw:{config.mongo_db_pw}@turnstyle-hs7gg.mongodb.net/test')
db=client.admin
# Issue the serverStatus command and print the results
serverStatusResult=db.command("serverStatus")
pprint(serverStatusResult)
