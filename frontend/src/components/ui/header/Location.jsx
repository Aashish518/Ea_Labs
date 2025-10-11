import { useState } from "react";
import Icon from "../../Icon";

const Location = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Ahmedabad");

    // Add short codes for mobile
    const locations = [
        { name: "Ahmedabad", short: "AHD" },
        { name: "Mumbai", short: "MUM" },
        { name: "Delhi", short: "DEL" },
        { name: "Bangalore", short: "BLR" },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-1 px-2 py-1 rounded transition duration-200 hover:scale-105 hover:shadow-md hover:bg-gradient-to-r hover:from-pink-100 hover:to-white hover:border hover:border-[#203270] hover:rounded-md"
            >
                <Icon
                    path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    className="w-5 h-5 text-[#203270]"
                />
                {/* Show short name on mobile, full name on larger screens */}
                <span className="text-sm font-bold">
                    <span className="sm:inline hidden">
                        {locations.find((loc) => loc.name === selected)?.name}
                    </span>
                    <span className="inline sm:hidden">
                        {locations.find((loc) => loc.name === selected)?.short}
                    </span>
                </span>
                <Icon
                    path="M19 9l-7 7-7-7"
                    className={`w-4 h-4 rounded-full bg-blue-900 text-white transform transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            <div
                className={`absolute right-0 mt-1 w-40 bg-white border rounded shadow-md z-10 transform transition-all duration-300 ease-out origin-top ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
            >
                {locations.map((loc) => (
                    <div
                        key={loc.name}
                        onClick={() => {
                            setSelected(loc.name);
                            setOpen(false);
                        }}
                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                        {/* Full name on desktop, short name on mobile */}
                        <span className="sm:inline hidden">{loc.name}</span>
                        <span className="inline sm:hidden">{loc.short}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Location;
