import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formData.email, formData.password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const redirectTo = location.state?.from?.pathname || '/';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login to Mesob House</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md border border-amber-100 space-y-4">
        {error && (
          <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="abebe@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="w-full bg-amber-700 text-white py-2 rounded-lg font-semibold hover:bg-amber-800 transition-colors">
          Sign In
        </button>
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-amber-700 font-semibold underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}