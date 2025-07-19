import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WeatherApiResponse } from '../types/WeatherApiResponse';
import HourlyForecast from '../Component/HourlyForecast';
import FiveDayForecast from '../Component/FiveDayForecast';
import DefaultCityForecast from '../Component/DefaultCityForecast';
import Header from '../Component/Header';
import UnitToggle from '../Component/UnitToggle';
import CurrentWeatherDetails from '../Component/CurrentWeatherDetails';
import dayjs from 'dayjs';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
  country: string;
  lastUpdated: string;
  maxTemp: number;
  minTemp: number;
  humidity: number;
  wind: number;
  cloud: number;
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

const Home: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);


  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const convertTemp = (tempC: number) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherApiResponse>(
          `https://api.weatherapi.com/v1/forecast.json?key=866ed44e051449eabb5141757251807&q=Bangalore&days=5`
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


          maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
          minTemp: data.forecast.forecastday[0].day.mintemp_c,
          humidity: data.current.humidity,
          wind: data.current.wind_kph,
          cloud: data.current.cloud,
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
      <div className="App-body d-flex flex-grow-1">
        {/* -----------------------------------------------LEFT-SECTION------------------------------------------------ */}
        <div className="left-section col-lg-6 d-flex flex-column justify-content-between align-items-start">
          <div>
            {/* Head Section */}
            <Header />
            {/* Toggle Button */}
            <UnitToggle unit={unit} onToggle={setUnit} />
          </div>
          {/* Default City Forecast Details */}
          <DefaultCityForecast
            temp={convertTemp(weather.temp)}
            unit={unit}
            city={weather.city}
            lastUpdated={weather.lastUpdated}
            icon={weather.icon}
            description={weather.description}
          />
        </div>

        {/* -----------------------------------------------RIGHT-SECTION------------------------------------------------ */}
        <div className='right-section col-lg-6'>
          {/* Default City Forecast Details */}
          <CurrentWeatherDetails
            description={weather.description}
            maxTemp={convertTemp(weather.maxTemp)}
            minTemp={convertTemp(weather.minTemp)}
            temp={convertTemp(weather.temp)}
            icon={weather.icon}
            humidity={weather.humidity}
            cloud={weather.cloud}
            wind={weather.wind}
            city={weather.city}
            country={weather.country}
            unit={unit}
          />
          {/* Hourly Forecast */}
          <HourlyForecast
            hourlyData={weather.hourly.map((h) => ({
              ...h,
              temp: convertTemp(h.temp),
            }))}
            unit={unit}
          />
          {/* Five Day Forecast */}
          <FiveDayForecast
            forecast={weather.forecast.map((d) => ({
              ...d,
              maxTemp: convertTemp(d.maxTemp),
              minTemp: convertTemp(d.minTemp),
            }))}
            unit={unit}
          />
        </div>
      </div>
    </div>
  );
};


export default Home;