import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import { Modal, Button } from 'react-bootstrap';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popularCitiesWeather, setPopularCitiesWeather] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/weather/${cityName}`);
      setWeather(response.data);
      setShowModal(true);
      setLoading(false);
    } catch (err) {
      setError('City not found');
      setWeather(null);
      setLoading(false);
    }
  };

  const fetchPopularCitiesWeather = async () => {
    const cities = ['Tiaret', 'London', 'New York', 'Tokyo', 'Paris', 'Dubai'];
    try {
      const responses = await Promise.all(
        cities.map(cityName => axios.get(`/api/weather/${cityName}`))
      );
      setPopularCitiesWeather(responses.map(response => response.data));
    } catch (err) {
      setError('Unable to fetch weather for popular cities');
    }
  };

  useEffect(() => {
    fetchPopularCitiesWeather(); 
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeather(city);
    }
  };

  return (
    <div className="container mt-5" style={{ background: 'linear-gradient(120deg, #f0f8ff, #e6e6e6)', minHeight: '100vh' }}>
      <h1 className="text-center mb-4">Weather App</h1>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress} 
        />
        <button className="btn btn-primary" onClick={() => fetchWeather(city)}>
          Get Weather
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}

      <div className="mb-4">
        <h4 className="text-center">Popular Cities</h4>
        <div className="row">
          {popularCitiesWeather.map((cityWeather) => (
            <div className="col-md-4 mb-3" key={cityWeather.location.name}>
              <div className="card h-100 shadow-lg">
                <div className="card-body text-center">
                  <h5 className="card-title">{cityWeather.location.name}</h5>
                  <p className="card-text">Temperature: {cityWeather.current.temp_c}°C</p>
                  <p className="card-text">Weather: {cityWeather.current.condition.text}</p>
                  <img src={cityWeather.current.condition.icon} alt="weather-icon" className="weather-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Weather Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {weather && (
            <div className="text-center">
              <h2>{weather.location.name}, {weather.location.country}</h2>
              <p>Temperature: {weather.current.temp_c}°C</p>
              <p>Weather: {weather.current.condition.text}</p>
              <img src={weather.current.condition.icon} alt="weather-icon" className="weather-icon" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WeatherApp;
