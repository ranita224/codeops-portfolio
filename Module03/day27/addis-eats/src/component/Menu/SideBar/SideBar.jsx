import React from "react";
import Card from "../../Card/Card";
import "./SideBar.css";

function SideBar({ saved }) {
  return (
    <Card>
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
    </Card>
  );
}

export default SideBar;