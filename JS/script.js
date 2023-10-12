// weather API
const apiKey = "609d5f0faaa2da448bcc00209ffc7919";
const unit = "metric";
let currentCity = "Tehran";
// selectors
const body = document.querySelector("body");
const searchBox = document.querySelector(".search-box > input");
const cityName = document.querySelector(".weather-heading");
const countryName = document.querySelector(".country");
const temp = document.querySelector(".weather-degree");
const lat = document.querySelector(".lat");
const lon = document.querySelector(".lon");
const max = document.querySelector(".temp-max");
const min = document.querySelector(".temp-min");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");
const windSpeed = document.querySelector(".speed");
const weatherCondition = document.querySelector(".weather-condition > h3");
const weatherIcon = document.querySelector(".weather-icon");
const date = document.querySelector(".weather-date");
// toggle selector
const toggleBtn = document.querySelector(".toggle-circle");
// Events
body.addEventListener("load", getInfo);
searchBox.addEventListener("keyup", (e) => {
  currentCity = searchBox.value;
  if (currentCity != " " && e.keyCode == 13) {
    cityName.innerHTML = `${currentCity.toUpperCase()}`;
    searchBox.focus();
    getInfo();
  }
});
toggleBtn.addEventListener("click", activeDarkTheme);

// Functions
function getInfo(e) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${unit}`
  )
    .then((res) => res.json())
    .then((data) => {
      cityName.innerHTML = `${currentCity.toUpperCase()}`;
      countryName.innerHTML = convertCountryCode(data.sys.country);
      temp.innerHTML = `${Math.round(data.main.temp)}&#176`;
      lat.innerHTML = `lat :${data.coord.lat}`;
      lon.innerHTML = `lon :${data.coord.lon}`;
      max.innerHTML = `Highest :${data.main.temp_max.toFixed()}°`;
      min.innerHTML = `Lowest : ${data.main.temp_min.toFixed()}°`;
      humidity.innerHTML = `${data.main.humidity}%`;
      visibility.innerHTML = `Visibility : ${data.visibility}`;
      windSpeed.innerHTML = `${data.wind.speed}m/s`;
      weatherCondition.innerHTML = `${data.weather[0].main}`;
      weatherIcon.innerHTML = `<img src=" https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;
    });
}
// not a custom function
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}
// custom functions
let dateGenerator = () => {
  let d = new Date();

  let fullDate = d.toLocaleDateString();
  console.log(fullDate);
  date.innerHTML = `${fullDate}`;
};
dateGenerator();
function activeDarkTheme() {
  toggleBtn.classList.toggle("dark-mode");
  date.classList.toggle("dark-mode");
  document.querySelector("body").classList.toggle("dark-mode");
  document.querySelector("nav").classList.toggle("dark-mode");
  document
    .querySelector(".nav-list > li:first-child")
    .classList.toggle("dark-mode");
  const headings = document.querySelectorAll(".weather-heading");
  for (let i = 0; i < headings.length; i++) {
    headings[i].classList.toggle("dark-mode");
  }
  document
    .querySelector(".weather__today-container")
    .classList.toggle("dark-mode");
  temp.classList.toggle("dark-mode");
  document
    .querySelector(".weather-condition > h3")
    .classList.toggle("dark-mode");
  document.querySelector(".wind-container").classList.toggle("dark-mode");
  document.querySelector(".humidity-container").classList.toggle("dark-mode");
  document.querySelector(".others").classList.toggle("dark-mode");
  document
    .querySelector(".humidity-container > p")
    .classList.toggle("dark-mode");
  document.querySelector(".wind-container > p").classList.toggle("dark-mode");
  document.querySelector(".others-list").classList.toggle("dark-mode");
  document.querySelector(".humidity").classList.toggle("dark-mode");
  document.querySelector(".speed").classList.toggle("dark-mode");
}
