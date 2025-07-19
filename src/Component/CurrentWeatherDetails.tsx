import React from 'react'

interface CurrentWeatherDetailsProps {
  description: string;
  maxTemp: number;
  minTemp: number;
  humidity: number;
  cloud: number;
  wind: number;
  city: string;
  country: string;
  temp: number;
  icon: string;
  unit: 'C' | 'F';
}

const CurrentWeatherDetails: React.FC<CurrentWeatherDetailsProps> = ({
  city, country, temp, maxTemp, minTemp, humidity, description, wind, cloud, icon, unit
}) => (
  <div className="current-weather-details-box current-forecast">
    <h3>Current Weather Details</h3>
    <div className="d-flex align-items-center justify-content-between fw-semibold border-top p-2">
      <h4>{description}</h4>
      <img src={icon} alt={description} />
    </div>
    <div className="current-list">
        <p>🌡<span className='fw-semibold'>Temp max:</span> {maxTemp.toFixed(1)}°{unit}</p>
        <p>🌡 <span className='fw-semibold'>Temp min:</span> {minTemp.toFixed(1)}°{unit}</p>
        <p>💧 <span className='fw-semibold'>Humidity:</span> {humidity}%</p>
        <p>☁️ <span className='fw-semibold'>Cloudy:</span> {cloud}%</p>
        <p>💨  <span className='fw-semibold'>Wind:</span> {wind} km/h</p>
    </div>
  </div>
);

export default CurrentWeatherDetails