from pymongo import MongoClient
from operator import itemgetter
import config

client = MongoClient(f'mongodb+srv://erinkshaw:{config.mongo_db_pw}@turnstyle-hs7gg.mongodb.net/test')
db = client.mta.filteredTurns

dates = db.distinct('DATE')
stations = db.distinct('STATION')

def get_difference_stn_sorted():
  data = {}
  for station in stations:
    for date in dates:
      times = sorted(db.find({'STATION': station, 'DATE': date}), key=itemgetter('TIME'))
      for i in range(len(times) - 1):
        data[f'{station}'][f'{date}'][times[i]] = times[i+1]['ENTRIES'] - times[i][ENTRIES]
  return data

