import { useReducer, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

const CART_KEY = 'mesob_cart';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.items)) return parsed;
    }
  } catch {
  }
  return { items: [] };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state));
    } catch {
    }
  }, [state]);

  const totalAmount = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [state.items]);

  const totalItems = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  return (
    <CartContext.Provider value={{ items: state.items, dispatch, totalAmount, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};