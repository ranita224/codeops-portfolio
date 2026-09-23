import { Link } from 'react-router-dom';
import DishCard from '../../components/DishCard/DishCard';
import { useFetch } from '../../hooks/useFetch';

const SPECIALS_URL = "https://addis-eats-backend.onrender.com/menu/specials";

export default function Home() {
  const { data: specials, loading, error } = useFetch(SPECIALS_URL);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-amber-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Mesob House
          </h1>
          <p className="text-lg md:text-xl text-amber-200 mb-8">
            Experience authentic Habesha cuisine, rich flavors, and traditional hospitality delivered to your table.
          </p>
          <Link
            to="/menu"
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg inline-block"
          >
            Explore Full Menu
          </Link>
        </div>
      </section>

      {/* Featured Specials Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Today's Specials</h2>

        {loading && (
          <p className="text-center text-amber-800 font-medium">
            Loading today's specials… (first load can take up to a minute)
          </p>
        )}

        {error && (
          <p role="alert" className="text-center text-red-700 font-medium">
            Couldn't load specials: {error}
          </p>
        )}

        {!loading && !error && specials && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specials.map((dish) => (
              <div key={dish.id}>
                <DishCard {...dish} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}