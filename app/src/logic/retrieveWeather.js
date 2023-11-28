import getSeason from "./helpers/getSeason"

export default async function retrieveWeather(lat, lng) {
    if (typeof lat !== 'number') throw new Error('Latitude is not a number')
    if (typeof lng !== 'number') throw new Error('Longitud is not a number')

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)

    if (!res.ok) throw new Error('Error connecting to weather API')

    const fullData = await res.json()

    let { main: { humidity, temp, temp_max, temp_min }, wind: { speed }, sys: { country } } = fullData

    temp = Math.round(temp)
    temp_max = Math.round(temp_max)
    temp_min = Math.round(temp_min)
    speed = Math.round(speed)

    return {
        country,
        temp,
        tempMax: temp_max,
        tempMin: temp_min,
        humidity,
        wind: speed,
        season: getSeason(lat)
    }
} 