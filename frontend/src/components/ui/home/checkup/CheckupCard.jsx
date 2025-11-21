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

  <p className="inline-block mt-1 px-3 py-1 border border-gray-400 rounded-md bg-white text-black md:text-sm font-medium">
    {Price}
  </p>
</div>

    </div>
);

export default CheckupCard;