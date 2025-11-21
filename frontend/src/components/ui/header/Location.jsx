import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "../common/Button";
import Icon from "../../Icon";
import { getLocations } from "../../../api/apis/location";
import { useAtom } from "jotai";
import { selectedLocationAtom } from "../../../store/LocationStore";
import NiceAlert from "../common/Alertbbox";

const Location = () => {
    const [open, setOpen] = useState(false);
    const [hasUserSelected, setHasUserSelected] = useState(false);
    const [selectedLocation, setSelectedLocation] = useAtom(selectedLocationAtom);
    const [alertMsg, setAlertMsg] = useState(null);


    const { data: locations = [], isLoading, isError } = useQuery({
        queryKey: ["locations"],
        queryFn: getLocations,
    });

    const handleSelect = (loc) => {
        setSelectedLocation(loc);
        setOpen(false);
        setHasUserSelected(true);
    };

    useEffect(() => {
        if (locations.length === 0 || hasUserSelected) return;

        const detectLocation = async () => {
            if (!navigator.geolocation) {
                const fallback = locations.find((loc) => loc.locationName === "Ahmedabad") || locations[0];
                setSelectedLocation(fallback);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const res = await fetch(
                            `${import.meta.env.VITE_BACK_URL}/api/location/reverse-geocode?lat=${latitude}&lon=${longitude}`
                        );
                        const data = await res.json();
                        const city = data.city;

                        const matchedLoc = city
                            ? locations.find((loc) => loc.locationName.toLowerCase() === city.toLowerCase())
                            : null;

                        const finalLoc =
                            matchedLoc || locations.find((loc) => loc.locationName === "Ahmedabad") || locations[0];

                        setSelectedLocation(finalLoc);
                        if (matchedLoc) {
                            setAlertMsg(`Your current location is ${finalLoc.locationName}. If you want, you can change it.`);
                        } else {
                            setAlertMsg(`Your current city "${city}" does not match our service locations. Default location selected: ${finalLoc.locationName}.`);
                        }
                    } catch (err) {
                        console.error("Reverse geocoding error:", err);
                        const fallback = locations.find((loc) => loc.locationName === "Ahmedabad") || locations[0];
                        setSelectedLocation(fallback);
                    }
                },
                () => {
                    setAlertMsg("Please turn on your device's location or select a location manually to view tests available in your area.");
                    const fallback = locations.find((loc) => loc.locationName === "Ahmedabad") || locations[0];
                    setSelectedLocation(fallback);
                }
            );
        };

        detectLocation();
    }, [locations, hasUserSelected, setSelectedLocation]);

    // ✅ Get short name (first 3 letters capitalized)
    const getShortName = (name) => {
        if (!name) return "Loc";
        return name.length > 3 ? name.slice(0, 3).toUpperCase() : name.toUpperCase();
    };

    return (
        <div className="relative">
            <Button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center space-x-1 px-2 py-1 rounded transition duration-200 hover:scale-105 hover:shadow-md hover:bg-linear-to-r hover:from-pink-100 hover:to-white hover:border hover:border-[#203270] hover:rounded-md"
            >
                <Icon
                    path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    className="w-5 h-5 text-[#203270]"
                />

                {/* ✅ Full name on md+ screens, short on mobile */}
                <span className="text-sm font-bold">
                    <span className="hidden sm:inline">
                        {selectedLocation ? selectedLocation.locationName : "Select Location"}
                    </span>
                    <span className="inline sm:hidden">
                        {selectedLocation ? getShortName(selectedLocation.locationName) : "LOC"}
                    </span>
                </span>

                <Icon
                    path="M19 9l-7 7-7-7"
                    className={`w-4 h-4 rounded-full bg-blue-900 text-white transform transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </Button>

            <div
                className={`absolute right-0 mt-1 w-40 bg-white border rounded shadow-md z-10 transform transition-all duration-300 ease-out origin-top ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
            >
                {isLoading && <p className="px-3 py-2 text-sm text-gray-500">Loading...</p>}
                {isError && <p className="px-3 py-2 text-sm text-red-500">Error loading data</p>}
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
            {alertMsg && (
  <NiceAlert
    message={alertMsg}
    onClose={() => setAlertMsg(null)}
    type="info"
  />
)}

        </div>
    );
};

export default Location;
