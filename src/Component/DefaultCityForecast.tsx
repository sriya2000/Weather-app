import React from 'react';

interface DefaultWeatherProps {
  temp: number;
  unit: 'C' | 'F';
  city: string;
  lastUpdated: string;
  icon: string;
  description: string;
}

const DefaultCityForecast: React.FC<DefaultWeatherProps> = ({
  temp,
  unit,
  city,
  lastUpdated,
  icon,
  description,
}) => {
  return (
    <div className="default d-flex align-items-center text-white">
      {/* Temperature */}
      <h1 className="display-2 me-2">
        {temp.toFixed(1)}&deg;{unit}
      </h1>

      {/* City + Last Updated */}
      <div>
        <span className="fs-2">{city}</span>
        <p className="fs-6">{lastUpdated}</p>
      </div>

      {/* Icon */}
      <img className="weather-icon" src={icon} alt={description} />
    </div>
  );
};

export default DefaultCityForecast;