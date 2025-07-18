import React from 'react';

interface HourlyForecastProps {
  hourlyData: {
    time: string;
    temp: number;
    condition: string;
    icon: string;
  }[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return <div>No hourly data available.</div>;
  }

  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="hourly-list">
        {hourlyData.map((hour, index) => (
          <div key={index} className="hour">
            <p>{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <img src={hour.icon} alt={hour.condition} />
            <p>{hour.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
