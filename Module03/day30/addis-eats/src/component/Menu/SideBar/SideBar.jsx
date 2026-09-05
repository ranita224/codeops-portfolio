import React, { useContext } from "react";
import Card from "../../Card/Card";
import { SavedContext } from "../../../context/SavedContext";
import "./SideBar.css";

function SideBar() {
  const { saved } = useContext(SavedContext);

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