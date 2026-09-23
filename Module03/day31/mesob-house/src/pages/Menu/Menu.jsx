import { useContext, useMemo, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import DishCard from "../../components/DishCard/DishCard";
import { CartContext } from "../../cart/CartContext";
import { getDishImage } from "../../Data/dishImages";
import "./Menu.css";

const MENU_URL = "https://addis-eats-backend.onrender.com/menu";
const ADDIS_BG = "https://commons.wikimedia.org/wiki/Special:FilePath/AddisView.jpg";

export default function Menu() {
  const { data: dishes, loading, error } = useFetch(MENU_URL);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { dispatch } = useContext(CartContext);

  const categories = useMemo(() => {
    if (!dishes) return ["All"];
    return ["All", ...new Set(dishes.map((d) => d.category))];
  }, [dishes]);

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    const q = query.trim().toLowerCase();
    return dishes.filter((d) => {
      if (selectedCategory !== "All" && d.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        d.nameEn.toLowerCase().includes(q) ||
        d.nameAm.includes(query.trim()) ||
        d.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    });
  }, [dishes, selectedCategory, query]);

  function handleAdd(dish) {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        ...dish,
        id: dish.slug,
        name: dish.nameEn,
        price: dish.priceETB,
        image: getDishImage(dish.slug),
      },
    });
  }

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${ADDIS_BG})` }}
    >
      <div className="absolute inset-0 bg-amber-50/85"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-amber-950 tracking-tight mb-3">
            Our Authentic Menu
          </h1>
          <p className="text-amber-800/80 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Explore freshly prepared traditional Habesha dishes.
          </p>
          <div className="w-24 h-1 bg-amber-700 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-md mx-auto mb-8 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-700/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes or ingredients…"
            aria-label="Search the menu"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {loading && (
          <p className="text-center text-amber-800 font-medium">
            Loading the menu… (first load can take up to a minute)
          </p>
        )}

        {error && (
          <p role="alert" className="text-center text-red-700 font-medium">
            Couldn't load the menu: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="flex justify-center gap-3 mb-12 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                    selectedCategory === cat
                      ? "bg-amber-900 text-amber-50 border-amber-900 shadow-md scale-105"
                      : "bg-white text-stone-700 border-amber-200 hover:bg-amber-100/50 hover:border-amber-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-center text-amber-700/70 text-sm mb-6">
              {filteredDishes.length} of {dishes?.length ?? 0} dishes
            </p>

            {filteredDishes.length === 0 ? (
              <p className="text-center text-amber-800">No dishes match your search.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDishes.map((dish) => (
                  <div key={dish.id} className="flex flex-col h-full">
                    <div className="flex-grow">
                      <DishCard {...dish} />
                    </div>
                    <button
                      onClick={() => handleAdd(dish)}
                      className="mt-3 w-full bg-amber-800 hover:bg-amber-900 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-95 text-sm"
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}