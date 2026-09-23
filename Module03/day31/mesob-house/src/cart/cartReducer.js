export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
  const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
  if (existingIndex > -1) {
    const updatedItems = state.items.map((item, i) =>
      i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
    );
    return { ...state, items: updatedItems };
  }
  return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
}
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}