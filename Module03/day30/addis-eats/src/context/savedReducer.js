export function savedReducer(state, action) {
  switch (action.type) {
    case "toggle": {
      const exists = state.find((c) => c.id === action.city.id);
      if (exists) {
        return state.filter((c) => c.id !== action.city.id);
      }
      return [...state, action.city];
    }
    case "clear":
      return [];
    default:
      throw new Error("Unknown action: " + action.type);
  }
}