import { useEvents } from "../../contexts/EventContext";

function CategoryTabs() {
  const { selectedCategory, setSelectedCategory } = useEvents();

  const categories = [
    "All",
    "Entertainment",
    "Tech",
    "Corporate",
    "Sport",
    "Education",
    "Charity",
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-15 pb-8">
      <div
        className="
          flex
          justify-start
          sm:justify-center
          gap-2
          sm:gap-3
          flex-wrap
        "
      >
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              shrink-0
              px-3
              sm:px-4
              py-2
              rounded-full
              text-xs
              sm:text-sm
              whitespace-nowrap
              transition-colors
              duration-200
              cursor-pointer
              ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "bg-[#1a1a1a] text-white"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryTabs;
