import React from 'react'

interface CurrentWeatherDetailsProps {
  city: string;
  country: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  humidity: number;
  condition: string;
  wind: number;
  icon: string;
  unit: 'C' | 'F';
}

const CurrentWeatherDetails: React.FC<CurrentWeatherDetailsProps> = ({
  city, country, temp, maxTemp, minTemp, humidity, condition, wind, icon, unit
}) => (
  <div className="current-weather-details-box">
    <h3>{city}, {country}</h3>
    <img src={icon} alt={condition} />
    <p><strong>Condition:</strong> {condition}</p>
    <p><strong>Temperature:</strong> {temp.toFixed(1)}°{unit}</p>
    <p><strong>Max Temp:</strong> {maxTemp.toFixed(1)}°{unit}</p>
    <p><strong>Min Temp:</strong> {minTemp.toFixed(1)}°{unit}</p>
    <p><strong>Humidity:</strong> {humidity}%</p>
    <p><strong>Wind:</strong> {wind} km/h</p>
  </div>
);

export default CurrentWeatherDetails