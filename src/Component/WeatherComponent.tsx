import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WeatherApiResponse } from '../types/WeatherApiResponse';
import HourlyForecast from './HourlyForecast';
import FiveDayForecast from './FiveDayForecast';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
  country: string;
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


const WeatherComponent: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherApiResponse>(
          `https://api.weatherapi.com/v1/forecast.json?key=866ed44e051449eabb5141757251807&q=London&days=5`
        );

         console.log(response.data.forecast.forecastday[0].hour); 
        const data = response.data;
         console.log("---------------"+response.data); 
         console.log(response.data.forecast.forecastday[0].hour); 
        setWeather({
          temp: data.current.temp_c,
          description: data.current.condition.text,
          icon: data.current.condition.icon,
          city: data.location.name,
          country: data.location.country,

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
     <div className="weather-component">
      <div className="current-weather">
        <h2>{weather.city}, {weather.country}</h2>
        <img src={weather.icon} alt={weather.description} />
        <p>{weather.description}</p>
        <h3>{weather.temp}°C</h3>
      </div>
      <HourlyForecast hourlyData={weather.hourly} />
      <FiveDayForecast forecast={weather.forecast} />
    </div>
  );
};

export default WeatherComponent;