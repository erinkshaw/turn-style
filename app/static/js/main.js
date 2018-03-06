



$( document ).ready(function() {
  let date = '02/17/2018'
  let time = '03:00:00'

  $.ajax(`/api/${date}/${time}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.forEach(stationData => {
        const large = el =>  {document.getElementsByClassName(stationData.STATION)[0].style.fontSize = "100"}
        setInterval(() => large(stationData), 3000)
      })
    })
});
