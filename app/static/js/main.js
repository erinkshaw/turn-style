
const mtaPantone = {
  A: '#0039A6',
  C: '#0039A6',
  E: '#0039A6',
  B: '#FF6319',
  D: '#FF6319',
  F: '#FF6319',
  M: '#FF6319',
  G: '#6CBE45',
  J: '#996633',
  Z: '#996633',
  L: '#A7A9AC',
  N: '#FCCC0A',
  Q: '#FCCC0A',
  R: '#FCCC0A',
  S: '#808183',
  1: '#EE352E',
  2: '#EE352E',
  3: '#EE352E',
  4: '#00933C',
  5: '#00933C',
  6: '#00933C',
  7: '#B933AD'
}
console.log('hi')
fetch('/data/stations')
  .then(blob => blob.json())
  .then(console.log)

fetch('/data/data_by_date')
  .then(blob => blob.json())
  .then(console.log)
