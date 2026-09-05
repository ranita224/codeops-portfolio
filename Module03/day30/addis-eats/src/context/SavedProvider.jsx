import React, { useReducer, useMemo } from "react";
import { SavedContext } from "./SavedContext";
import { savedReducer } from "./savedReducer";

export function SavedProvider({ children }) {
  const [saved, dispatch] = useReducer(savedReducer, []);

  const toggleSave = (city) => {
    dispatch({ type: "toggle", city });
  };

  const clearSaved = () => {
    dispatch({ type: "clear" });
  };

  const value = useMemo(
    () => ({ saved, toggleSave, clearSaved }),
    [saved]
  );

  return (
    <SavedContext.Provider value={value}>
      {children}
    </SavedContext.Provider>
  );
}