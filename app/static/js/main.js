
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

mapAccessToken = 'pk.eyJ1IjoiZXJpbmtzaGF3IiwiYSI6ImNqZTNlZ3ZqcjY3YmoycXFwMjR1bGNzZnYifQ.qoC7ahENl1v7ArdJmR1ExA'

mapboxgl.accessToken = mapAccessToken
var map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/dark-v9",
    // 'mapbox://styles/erinkshaw/cjf8kz9zp3vjd2rmkitwo1f7r',
    center: [-73.9500, 40.770],
    zoom: 10.3
})
