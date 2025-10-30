import Image from "../../common/Image";

const CheckupCard = ({ imageUrl, title, Price, onClick }) => (
    <div
        onClick={onClick}
        className="w-auto bg-white border border-gray-200 rounded-2xl pb-4 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
    >
        
        {/* Image */}
            <Image
                src={imageUrl}
                alt={title}
                className="w-full h-full"
            />

        {/* Title & Price */}
        <div className="mt-3">
            <p className="font-semibold text-gray-800 text-lg md:text-base group-hover:text-gray-900 transition-colors duration-200">
                {title}
            </p>
            <p className="text-gray-600 text-xs md:text-sm font-medium mt-1">
                {Price}
            </p>
        </div>
    </div>
);

export default CheckupCard;