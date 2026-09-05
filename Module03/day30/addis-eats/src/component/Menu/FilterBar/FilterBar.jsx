import React from "react";
import PropTypes from "prop-types";
import "./FilterBar.css";

function FilterBar({ conditions, selected, onSelect }) {
  return (
    <div className="filter-bar">
      {conditions.map((c) => (
        <button
          key={c}
          className={c === selected ? "chip on" : "chip"}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

FilterBar.propTypes = {
  conditions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default FilterBar;