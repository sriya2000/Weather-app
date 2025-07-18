import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { WeatherApiResponse } from './types/WeatherApiResponse';
import HourlyForecast from './Component/HourlyForecast';
import FiveDayForecast from './Component/FiveDayForecast';
import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// import localizedFormat from 'dayjs/plugin/localizedFormat';
// import weekday from 'dayjs/plugin/weekday';


interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
  country: string;
  lastUpdated: string;
  hourly: {
    time: string;
    temp: number;
    condition: string;
    icon: string;
  }[];
  forecast: {
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
  }[];
}

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherApiResponse>(
          `https://api.weatherapi.com/v1/forecast.json?key=866ed44e051449eabb5141757251807&q=Noida&days=5`
        );

        const data = response.data;
        console.log("Data >>>>>", data);
        console.log(data.forecast.forecastday[0].hour);
        setWeather({
          temp: data.current.temp_c,
          description: data.current.condition.text,
          icon: data.current.condition.icon,
          city: data.location.name,
          country: data.location.country,
          lastUpdated: dayjs(data.current.last_updated).format("HH:mm - dddd, D MMM 'YY"),

          // Hourly for today (day 1)
          hourly: data.forecast.forecastday[0].hour.map((hour: any) => ({
            time: hour.time,
            temp: hour.temp_c,
            condition: hour.condition.text,
            icon: hour.condition.icon,
          })),

          // 5-day forecast (high/low/icon)
          forecast: data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            condition: day.day.condition.text,
            icon: day.day.condition.icon,
          })),
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }


  return (
    <div className="App">
      <div className='d-flex'>
        <div className="left-section col-lg-6 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex flex-column mb-4">
              <p className="display-4 logo">WW⚡</p>
              {/* <input className="form-control search-bar" type="text" placeholder="Search by City" /> */}
              <div className="container my-4">
                <form className="d-flex position-relative">
                  <input
                    className="form-control ps-5 py-2 rounded-pill"
                    type="search"
                    // placeholder="Search weather, city, or forecast..."
                    placeholder="Search by City"
                    aria-label="Search"
                  />
                  <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                    <i className="bi bi-search"></i>
                  </span>
                </form>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center text-white">
            {/* Temperature */}
            <h1 className="display-2 me-2">{weather.temp}&deg;</h1>

            {/* City + Last Updated (Formatted) */}
            <div>
              <span className="fs-2">{weather.city}</span>
              <p className="fs-6">{weather.lastUpdated}</p>
            </div>
            {/* Icon */}
            <img className='weather-icon' src={weather.icon} alt={weather.description} />
          </div>

        </div>

        <div className='right-section col-lg-6'>
          <HourlyForecast hourlyData={weather.hourly} />
          <FiveDayForecast forecast={weather.forecast} />
        </div>
        
      </div>

    </div>
  );
};


export default App;
