import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import HourlyForecast from '../Component/HourlyForecast';
import FiveDayForecast from '../Component/FiveDayForecast';
import DefaultCityForecast from '../Component/DefaultCityForecast';
import UnitToggle from '../Component/UnitToggle';
import { WeatherApiResponse } from '../types/WeatherApiResponse';
import Header from '../Component/Header';

const CityWeather:React.FC = ()=> {

  const { cityName } = useParams<{ cityName: string }>();
  const [weather, setWeather] = useState<any>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const convertTemp = (tempC: number) => unit === 'C' ? tempC : (tempC * 9) / 5 + 32;

  useEffect(() => {
    if (!cityName) return;
    const fetchWeather = async () => {
      try {
          const response = await axios.get<WeatherApiResponse>(
      `https://api.weatherapi.com/v1/forecast.json?key=866ed44e051449eabb5141757251807&q=${cityName}&days=5`
    );
        const data = response.data;
        setWeather({
          temp: data.current.temp_c,
          description: data.current.condition.text,
          icon: data.current.condition.icon,
          city: data.location.name,
          lastUpdated: dayjs(data.current.last_updated).format("HH:mm - dddd, D MMM 'YY"),
          maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
          minTemp: data.forecast.forecastday[0].day.mintemp_c,
          humidity: data.current.humidity,
          wind: data.current.wind_kph,
          hourly: data.forecast.forecastday[0].hour.map((hour: any) => ({
            time: hour.time,
            temp: hour.temp_c,
            condition: hour.condition.text,
            icon: hour.condition.icon,
          })),
          forecast: data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            condition: day.day.condition.text,
            icon: day.day.condition.icon,
          })),
        });
      } catch (error) {
        setWeather(null);
      }
    };
    fetchWeather();
  }, [cityName]);

  if (!weather) return <div style={{ color: "#fff" }}>Loading...</div>;

  return (
     <div className="App">
      <div className="d-flex flex-grow-1" style={{ height: '100vh' }}>
        <div className="left-section col-lg-6 d-flex flex-column justify-content-between align-items-start">
          <div className='d-flex w-100 justify-content-between'>
            <div />
            {/* Header ko yahan render karein */}
            <Header/>
            <UnitToggle unit={unit} onToggle={setUnit} />
          </div>
          <DefaultCityForecast
            temp={convertTemp(weather.temp)}
            unit={unit}
            city={weather.city}
            lastUpdated={weather.lastUpdated}
            icon={weather.icon}
            description={weather.description}
          />
        </div>
        <div className='right-section col-lg-6'>
          <HourlyForecast
            hourlyData={weather.hourly.map((h: any) => ({
              ...h,
              temp: convertTemp(h.temp),
            }))}
            unit={unit}
          />
          <FiveDayForecast
            forecast={weather.forecast.map((d: any) => ({
              ...d,
              maxTemp: convertTemp(d.maxTemp),
              minTemp: convertTemp(d.minTemp),
            }))}
            unit={unit}
          />
        </div>
      </div>
    </div>
  )
}

export default CityWeather