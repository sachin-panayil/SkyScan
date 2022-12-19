import axios from 'axios';

export async function fetchWeather(long, lat) {
  try {
    const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const apiString = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_hours&timezone=EST`;
    const { data } = await axios.get(apiString);
    const weatherData = [];
    data.daily.time.forEach(time => {
      weatherData.push({ time });
    });
    for (let i = 0; i < data.daily.temperature_2m_max.length; i++) {
      weatherData[i].temperature_2m_max = (data.daily.temperature_2m_max[i] * 1.8 + 32).toFixed(0);
    }
    for (let i = 0; i < data.daily.temperature_2m_max.length; i++) {
      weatherData[i].temperature_2m_min = (data.daily.temperature_2m_min[i] * 1.8 + 32).toFixed(0);
    }
    for (let i = 0; i < data.daily.precipitation_hours.length; i++) {
      weatherData[i].rain = !!data.daily.precipitation_hours[i];
    }
    for (let i = 0; i < data.daily.precipitation_hours.length; i++) {
      weatherData[i].weekDay = weekDays[new Date(weatherData[i].time).getDay()];
    }
    return weatherData;
  } catch (err) {
    throw err;
  }
}

export async function getLocationLongLat(name) {
  try {
    const apiString = `http://api.positionstack.com/v1/forward?access_key=db36c6a741bdee49b5d0166447c051b2&query=${name}`;
    const { data } = await axios.get(apiString);

    return data.data[0]
  } catch (err) {
    throw err;
  }
}