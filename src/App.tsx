import React from 'react';
import './App.css';
import WeatherComponent from './Component/WeatherComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main>
        <WeatherComponent />
      
      </main>
    </div>
  );
};


export default App;
