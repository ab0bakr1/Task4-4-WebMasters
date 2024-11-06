import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [city, setCity] = useState('San Francisco');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e47d18e2cb8aaa4450edab9a10324b3e&units=metric`);
                if (!response.ok) throw new Error('City not found');
                const data = await response.json();
                setWeatherData(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchWeatherData();
    }, [city]);

    return (
        <div className="weather-container">
            <div className="input-button-group">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
                <button onClick={() => setCity(city)}>Get Weather</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <p>{weatherData.main.temp} °C</p>
                    <p>{weatherData.weather[0].description}</p>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="weather icon" />
                </div>
            )}
        </div>
    );
};

export default App;
