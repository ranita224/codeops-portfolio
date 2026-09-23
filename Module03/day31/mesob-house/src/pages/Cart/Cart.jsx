import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../cart/CartContext';
import './Cart.css';

export default function Cart() {
  const { items, dispatch, totalAmount } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any delicious Habesha dishes to your cart yet.</p>
        <Link
          to="/menu"
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Current Order</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-amber-100">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-amber-700 font-semibold">{item.price} ETB</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                  className="bg-gray-200 px-3 py-1 rounded font-bold hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                  className="bg-gray-200 px-3 py-1 rounded font-bold hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  className="text-red-600 hover:text-red-800 text-sm font-semibold ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 h-fit">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
          <div className="flex justify-between py-2 border-b border-gray-100 text-gray-600">
            <span>Subtotal</span>
            <span>{totalAmount} ETB</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-gray-600">
            <span>Delivery Fee</span>
            <span>100 ETB</span>
          </div>
          <div className="flex justify-between py-4 font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>{totalAmount + 100} ETB</span>
          </div>
          <Link
            to="/checkout"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white text-center py-3 rounded-lg font-semibold block transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}