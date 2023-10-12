const form = document.getElementById('form')
const city = document.getElementById('city')

const cityNameH1 = document.querySelector('.city-name-title')
const cityTempDiv = document.querySelector('.city-main-temp')
const cityTempMinDiv = document.querySelector('.city-main-temp__lower')
const cityTempMaxDiv = document.querySelector('.city-main-temp__higher')
const cityHumidityDiv = document.querySelector('.city-data-humidity')
const cityDataWindDiv = document.querySelector('.city-data-wind')
const cityDataWeatherDiv = document.querySelector('.city-data-weather')
const cityDataSunriseDiv = document.querySelector('.city-data-sunrise')
const cityDataSunsetDiv = document.querySelector('.city-data-sunset')

let search = ''

async function fetchWeather()  {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=2299dd8ec1972b3a624c1f47fea1b755&units=metric`)
	const data = await response.json()

	if (response.ok === true) {
		return updateDisplay(data)
	}
	throw new Error(response.error.message)
}

const getDate = (dt, timezone) => {
	const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
	const utc_milliseconds = utc_seconds * 1000;
	const local_date = new Date(utc_milliseconds).toUTCString();
	return local_date;
}

const updateDisplay = (data) => {
	let diff = data.timezone * 1000
	let sunrise = new Date(data.sys.sunrise * 1000 + diff)
	let sunset = new Date(data.sys.sunset * 1000 + diff)
	let sunriseTime = z(sunrise.getUTCHours()) + ':' + z(sunrise.getUTCMinutes())
	let sunsetTime = z(sunset.getUTCHours()) + ':' + z(sunset.getUTCMinutes())

	cityNameH1.innerText = data.name
	cityTempDiv.innerText = Math.round(data.main.temp)
	cityTempMinDiv.innerText = 'min: ' + Math.round(data.main.temp_min)
	cityTempMaxDiv.innerText = 'max: ' + Math.round(data.main.temp_max)
	cityHumidityDiv.innerText = data.main.humidity + '%'
	cityDataWindDiv.innerText = data.wind.speed
	cityDataWeatherDiv.innerText = data.weather[0].description
	cityDataSunriseDiv.innerText = sunriseTime
	cityDataSunsetDiv.innerText = sunsetTime
}

form.addEventListener('submit', (e) => {
	e.preventDefault()
	return fetchWeather(search)
})

city.addEventListener('input', (e) => {
	e.preventDefault()
	search = e?.target.value
})

function z(n) {
	return ('0' + n).slice(-2);
}

fetchWeather(search = 'Paris')

