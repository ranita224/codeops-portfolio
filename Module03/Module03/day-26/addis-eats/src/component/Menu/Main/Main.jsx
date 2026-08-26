import React, { useState } from "react";
import Weather from "../Weather/Weather";
import SideBar from "../SideBar/SideBar";
import "./Main.css";
function Main() {
  const [saved, setSaved] = useState([]);

  const weather = [
    { id: 1, city: "Addis Abeba", temp: 22, condition: "Sunny" },
    { id: 2, city: "Bole", temp: 21, condition: "Cloudy" },
    { id: 3, city: "Dire Dawa", temp: 28, condition: "Hot" },
    { id: 4, city: "Mekelle", temp: 18, condition: "Rainy" },
    { id: 5, city: "Hawassa", temp: 25, condition: "Partly Cloudy" },
    { id: 6, city: "Jimma", temp: 20, condition: "Rainy" },
    { id: 7, city: "Gondar", temp: 23, condition: "Sunny" },
    { id: 8, city: "Bahir Dar", temp: 24, condition: "Windy" },
    { id: 9, city: "Harar", temp: 26, condition: "Sunny" },
    { id: 10, city: "Adama", temp: 27, condition: "Hot" },
    { id: 11, city: "Shashemene", temp: 22, condition: "Cloudy" },
    { id: 12, city: "Debre Markos", temp: 19, condition: "Rainy" },
    { id: 13, city: "Arba Minch", temp: 29, condition: "Sunny" }
  ];

  const toggleSave = (city) => {
    setSaved((prev) =>
      prev.find((c) => c.id === city.id)
        ? prev.filter((c) => c.id !== city.id)
        : [...prev, city]
    );
  };

  return (
    <div className="main">
      <div className="card">
        {weather.map((item) => (
          <Weather key={item.id} weather={item} onSave={() => toggleSave(item)} />
        ))}
      </div>
      <SideBar saved={saved} />
    </div>
  );
}

export default Main;
