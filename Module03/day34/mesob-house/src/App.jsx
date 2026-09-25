import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './auth/RequireAuth';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Layout from './layout/Layout';
import './styles.css';

const Home = lazy(() => import('./pages/Home/Home'));
const Menu = lazy(() => import('./pages/Menu/Menu'));
const DishDetail = lazy(() => import('./pages/DishDetail/DishDetail'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function PageFallback() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin" />
    </div>
  );
}

function LazyPage({ children }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LazyPage><Home /></LazyPage>} />
          <Route path="menu" element={<LazyPage><Menu /></LazyPage>} />
          <Route path="menu/:slug" element={<LazyPage><DishDetail /></LazyPage>} />
          <Route path="cart" element={<LazyPage><Cart /></LazyPage>} />
          <Route path="login" element={<LazyPage><Login /></LazyPage>} />
          <Route path="register" element={<LazyPage><Register /></LazyPage>} />
          <Route element={<RequireAuth />}>
            <Route path="checkout" element={<LazyPage><Checkout /></LazyPage>} />
          </Route>
          <Route path="*" element={<LazyPage><NotFound /></LazyPage>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}