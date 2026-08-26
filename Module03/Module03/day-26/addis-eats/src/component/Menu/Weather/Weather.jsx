import React from "react";
import "./Weather.css";

function Weather({ weather, onSave }) {
  return (
    <div className="weather-box" onClick={onSave}>
      <h3>{weather.city}</h3>
      <p>{weather.temp}°C</p>
      <p>{weather.condition}</p>
    </div>
  );
}

export default Weather;
