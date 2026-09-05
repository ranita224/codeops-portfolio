import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./AddCityForm.css";

function AddCityForm({ onAddCity }) {
  const [form, setForm] = useState({ city: "", temp: "", condition: "" });
  const cityInputRef = useRef(null);

  const tempValid = form.temp !== "" && !isNaN(form.temp);
  const cityValid = form.city.trim().length > 0;
  const valid = tempValid && cityValid;

  useEffect(() => {
    cityInputRef.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid) return;

    onAddCity({
      id: Date.now(),
      city: form.city,
      temp: Number(form.temp),
      condition: form.condition || "Unknown",
    });

    setForm({ city: "", temp: "", condition: "" });
    cityInputRef.current.focus();
  }

  return (
    <form className="add-city-form" onSubmit={handleSubmit}>
      <h3>Add a City</h3>
      <input
        ref={cityInputRef}
        name="city"
        placeholder="City name"
        value={form.city}
        onChange={handleChange}
      />
      <input
        name="temp"
        placeholder="Temp (°C)"
        value={form.temp}
        onChange={handleChange}
      />
      {form.temp && !tempValid && (
        <p className="err">Temperature must be a number.</p>
      )}
      <input
        name="condition"
        placeholder="Condition (e.g. Sunny)"
        value={form.condition}
        onChange={handleChange}
      />
      <button type="submit" disabled={!valid}>
        Add City
      </button>
    </form>
  );
}

AddCityForm.propTypes = {
  onAddCity: PropTypes.func.isRequired,
};

export default AddCityForm;