import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Weather.css";

function Weather({ weather, onSave }) {
  const [views, setViews] = useState(0);

  return (
    <div className="weather-box">
      <h3>{weather.city}</h3>
      <p>{weather.temp}°C</p>
      <p>{weather.condition}</p>
      {weather.temp > 25 && <span className="badge">🔥 Hot</span>}

      <p className="views">Viewed: {views}</p>
      <button onClick={() => setViews(views + 1)}>View</button>
      <button onClick={onSave}>Save</button>
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