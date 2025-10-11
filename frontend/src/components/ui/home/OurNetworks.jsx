import React, { useState } from 'react';
import Icon from '../../Icon';

// --- Data for different network locations ---
const locations = [
    {
        id: 'ahmedabad',
        name: 'Ahmedabad',
        address: '108, Westface, Hebatpur Rd, near Baghban Party Plot, Thaltej, Ahmedabad, Gujarat 380059',
        phone: '9099045241',
        email: 'endoallergy@yahoo.com',
        coords: { top: '55%', left: '20%' },
    },
    {
        id: 'jodhpur',
        name: 'Jodhpur',
        address: '45, Sunshine Complex, Pali Road, Jodhpur, Rajasthan 342001',
        phone: '9876543210',
        email: 'contact.jodhpur@example.com',
        coords: { top: '25%', left: '30%' },
    },
    {
        id: 'gwalior',
        name: 'Gwalior',
        address: '7, City Center, Near Railway Station, Gwalior, Madhya Pradesh 474002',
        phone: '8765432109',
        email: 'contact.gwalior@example.com',
        coords: { top: '30%', left: '68%' },
    },
    {
        id: 'jaipur',
        name: 'Jaipur',
        address: '12, Pink City Plaza, Tonk Road, Jaipur, Rajasthan 302015',
        phone: '7654321098',
        email: 'contact.jaipur@example.com',
        coords: { top: '42%', left: '48%' },
    },
    {
        id: 'kota',
        name: 'Kota',
        address: '88, Education Hub, Jhalawar Road, Kota, Rajasthan 324005',
        phone: '6543210987',
        email: 'contact.kota@example.com',
        coords: { top: '58%', left: '45%' },
    },
    {
        id: 'vadodara',
        name: 'Vadodara',
        address: '21, Alkapuri, R.C. Dutt Road, Vadodara, Gujarat 390007',
        phone: '5432109876',
        email: 'contact.vadodara@example.com',
        coords: { top: '70%', left: '28%' },
    },
    {
        id: 'anand',
        name: 'Anand',
        address: '15, Milk Capital Complex, Station Road, Anand, Gujarat 388001',
        phone: '4321098765',
        email: 'contact.anand@example.com',
        coords: { top: '65%', left: '22%' },
    },
    {
        id: 'indore',
        name: 'Indore',
        address: '3, AB Road, Near Vijay Nagar Square, Indore, Madhya Pradesh 452010',
        phone: '3210987654',
        email: 'contact.indore@example.com',
        coords: { top: '80%', left: '46%' },
    },
    {
        id: 'bhopal',
        name: 'Bhopal',
        address: '10, Lake View Road, MP Nagar, Bhopal, Madhya Pradesh 462011',
        phone: '2109876543',
        email: 'contact.bhopal@example.com',
        coords: { top: '70%', left: '60%' },
    },
];


const locationPath = "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z";
const phonePath = "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z";
const emailPath = "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";



/**
 * A component to display company networks with a contact card and a map.
 */
export default function OurNetworks() {
    // State to hold the currently selected location, defaults to Ahmedabad
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    return (
        <div className="bg-gradient-to-r from-purple-200 to-white w-full py-12 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-indigo-900">Our Networks</h2>
                    <p className="mt-2 text-lg text-gray-600">Our single goal: fast, accurate, affordable diagnostics for every patient.</p>
                </div>

                {/* Main Content: Card and Map */}
                <div className="flex flex-col md:flex-row gap-10 items-center">

                    {/* Left Side: Contact Card (now dynamic) */}
                    <div className="w-full md:w-1/3 bg-white/50 border border-purple-300 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                        <h3 className="text-2xl font-bold text-indigo-900 mb-6">{selectedLocation.name}</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <Icon path={locationPath} className="h-6 w-6 text-red-500 flex-shrink-0" />
                                <span className="text-gray-700">{selectedLocation.address}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Icon path={phonePath} className="h-6 w-6 text-red-500 flex-shrink-0" />
                                <a href={`tel:${selectedLocation.phone}`} className="text-gray-700 hover:text-indigo-600">{selectedLocation.phone}</a>
                            </li>
                            <li className="flex items-center gap-4">
                                <Icon path={emailPath} className="h-6 w-6 text-red-500 flex-shrink-0" />
                                <a href={`mailto:${selectedLocation.email}`} className="text-gray-700 hover:text-indigo-600">{selectedLocation.email}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Right Side: Map with Dynamic Pins */}
                    <div className="w-full md:w-2/3 relative">
                        <img
                            src="https://i.imgur.com/K2rfDEs.png" // Using a transparent map image
                            alt="Map of our networks across India"
                            className="w-full h-auto rounded-lg object-contain"
                        />
                        {/* Mapping over locations to create a pin for each */}
                        {locations.map((loc) => (
                            <button
                                key={loc.id}
                                onClick={() => setSelectedLocation(loc)}
                                style={{ top: loc.coords.top, left: loc.coords.left }}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 p-1"
                                aria-label={`Show details for ${loc.name}`}
                            >
                                <Icon path={locationPath} className="h-6 w-6 text-red-500 flex-shrink-0" />
                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs font-semibold text-indigo-900 whitespace-nowrap">{loc.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

