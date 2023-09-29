async function fetchWeather()  {
	const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London,Uk&APPID=32a0164c9773164342f1cd2352e0510a')
	const data = await response.json()

	if (response.ok === true) {
		return console.log(data.name)
	}
	throw new Error(response.error.message)
}

fetchWeather()

