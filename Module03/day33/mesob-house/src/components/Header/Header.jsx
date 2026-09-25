import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { AuthContext } from '../../auth/AuthContext';
import './Header.css';

export default function Header() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `font-semibold text-sm transition-colors duration-200 ${
      isActive
        ? 'text-amber-300 border-b-2 border-amber-300 pb-1'
        : 'text-amber-100 hover:text-amber-300'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-amber-950 text-white shadow-xl sticky top-0 z-50 border-b border-amber-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform group-hover:scale-110">🇪🇹</span>
          <span className="text-2xl font-black tracking-wide bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent">
            Mesob House
          </span>
        </Link>
        <nav className="flex items-center space-x-8">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/menu" className={navLinkClass}>Menu</NavLink>
          <NavLink to="/cart" className="relative font-semibold text-sm text-amber-100 hover:text-amber-300 transition-colors flex items-center gap-1.5">
            Cart
            {totalItems > 0 && (
              <span className="bg-red-600 text-white text-xs font-extrabold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-bounce">
                {totalItems}
              </span>
            )}
          </NavLink>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-amber-100">
                Hi, {user.fullName.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-amber-700 hover:bg-amber-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}