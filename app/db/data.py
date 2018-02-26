
def data_convert():
  turn_data = open('turnstile_180224.txt', 'r')
  data_arr = [line.rstrip().split(',') for line in turn_data.readlines()]
  keys = data_arr[0]
  data_arr = data_arr[1:]
  return {'keys': keys, 'data': data_arr}
