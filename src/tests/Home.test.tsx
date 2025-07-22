import { render, screen, waitFor } from '@testing-library/react';
import Home from '../Pages/Home';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockApiResponse = {
    data: {
        location: { name: 'Bangalore', country: 'India' },
        current: {
            temp_c: 30,
            condition: { text: 'Sunny', icon: '//icon.png' },
            last_updated: '2024-06-01 10:00',
            humidity: 50,
            wind_kph: 10,
            cloud: 25,
        },
        forecast: {
            forecastday: [
                {
                    date: '2024-06-01',
                    day: { maxtemp_c: 35, mintemp_c: 25, condition: { text: 'Sunny', icon: '//icon.png' } },
                    hour: [
                        {
                            time: '2024-06-01 10:00',
                            temp_c: 30,
                            condition: { text: 'Sunny', icon: '//icon.png' },
                        },
                    ],
                },
            ],
        },
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { url: 'https://api.weatherapi.com/v1/forecast.json' },
};


describe('Home', () => {
    test('displays weather data on successful API call', async () => {
        mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

        render(<MemoryRouter>
            <Home />
        </MemoryRouter>);
        await waitFor(() => {

            screen.debug();
            expect(screen.getByText(/Bangalore/i)).toBeInTheDocument();
            expect(screen.getAllByText(/Sunny/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/35/).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/25/).length).toBeGreaterThan(0);
        });
    });



    test('renders loading state initially', () => {
        render(<Home />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });


});