import Button from "../common/Button";

const CategoryTabs = ({ categories, activeCategory, onSelect }) => {
    return (
        <div className="flex gap-2 mb-12 overflow-x-auto whitespace-nowrap md:justify-start pb-2">
            {categories.map(category => (
                <Button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === category
                            ? "bg-red-600 text-white shadow-md"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    {category}
                </Button>
            ))}
        </div>
    );
};

export default CategoryTabs;
