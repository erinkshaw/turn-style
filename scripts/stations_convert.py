
import csv, json

# convert to csv to geojson
def stations_convert():
  f = open("../stations.csv")
  csv_f = csv.reader(f)
  geo_json = { "type": "FeatureCollection",
  "features": [] }
  for row in csv_f:
    station = f"{row[2]} {row[3]}"
    coord = [float(row[6]), float(row[5])]
    print(geo_json["features"])
    if not any(stn["properties"]["STATION"] == station for stn in geo_json["features"]):
      new_stn = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": coord
        },
      "properties": {
        "STATION": station,
        }
      }
      geo_json["features"].append(new_stn)
  return geo_json

if __name__ == '__main__':
  f = open("../stations.json","w+")
  f.write(json.dumps(stations_convert(), indent=4))
  f.close()

