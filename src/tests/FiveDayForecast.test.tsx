import React from 'react';
import { render, screen } from '@testing-library/react';
import FiveDayForecast from '../Component/FiveDayForecast';

const mockForecast = [
  {
    date: '2024-06-01',
    maxTemp: 35.2,
    minTemp: 25.1,
    condition: 'Sunny',
    icon: 'sunny.png',
  },
  {
    date: '2024-06-02',
    maxTemp: 34.0,
    minTemp: 24.5,
    condition: 'Cloudy',
    icon: 'cloudy.png',
  },
];


describe('FiveDayForecast Component', () => {
  it('renders the heading', () => {
    render(<FiveDayForecast forecast={mockForecast} unit="C" />);
    expect(screen.getByText(/5-Day Forecast/i)).toBeInTheDocument();
  });

  it('renders all forecast days', () => {
    render(<FiveDayForecast forecast={mockForecast} unit="C" />);
    expect(screen.getByText('2024-06-01')).toBeInTheDocument();
    expect(screen.getByText('2024-06-02')).toBeInTheDocument();
  });

  it('shows correct temperature and unit', () => {
    render(<FiveDayForecast forecast={mockForecast} unit="F" />);
    expect(screen.getAllByText(/°F/).length).toBeGreaterThan(0);
  });

  it('shows weather condition and icon', () => {
    render(<FiveDayForecast forecast={mockForecast} unit="C" />);
    expect(screen.getByAltText('Sunny')).toHaveAttribute('src', 'sunny.png');
    expect(screen.getByAltText('Cloudy')).toHaveAttribute('src', 'cloudy.png');
  });

});