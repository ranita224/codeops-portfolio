import React from "react";
import "./SideBar.css";

function SideBar({ saved }) {
  return (
    <div className="sidebar">
      <h2>Saved Cities</h2>
      {saved.length === 0 ? (
        <p>No cities saved yet.</p>
      ) : (
        <ul>
          {saved.map((city) => (
            <li key={city.id}>
              {city.city} - {city.temp}°C ({city.condition})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SideBar;
