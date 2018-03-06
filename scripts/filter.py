from pymongo import MongoClient
from operator import itemgetter
import json
import config

client = MongoClient(f'mongodb+srv://erinkshaw:{config.mongo_db_pw}@turnstyle-hs7gg.mongodb.net/test')
db = client.mta.filteredTurns

dates = db.distinct('DATE')
stations = db.distinct('STATION')

def get_difference_stn_sorted():
  data = {}
  for station in stations:
    data[f'{station}'] = {}
    for date in dates:
      data[f'{station}'][f'{date}'] = {}
      times = sorted(db.find({'STATION': station, 'DATE': date}), key=itemgetter('TIME'))
      for i in range(len(times) - 1):
        time_span = f'{times[i]["TIME"]}-{times[i+1]["TIME"]}'
        data[f'{station}'][f'{date}'][f'{time_span}'] = abs(times[i+1]['ENTRIES'] - times[i]['ENTRIES'])
        print(data[f'{station}'][f'{date}'][f'{time_span}'])
  return data

if __name__ == '__main__':
  f = open("data.json","w+")
  f.write(json.dumps(get_difference_stn_sorted()))
  f.close()
