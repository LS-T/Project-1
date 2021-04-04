console.log("Hello world!");
apiKey = "1ebd3e88b4147deeadc030e6248c294d";
var city = "Atlanta";
var lat = 33.7;
var lon = -84.3;
var temp = $("#temp");
var humid = $("#humid");

function getWeatherApi() {
  var requestURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly&units=imperial&appid=" +
    apiKey;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (var i = 0; i < data.daily.length; i++) {
        console.log(data.daily[i]);
        var iconUrl = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
        $(`#daytemp${i}`).text("Day: " + data.daily[i].temp.day + " °F ");
        $(`#nighttemp${i}`).text("Night: " + data.daily[i].temp.night + " °F ");
        var img = $(`<img id="wicon${i}" alt="weather icon" width="75px">`);
        img.attr("src", iconUrl);
        $(`#icon${i}`).append(img);
        $(`#card${i}`).attr("condition", data.daily[i].weather[0].main);
        console.log(moment.unix(data.daily[i].dt).format("MM D YYYY"));
        $(`#date${i}`).text(moment.unix(data.daily[i].dt).format("MM" + "/" + "D" + "/" + "YYYY"));
      }

      
      var dayCondition = {
        condition: [data.daily[0].weather[0].main, data.daily[1].weather[0].main,
        data.daily[2].weather[0].main, data.daily[3].weather[0].main,data.daily[4].weather[0].main, data.daily[5].weather[0].main,
        data.daily[6].weather[0].main, data.daily[7].weather[0].main,]
        
      
      }
      
      


      for(var i=0; i<dayCondition.condition.length; i++){
        if (dayCondition.condition[i] === "Clear" || dayCondition.condition[i] === "Clouds"){
          console.log("yes");
          $(`.border${i}`).addClass("border-success");
        } else if (dayCondition.condition[i] === "Thunderstorm" || dayCondition.condition[i] === "Rain") {
          console.log("else if")
          $(`.border${i}`).addClass("border-danger")
        } else if(dayCondition.condition[i] === "Drizzle" || dayCondition.condition[i] === "Fog" || dayCondition.condition[i] === "Snow"){
          console.log("warning")
          $(`.border${i}`).addClass("border-warning");
        }
      }


      
    });
}
var liEl = $('<div><li class="listItem"><button id="select"></button></li></div>')
$(".header").append(liEl);


$(".card").on("click", function () {
  console.log($(this).attr("condition"));
  // $(".container").empty();
  
});

getWeatherApi()
