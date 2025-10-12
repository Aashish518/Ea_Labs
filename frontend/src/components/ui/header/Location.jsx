import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Icon from "../../Icon";
import Button from "../common/Button";
import { getLocations } from "../../../api/apis/location";
import { useLocation } from "../../../Context/LocationContext";

const Location = () => {
    const [open, setOpen] = useState(false);
    const { selectedLocation, setSelectedLocation } = useLocation();

    // Fetch locations via TanStack Query
    const { data: locations = [], isLoading, isError } = useQuery({
        queryKey: ["locations"],
        queryFn: getLocations,
    });

    const handleSelect = (loc) => {
        setSelectedLocation(loc);
        setOpen(false);
    };

    useEffect(() => {
        if (!selectedLocation && locations.length > 0) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await res.json();

                        // Get city/town/village
                        const city = data.address.city || data.address.town || data.address.village || "";

                        console.log("Detected city:", city);

                        // Loose match with backend locations
                        const matchedLoc = locations.find(loc =>
                            loc.locationName.toLowerCase().includes(city.toLowerCase()) ||
                            city.toLowerCase().includes(loc.locationName.toLowerCase())
                        );

                        if (matchedLoc) {
                            setSelectedLocation(matchedLoc);
                        } else {
                            // fallback default
                            const defaultLoc = locations.find(loc => loc.locationName === "nnn") || locations[0];
                            setSelectedLocation(defaultLoc);
                        }
                    } catch (err) {
                        console.error("Reverse geocoding error:", err);
                        const defaultLoc = locations.find(loc => loc.locationName === "nnn") || locations[0];
                        setSelectedLocation(defaultLoc);
                    }
                }, () => {
                    // User denied location access
                    const defaultLoc = locations.find(loc => loc.locationName === "nnn") || locations[0];
                    setSelectedLocation(defaultLoc);
                });
            } else {
                // Geolocation unsupported
                const defaultLoc = locations.find(loc => loc.locationName === "nnn") || locations[0];
                setSelectedLocation(defaultLoc);
            }
        }
    }, [locations, selectedLocation, setSelectedLocation]);

    return (
        <div className="relative">
            {/* Location Button */}
            <Button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center space-x-1 px-2 py-1 rounded transition duration-200 hover:scale-105 hover:shadow-md hover:bg-gradient-to-r hover:from-pink-100 hover:to-white hover:border hover:border-[#203270] hover:rounded-md"
            >
                <Icon
                    path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    className="w-5 h-5 text-[#203270]"
                />

                <span className="text-sm font-bold">
                    {selectedLocation ? selectedLocation.locationName : "Select Location"}
                </span>

                <Icon
                    path="M19 9l-7 7-7-7"
                    className={`w-4 h-4 rounded-full bg-blue-900 text-white transform transition-transform ${open ? "rotate-180" : ""}`}
                />
            </Button>

            {/* Dropdown List */}
            <div
                className={`absolute right-0 mt-1 w-40 bg-white border rounded shadow-md z-10 transform transition-all duration-300 ease-out origin-top ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
            >
                {isLoading && (
                    <p className="px-3 py-2 text-sm text-gray-500">Loading...</p>
                )}
                {isError && (
                    <p className="px-3 py-2 text-sm text-red-500">Error loading data</p>
                )}
                {locations?.length > 0 &&
                    locations.map((loc) => (
                        <div
                            key={loc._id}
                            onClick={() => handleSelect(loc)}
                            className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                            {loc.locationName}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Location;
