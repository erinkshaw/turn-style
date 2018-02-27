from pymongo import MongoClient
from data import data_convert
import config, datetime

client = MongoClient(f'mongodb+srv://erinkshaw:{config.mongo_db_pw}@turnstyle-hs7gg.mongodb.net/test')

db = client.mta

# returns a dict with original keys and data from txt
data_seed = data_convert()
keys = data_seed['keys']
data_seed = data_seed['data']

# raw conversion from txt file to db
def raw_data_db_seed():
  for line in data_seed:
    turns = dict(zip(keys, line))
    result = db.turns.insert_one(turns)
    print(f'succesfully created {result.inserted_id}...')

# Now let's make this data more usable
def filter_data_seed():
  dates = db.turns.distinct('DATE')
  stations = db.turns.distinct('STATION')
  for station in stations:
    for date in dates:
      for hour in range(24):
        if hour < 10:
          hour = f'0{hour}'
        station_turns_per_hour = db.turns.find({'STATION': station, 'DATE': date, 'TIME': {'$regex': f'^{hour}'}})
        if station_turns_per_hour.count():
          new_instance = { 'STATION': station, 'LINENAME': station_turns_per_hour[0]['LINENAME'], 'DATE': date, 'TIME': str(datetime.time(int(hour))), 'ENTRIES': 0, 'EXITS': 0 }
          for instance in station_turns_per_hour:
              new_instance['ENTRIES'] += int(instance['ENTRIES'])
              new_instance['EXITS'] += int(instance['EXITS'])
          result = db.filteredTurns.insert_one(new_instance)
          print(f'succesfully created {result.inserted_id}...')

filter_data_seed()

