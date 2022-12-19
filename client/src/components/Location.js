import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Location.css';

function Location() {

  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [averageMinTemp, setAverageMinTemp] = useState(0);
  const [averageMaxTemp, setAverageMaxTemp] = useState(0);

  let { id } = useParams();


  useEffect(() => {
    const getLocation = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`http://localhost:3001/locations/${id}`);
        const totalMaxTemperatures = data.weatherData.reduce((total, day) => total += parseInt(day.temperature_2m_max), 0);
        const totalMinTemperatures = data.weatherData.reduce((total, day) => total += parseInt(day.temperature_2m_min), 0);
        setAverageMinTemp(Math.round(totalMinTemperatures / data.weatherData.length));
        setAverageMaxTemp(Math.round(totalMaxTemperatures / data.weatherData.length));
        
        setWeatherData(data.weatherData);
        setLocation(data.location);
      } catch (err) {
        toast.error('Failed to load location weather data')
      }
      setLoading(false)
    }

    getLocation();
  }, [id]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="Location">
      {loading ? <div className='Loading'>Loading...</div> : (weatherData.length ?
        <div>
          <Link className='HomeButton' to={'/'}>Go Back To Home</Link>
          <div className='LocationDetails'>{capitalizeFirstLetter(location)}</div>
          <div className='Today'>
            <div className='TodayTime'>
              Average temperatures of the week
            </div>
            <div className='TodayTemps'>
              <span className='TodayTemp TodayMinTemp'>{averageMinTemp}</span>
              <span className='TodayTemp TodayMaxTemp'>{averageMaxTemp}</span>
            </div>
          </div>
          <div className='LocationDays'>
            {weatherData.map(item =>
            (
              <div className='LocationDay' key={item.time}>
                <div className='DayTime'>
                  {item.time}
                </div>
                <div className='DayWeatherIcon'>
                  {item.rain ? <img alt='Rain' width={50} src={require('../assets/rain.png')} /> : <img width={50} alt='Sun' src={require('../assets/sun.png')} />}
                </div>
                <div className='DayTemps'>
                  <span className='DayTemp DayMinTemp'>{item.temperature_2m_min}</span>
                  <span className='DayTemp DayMaxTemp'>{item.temperature_2m_max}</span>
                </div>
              </div>
            ))}
          </div>
        </div> : <div className='NoData'>No Weather Data, please enter a valid location</div>
      )}
    </div>
  );
}

export default Location;
