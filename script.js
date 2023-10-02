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

const updateDisplay = (data) => {
	let sunriseDate = new Date(data.sys.sunrise * 1000)
	let sunsetDate = new Date(data.sys.sunset * 1000)

	cityNameH1.innerText = data.name
	cityTempDiv.innerText = data.main.temp
	cityTempMinDiv.innerText = 'min: ' + data.main.temp_min
	cityTempMaxDiv.innerText = 'max: ' + data.main.temp_max
	cityHumidityDiv.innerText = data.main.humidity + '%'
	cityDataWindDiv.innerText = data.wind.speed
	cityDataWeatherDiv.innerText = data.weather[0].description
	cityDataSunriseDiv.innerText = sunriseDate.getHours() + 'h' + (sunriseDate.getMinutes() < 10 ? '0' : '') + sunriseDate.getMinutes()
	cityDataSunsetDiv.innerText = sunsetDate.getHours() + 'h' + (sunsetDate.getMinutes() < 10 ? '0' : '') + sunsetDate.getMinutes()
}

form.addEventListener('submit', (e) => {
	e.preventDefault()
	return fetchWeather(search)
})

city.addEventListener('input', (e) => {
	e.preventDefault()
	search = e?.target.value
})

fetchWeather(search = 'London')

