
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

const mtaPantoneClassNames = {
  A: 'ACE',
  C: 'ACE',
  E: 'ACE',
  B: 'BDFM',
  D: 'BDFM',
  F: 'BDFM',
  M: 'BDFM',
  G: 'G',
  J: 'JZ',
  Z: 'JZ',
  L: 'L',
  N: 'NQRW',
  Q: 'NQRW',
  R: 'NQRW',
  W: 'NQRW',
  S: 'S',
  1: '_123',
  2: '_123',
  3: '_123',
  4: '_456',
  5: '_456',
  6: '_456',
  7: '_7'
}

let stations = {}

fetch('/data/stations')
  .then(blob => blob.json())
  .then(geoStns => {
    stations = geoStns
    stations.features.forEach(function(marker) {
      const station = marker.properties.STATION.slice(-1)
      const color = mtaPantoneClassNames[station]
      var el = document.createElement('div')
      el.className = `marker ${color}`
      el.id = marker.properties.STATION
      el.style.backgroundColor = mtaPantone[station]

      new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map)
    })
  })

fetch('/data/data_by_date')
  .then(blob => blob.json())
  .then(console.log)

const mapAccessToken = 'pk.eyJ1IjoiZXJpbmtzaGF3IiwiYSI6ImNqZTNlZ3ZqcjY3YmoycXFwMjR1bGNzZnYifQ.qoC7ahENl1v7ArdJmR1ExA'

mapboxgl.accessToken = mapAccessToken
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/erinkshaw/cjf8kz9zp3vjd2rmkitwo1f7r',
    center: [-73.857, 40.742],
    zoom: 10.1
})
