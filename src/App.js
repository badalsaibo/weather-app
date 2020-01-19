import React, { useState, useEffect } from 'react';

import Icon from './Icon';

import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState({
    "latitude": 42.3601,
    "longitude": -71.0589,
    "timezone": "America/New_York",
    "currently": {
      "time": 1509993277,
      "summary": "Drizzle",
      "icon": "rain",
      "nearestStormDistance": 0,
      "precipIntensity": 0.0089,
      "precipIntensityError": 0.0046,
      "precipProbability": 0.9,
      "precipType": "rain",
      "temperature": 66.1,
      "apparentTemperature": 66.31,
      "dewPoint": 60.77,
      "humidity": 0.83,
      "pressure": 1010.34,
      "windSpeed": 5.59,
      "windGust": 12.03,
      "windBearing": 246,
      "cloudCover": 0.7,
      "uvIndex": 1,
      "visibility": 9.84,
      "ozone": 267.44
    }
  });

  /* -- Fetching the weather data  -- */

  const getWeather = async () => {
    try {
      // let url = `https://localhost:3001/api/weather/${location.lat},${location.long}`;
      const response = await fetch(`/api/weather`);
      const data = await response.json();
      console.log(data, typeof(data));
      setWeatherData(data);
    }
    catch(error) {
      console.log('Error fetching weather data!');
    }
  };

  useEffect(() => {
    getWeather();
  }, []);


  /* -- UTILS -- */

  const stringSplitter = (stringToSplit) => {
    const splittedString = stringToSplit.split('/');
    const transformedString = splittedString.map((eachString) => eachString.split('_').join(' '));
    return transformedString.join(', ');
  };

  const getShortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;

  return (
    <div className="container">
      <div className="container-top">
        <div className="date">{getShortMonthName(new Date())} {new Date().getDate()}</div>
        <div className="weather-icon-container">
          <div className="weather-icon">
            <Icon name='weather'/>
            <Icon name='weather'/>
          </div>
        </div>
        
        <div className="info">
          <div className="temperature">{Math.round(weatherData.currently.temperature)}&#176;</div>
          <div className="summary">
            <div className="summary__text">{weatherData.currently.summary}</div>
            <div className="summary__place">{stringSplitter(weatherData.timezone)}</div>
          </div>
        </div>
      </div>
      
      <div className="container-bottom">
        <div title="wind speed" className="container-bottom__info">
          <Icon name="wind-speed"/>
          <span className="container-bottom__info-text">{Math.round(weatherData.currently.windSpeed)}kmh</span>
        </div>
        <div title="humidity" className="container-bottom__info">
          <Icon name="humidity"/>
          <span className="container-bottom__info-text">{Math.round(weatherData.currently.humidity * 100)}%</span>
        </div>
        <div title="cloudy" className="container-bottom__info">
          <Icon name="cloudy"/>
          <span className="container-bottom__info-text">{Math.round(weatherData.currently.cloudCover * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default App;
