import React from 'react';

interface FiveDayForecastProps {
  forecast: {
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
  }[];
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ forecast }) => (
  <div className="five-day-forecast">
    <h3>5-Day Forecast</h3>
    <div className="forecast-list">
      {forecast.map((day, idx) => (
        <div key={idx} className="day">
          <p>{day.date}</p>
          <img src={day.icon} alt={day.condition} />
          <p>{day.condition}</p>
          <p>High: {day.maxTemp}°C</p>
          <p>Low: {day.minTemp}°C</p>
        </div>
      ))}
    </div>
  </div>
);

export default FiveDayForecast;
