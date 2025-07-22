import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentWeatherDetails from '../Component/CurrentWeatherDetails';

const mockProps = {
    description: 'Partly Cloudy',
    maxTemp: 32.5,
    minTemp: 24.1,
    humidity: 65,
    cloud: 40,
    wind: 12,
    city: 'Mumbai',
    country: 'IN',
    temp: 28.3,
    icon: 'partly-cloudy.png',
    unit: 'C' as const,
};

describe('CurrentWeatherDetails Component', () => {
    it('renders the heading', () => {
        render(<CurrentWeatherDetails {...mockProps} />);
        expect(screen.getByText(/Current Weather Details/i)).toBeInTheDocument();
    });

    it('renders weather description and icon', () => {
        render(<CurrentWeatherDetails {...mockProps} />);
        expect(screen.getByText('Partly Cloudy')).toBeInTheDocument();
        const img = screen.getByAltText('Partly Cloudy');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'partly-cloudy.png');
    });


    it('renders humidity, cloud, and wind details', () => {
        render(<CurrentWeatherDetails {...mockProps} />);

        expect(screen.getByText(/Humidity:/)).toBeInTheDocument();
        expect(screen.getByText(/Cloudy:/)).toBeInTheDocument();
        expect(screen.getByText(/Wind:/)).toBeInTheDocument();
    });

    it('renders humidity, cloud, and wind details', () => {
        const { container } = render(<CurrentWeatherDetails {...mockProps} />);
        const allPs = container.querySelectorAll('p');
        expect(
            Array.from(allPs).some(p =>
                p.textContent?.replace(/\s+/g, ' ').includes('Humidity: 65%')
            )
        ).toBe(true);
        expect(
            Array.from(allPs).some(p =>
                p.textContent?.replace(/\s+/g, ' ').includes('Cloudy: 40%')
            )
        ).toBe(true);
        expect(
            Array.from(allPs).some(p =>
                p.textContent?.replace(/\s+/g, ' ').includes('Wind: 12 km/h')
            )
        ).toBe(true);
    });

    it('renders temperature with F unit if given', () => {
        const { container } = render(<CurrentWeatherDetails {...mockProps} unit="F" />);
        const allPs = container.querySelectorAll('p');
        expect(
            Array.from(allPs).some(p =>
                p.textContent?.replace(/\s+/g, ' ').includes('Temp max: 32.5°F')
            )
        ).toBe(true);
        expect(
            Array.from(allPs).some(p =>
                p.textContent?.replace(/\s+/g, ' ').includes('Temp min: 24.1°F')
            )
        ).toBe(true);
    });

    it('renders max and min temperature with correct unit', () => {
        const { container } = render(<CurrentWeatherDetails {...mockProps} />);
        const allPs = container.querySelectorAll('p');
        expect(
            Array.from(allPs).some(p =>
                p.textContent?.replace(/\s+/g, ' ').includes('Temp max: 32.5°C')
            )
        ).toBe(true);
        expect(
            Array.from(allPs).some(p =>
                p.textContent?.replace(/\s+/g, ' ').includes('Temp min: 24.1°C')
            )
        ).toBe(true);
    });
});