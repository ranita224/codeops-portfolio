import React, { useState, useContext, useMemo } from "react";
import Weather from "../Weather/Weather";
import SideBar from "../SideBar/SideBar";
import FilterBar from "../FilterBar/FilterBar";
import AddCityForm from "../AddCityForm/AddCityForm";
import { useFetch } from "../../../hooks/useFetch";
import { loadWeather } from "../../../Api";
import { SavedContext } from "../../../context/SavedContext";
import "./Main.css";

function Main() {
  const [filter, setFilter] = useState("All");
  const [addedCities, setAddedCities] = useState([]);

  const { data, loading, error } = useFetch(loadWeather);
  const { saved, toggleSave } = useContext(SavedContext);

  const weather = useMemo(
    () => [...(data || []), ...addedCities],
    [data, addedCities]
  );

  const addCity = (newCity) => {
    setAddedCities((prev) => [...prev, newCity]);
  };

  const conditions = useMemo(
    () => ["All", ...new Set(weather.map((w) => w.condition))],
    [weather]
  );

  const shown = useMemo(
    () =>
      filter === "All"
        ? weather
        : weather.filter((w) => w.condition === filter),
    [weather, filter]
  );

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

      <SideBar />
    </div>
  );
}

export default Main;