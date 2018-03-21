
import csv, json

def stations_convert():
  f = open('../stations.csv')
  csv_f = csv.reader(f)
  stn_locs = {}
  for row in csv_f:
    station = f'{row[2]} {row[3]}'
    coord = [row[5], row[6]]
    if station not in stn_locs:
      stn_locs[station] = coord
  return stn_locs

if __name__ == '__main__':
  f = open("../stations.json","w+")
  f.write(json.dumps(stations_convert(), indent=4))
  f.close()

