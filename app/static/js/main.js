console.log('hi')
fetch('/data/stations')
  .then(blob => blob.json())
  .then(console.log)

fetch('/data/data_by_date')
  .then(blob => blob.json())
  .then(console.log)
