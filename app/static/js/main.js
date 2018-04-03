
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

let stations = {}

let data = []
console.log(Date(), 'run start')
fetch('/data/stations')
  .then(blob => blob.json())
  .then(geoStns => {
    stations = geoStns
    console.log(Date(), 'stations')
    stations.features.forEach(function(marker) {
      const station = marker.properties.STATION.slice(-1)
      const el = document.createElement('div')
      el.className = `marker`
      el.id = marker.properties.STATION.split(' ').join('')
      el.style.backgroundColor = mtaPantone[station]

      new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map)
    })
  })

fetch('/data/data_by_date')
  .then(blob => blob.json())
  .then(turnstileData => {
    console.log(Date(), 'data')
    data = turnstileData
    const dates = Object.keys(data).sort()
    function next(counter, maxLoops) {
      // reset if maxLoops has been reached
      if (counter++ === maxLoops) counter = 0

      const dateDiv = document.querySelector('#date-time')
      const makeDate = new Date(dates[counter])
      const date = dates[counter]
      dateDiv.textContent = `${makeDate.toString().slice(0, -18)}`

      data[date].forEach(stn => {
        const stnEl = document.getElementById(`${stn.STATION.split(' ').join('')}${stn.LINENAME}`)
        if (stnEl) {
          const growSize = getGrowth(stn.ENTRY_INTERVAL)
          if (growSize) stnEl.classList.add(growSize)
        }
      })
      setTimeout(() => { next(counter, maxLoops)}, 500)
    }
    next(0, dates.length)
  })

const mapAccessToken = 'pk.eyJ1IjoiZXJpbmtzaGF3IiwiYSI6ImNqZTNlZ3ZqcjY3YmoycXFwMjR1bGNzZnYifQ.qoC7ahENl1v7ArdJmR1ExA'

mapboxgl.accessToken = mapAccessToken
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/erinkshaw/cjf8kz9zp3vjd2rmkitwo1f7r',
    center: [-73.857, 40.742],
    zoom: 10.6
})

function getGrowth(num) {
  if (num <= 0) return;
  else if (num >= 1 && num <= 50) return 'xxsmall'
  else if (num >= 51 && num <= 100) return 'xsmall'
  else if (num >= 101 && num <= 150) return 'small'
  else if (num >= 151 && num <= 250) return 'medium'
  else if (num >= 251 && num <= 500) return 'large'
  else if (num >= 501 && num <= 1000) return 'xlarge'
  else return 'xxlarge'
}

function transitionEnd(event) {
  if (event.propertyName !== 'width') return;
  const classes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']
  classes.forEach(className => {
    if (event.target.classList.contains(className)) {
      event.target.classList.remove(className)
    }
  })
}

window.addEventListener('transitionend', transitionEnd)

