import React from 'react';
import { render, screen } from '@testing-library/react';
import HourlyForecast from '../Component/HourlyForecast';

const mockHourlyData = [
  {
    time: '2024-06-01T09:00:00Z',
    temp: 28.4,
    condition: 'Sunny',
    icon: 'sunny.png',
  },
  {
    time: '2024-06-01T12:00:00Z',
    temp: 31.2,
    condition: 'Partly Cloudy',
    icon: 'partly-cloudy.png',
  },
];

describe('HourlyForecast Component', () => {
  it('renders "No hourly data available." if hourlyData is empty', () => {
    render(<HourlyForecast hourlyData={[]} unit="C" />);
    expect(screen.getByText(/No hourly data available/i)).toBeInTheDocument();
  });

  it('renders "No hourly data available." if hourlyData is undefined', () => {
    // @ts-expect-error: Testing undefined prop
    render(<HourlyForecast unit="C" />);
    expect(screen.getByText(/No hourly data available/i)).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<HourlyForecast hourlyData={mockHourlyData} unit="C" />);
    expect(screen.getByText(/Hourly Forecast/i)).toBeInTheDocument();
  });

 it('renders all hourly data with correct time, temp, and icon', () => {
    render(<HourlyForecast hourlyData={mockHourlyData} unit="C" />);
    // Dynamically get the expected time strings as rendered
    const expectedTimes = mockHourlyData.map(hour =>
      new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    expectedTimes.forEach(time => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });
    expect(screen.getByText('28.4°C')).toBeInTheDocument();
    expect(screen.getByText('31.2°C')).toBeInTheDocument();
    expect(screen.getByAltText('Sunny')).toHaveAttribute('src', 'sunny.png');
    expect(screen.getByAltText('Partly Cloudy')).toHaveAttribute('src', 'partly-cloudy.png');
  });

  it('renders temperatures in Fahrenheit if unit="F"', () => {
    render(<HourlyForecast hourlyData={mockHourlyData} unit="F" />);
    expect(screen.getByText('28.4°F')).toBeInTheDocument();
    expect(screen.getByText('31.2°F')).toBeInTheDocument();
  });
});