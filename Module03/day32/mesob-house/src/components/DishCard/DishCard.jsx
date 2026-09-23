import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getDishImage } from "../../Data/dishImages";

function DishCard({ slug, nameEn, nameAm, priceETB, category, spiceLevel, isFasting, isSpecial }) {
  const image = getDishImage(slug);

  return (
    <Link
      to={`/menu/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-amber-900/20 bg-amber-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-amber-200">
        <img
          src={image}
          alt={nameEn}
          className="h-full w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold text-amber-950">{nameEn}</h3>
          <span className="whitespace-nowrap font-semibold text-amber-900">{priceETB} ETB</span>
        </div>
        <p className="text-xs text-amber-700/80" lang="am">{nameAm}</p>
        <span className="text-xs font-medium text-amber-700">{category}</span>

        <div className="mt-1 flex flex-wrap gap-1">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
            🌶 {spiceLevel}
          </span>
          {isFasting && (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
              🌿 Fasting
            </span>
          )}
          {isSpecial && (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-900">
              ⭐ Special
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

DishCard.propTypes = {
  slug: PropTypes.string.isRequired,
  nameEn: PropTypes.string.isRequired,
  nameAm: PropTypes.string,
  priceETB: PropTypes.number.isRequired,
  category: PropTypes.string,
  spiceLevel: PropTypes.string,
  isFasting: PropTypes.bool,
  isSpecial: PropTypes.bool,
};

export default DishCard;