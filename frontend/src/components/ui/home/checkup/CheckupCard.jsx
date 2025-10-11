const CheckupCard = ({ imageUrl, title, ageRange, gradient }) => (
    <div className="flex flex-col items-center text-center">
        <div className={`bg-gradient-to-br ${gradient} p-2 rounded-3xl shadow-lg w-full`}>
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto rounded-2xl object-cover aspect-square"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x400/cccccc/ffffff?text=Image+Error';
                }}
            />
        </div>
        <div className="mt-4 px-2">
            <p className="font-semibold text-indigo-900 text-sm md:text-base">{title}</p>
            <span className="mt-2 inline-block text-indigo-800 border border-indigo-700 rounded-full px-3 py-1 text-xs md:text-sm font-medium">
                {ageRange}
            </span>
        </div>
    </div>
);

export default CheckupCard;
