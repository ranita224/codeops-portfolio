import React from "react";
import PropTypes from "prop-types";
import "./Weather.css";

function Weather({ weather, onSave }) {
  return (
    <div className="weather-box" onClick={onSave}>
      <h3>{weather.city}</h3>
      <p>{weather.temp}°C</p>
      <p>{weather.condition}</p>
      {weather.temp > 25 && <span className="badge">🔥 Hot</span>}
    </div>
  );
}

Weather.propTypes = {
  weather: PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    condition: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func,
};

Weather.defaultProps = {
  onSave: () => {},
};

export default Weather;
