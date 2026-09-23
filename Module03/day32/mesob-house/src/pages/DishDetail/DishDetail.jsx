import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useCartStore } from "../../store/useCartStore";
import { getDishImage } from "../../Data/dishImages";
import Toast from "../../components/Toast/Toast";

const MENU_URL = "https://addis-eats-backend.onrender.com/menu";

export default function DishDetail() {
  const { slug } = useParams();
  const { data: dishes, loading, error } = useFetch(MENU_URL);
  const addItem = useCartStore((state) => state.addItem);
  const [toastMessage, setToastMessage] = useState("");

  if (loading) {
    return (
      <p className="text-center py-16 text-amber-800 font-medium">
        Loading dish… (first load can take up to a minute)
      </p>
    );
  }

  if (error) {
    return (
      <p role="alert" className="text-center py-16 text-red-700 font-medium">
        Couldn't load this dish: {error}
      </p>
    );
  }

  const dish = dishes?.find((d) => d.slug === slug);

  if (!dish) {
    return (
      <div className="text-center py-16">
        <p className="text-amber-900 font-semibold mb-4">
          We couldn't find that dish.
        </p>
        <Link to="/menu" className="text-amber-700 underline">
          Back to the menu
        </Link>
      </div>
    );
  }

  function handleAdd() {
    addItem({
      ...dish,
      id: dish.slug,
      name: dish.nameEn,
      price: dish.priceETB,
      image: getDishImage(dish.slug),
    });
    setToastMessage(`${dish.nameEn} added to cart`);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/menu" className="text-amber-700 underline text-sm">
        ← Back to menu
      </Link>

      <div className="mt-6 rounded-xl overflow-hidden border border-amber-900/20">
        <img
          src={getDishImage(dish.slug)}
          alt={dish.nameEn}
          className="w-full aspect-[16/9] object-cover"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-3xl font-bold text-amber-950">{dish.nameEn}</h1>
          <span className="text-xl font-semibold text-amber-900 whitespace-nowrap">
            {dish.priceETB} ETB
          </span>
        </div>
        <p className="text-amber-700/80 mt-1" lang="am">{dish.nameAm}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="rounded-full bg-red-100 text-red-700 text-xs font-semibold px-3 py-1">
            🌶 {dish.spiceLevel}
          </span>
          {dish.isFasting && (
            <span className="rounded-full bg-green-100 text-green-700 text-xs font-semibold px-3 py-1">
              🌿 Fasting
            </span>
          )}
          {dish.isSpecial && (
            <span className="rounded-full bg-amber-200 text-amber-900 text-xs font-semibold px-3 py-1">
              ⭐ Special
            </span>
          )}
        </div>

        <p className="text-stone-700 mt-6 leading-relaxed">{dish.description}</p>

        {dish.ingredients?.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-amber-950 mb-2">Ingredients</h2>
            <ul className="flex flex-wrap gap-2">
              {dish.ingredients.map((ing) => (
                <li
                  key={ing}
                  className="text-sm bg-amber-100 text-amber-900 rounded-full px-3 py-1"
                >
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        )}

        {dish.servings && (
          <p className="text-sm text-amber-700/80 mt-4">{dish.servings}</p>
        )}

        <button
          onClick={handleAdd}
          className="mt-8 w-full bg-amber-800 hover:bg-amber-900 text-white font-semibold py-3 rounded-xl shadow-md transition-all active:scale-95"
        >
          🛒 Add to cart
        </button>
      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}