import json

def remove_citybus_stn():
  data = json.load(open('../data_by_date.json'))

  for key, value in data.items():
    for stn in value:
      if stn['STATION'] == "CITY / BUS":
        value.remove(stn)
  return data


  # filter out any values that have station city / bus


if __name__ == '__main__':
  f = open("../data_by_dates.json","w+")
  f.write(json.dumps(remove_citybus_stn(), indent=4))
  f.close()
