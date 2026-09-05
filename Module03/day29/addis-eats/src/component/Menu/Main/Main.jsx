import React, { useState, useEffect } from "react";
import Weather from "../Weather/Weather";
import SideBar from "../SideBar/SideBar";
import FilterBar from "../FilterBar/FilterBar";
import AddCityForm from "../AddCityForm/AddCityForm";
import { loadWeather } from "../../../Api";
import "./Main.css";

function Main() {
  const [saved, setSaved] = useState([]);
  const [filter, setFilter] = useState("All");

  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  console.log("effect running, fetching cities...");
  const ctrl = new AbortController();

  setLoading(true);
  setError(null);

  loadWeather(ctrl.signal)
    .then((data) => setWeather(data))
    .catch((e) => {
      if (e.name !== "AbortError") setError(e.message || "Failed to load cities");
    })
    .finally(() => setLoading(false));

  return () => {
    console.log("cleanup running");
    ctrl.abort();
  };
}, []);

  const toggleSave = (city) => {
    setSaved((prev) =>
      prev.find((c) => c.id === city.id)
        ? prev.filter((c) => c.id !== city.id)
        : [...prev, city]
    );
  };

  const addCity = (newCity) => {
    setWeather((prev) => [...prev, newCity]);
  };

  const conditions = ["All", ...new Set(weather.map((w) => w.condition))];

  const shown =
    filter === "All" ? weather : weather.filter((w) => w.condition === filter);

  if (loading) return <p className="status">Loading cities…</p>;
  if (error) return <p className="status err">{error}</p>;

  return (
    <div className="main">
      <p className="total">Saved cities: {saved.length}</p>

      <FilterBar
        conditions={conditions}
        selected={filter}
        onSelect={setFilter}
      />

      <AddCityForm onAddCity={addCity} />

      <div className="card">
        {shown.length === 0 ? (
          <p>No {filter} cities found.</p>
        ) : (
          shown.map((item) => (
            <Weather
              key={item.id}
              weather={item}
              onSave={() => toggleSave(item)}
            />
          ))
        )}
      </div>

      <SideBar saved={saved} />
    </div>
  );
}

export default Main;