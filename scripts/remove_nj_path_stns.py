import json

def remove_nj_path_stns():
  data = json.load(open('../data_by_date.json'))
  remove = ['9TH STREET', 'LACKAWANNA', 'NEWARK BM BW', 'NEWARK C', 'NEWARK HM HE', 'NEWARK HW BMEBE', 'NEWARK HW BMEBE', 'PAVONIA/NEWPORT', 'THIRTY ST']
  for key, value in data.items():
    for stn in value:
      if stn['STATION'] in remove:
        print(stn["STATION"])
        value.remove(stn)
  return {k: v for k, v in data.items() if len(v) is not 0}


if __name__ == '__main__':
  f = open("../data_by_dates.json","w+")
  f.write(json.dumps(remove_nj_path_stns(), indent=4))
  f.close()

