import CheckupCard from "./CheckupCard";

const CheckupSection = ({ title, checkups }) => (
    <div className="w-full">
        <h2 className="text-xl lg:text-2xl font-bold text-indigo-900 mb-6 text-center">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {checkups.map((checkup) => (
                <CheckupCard
                    key={checkup.id}
                    imageUrl={checkup.imageUrl}
                    title={checkup.title}
                    ageRange={checkup.ageRange}
                    gradient={checkup.gradient}
                />
            ))}
        </div>
    </div>
);

export default CheckupSection;
