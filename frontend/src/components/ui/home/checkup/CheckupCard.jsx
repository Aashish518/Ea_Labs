import Image from "../../common/Image";

const CheckupCard = ({ imageUrl, title, Price, onClick }) => (
    <div
        onClick={onClick}
        className="flex flex-col items-center text-center">
        <div className={`bg-gradient-to-br from-indigo-200 to-indigo-400 p-2 rounded-3xl shadow-lg w-full`}>
            <Image
                src={imageUrl}
                alt={title}
                className="w-auto h-auto rounded-2xl aspect-square"
            />
        </div>
        <div className="mt-4 px-2">
            <p className="font-semibold text-indigo-900 text-sm md:text-base">{title}</p>
            <span className="mt-2 inline-block text-indigo-800 border border-indigo-700 rounded-full px-3 py-1 text-xs md:text-sm font-medium">
                {Price}
            </span>
        </div>
    </div>
);

export default CheckupCard;
