import React from 'react';

interface FiveDayForecastProps {
  forecast: {
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
  }[];

   unit: 'C' | 'F';
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ forecast, unit  }) => (
  <div className="five-day-forecast">
    <h3>5-Day Forecast</h3>
    <div className="forecast-list border-top p-2">
      {forecast.map((day, idx) => (
        <div key={idx} className="day">
          <p>{day.date}</p>
          <img src={day.icon} alt={day.condition} />
          <p>{day.condition}</p>
          {/* <p>High: {day.maxTemp}°C</p> */}
          <p>
            <span className='fw-semibold'>High:</span> {day.maxTemp.toFixed(1)}°{unit}
          </p>
          {/* <p>Low: {day.minTemp}°C</p> */}
          <p>
            <span className='fw-semibold'>Low:</span> {day.minTemp.toFixed(1)}°{unit}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default FiveDayForecast;
