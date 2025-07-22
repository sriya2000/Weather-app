import React from 'react';
import { render, screen } from '@testing-library/react';
import DefaultCityForecast from '../Component/DefaultCityForecast';


const mockProps = {
  temp: 28.5,
  unit: 'C' as const,
  city: 'Delhi',
  lastUpdated: '2024-06-05 14:30',
  icon: 'weather-icon.png',
  description: 'Partly cloudy',
};

describe('DefaultCityForecast Component', () => {
  it('renders temperature with correct unit', () => {
    render(<DefaultCityForecast {...mockProps} />);
    expect(screen.getByText(/28.5°C/)).toBeInTheDocument();
  });

   it('renders city name', () => {
    render(<DefaultCityForecast {...mockProps} />);
    expect(screen.getByText('Delhi')).toBeInTheDocument();
  });

  it('renders last updated time', () => {
    render(<DefaultCityForecast {...mockProps} />);
    expect(screen.getByText('2024-06-05 14:30')).toBeInTheDocument();
  });

  it('renders weather icon with correct alt text', () => {
    render(<DefaultCityForecast {...mockProps} />);
    const img = screen.getByAltText('Partly cloudy');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'weather-icon.png');
  });

  it('renders temperature with F unit if given', () => {
    render(<DefaultCityForecast {...mockProps} unit="F" />);
    expect(screen.getByText(/28.5°F/)).toBeInTheDocument();
  });

});