import { Link } from 'react-router-dom';
import './Footer.css';


export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-200/80 py-10 border-t border-amber-900/60 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇪🇹</span>
          <p className="font-semibold text-amber-100">Mesob House / Addis Eats</p>
        </div>
        <div className="flex space-x-8 text-amber-200/90 font-medium">
        </div>
        <p className="text-xs text-amber-300/60">
          © {new Date().getFullYear()} Mesob House. All rights reserved.
        </p>
      </div>
    </footer>
  );
}