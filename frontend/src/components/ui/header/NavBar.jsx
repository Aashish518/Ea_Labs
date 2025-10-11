import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // import Link and useLocation
import SocialIcons from "./SocialIcons "; // Make sure path is correct

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // get current path

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Test Menu", href: "/test-menu" },
        { name: "Contact Us", href: "/contactus" },
        { name: "Recognition", href: "#" },
        { name: "Our Blogs", href: "#" },
    ];

    return (
        <nav>
            {/* Desktop Menu */}
            <div className="hidden ml-2 sm:flex items-center justify-center text-sm font-medium text-black space-x-8 py-2">
                {menuItems.map((item, i) => (
                    <Link
                        key={i}
                        to={item.href}
                        className={`transition ${location.pathname === item.href
                            ? "text-[#AA1626] font-bold"
                            : "hover:text-[#AA1626]"
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex justify-end py-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-700 focus:outline-none"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 w-full h-full bg-white shadow-md z-50 transform transition-all duration-700 ease-out ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 left-6 text-gray-700 focus:outline-none z-50"
                >
                    <X size={28} />
                </button>

                <div className="flex flex-col items-center justify-between h-full text-black pt-16">
                    {/* Navigation Links */}
                    <div className="flex flex-col items-center space-y-6">
                        {menuItems.map((item, i) => (
                            <Link
                                key={i}
                                to={item.href}
                                className={`transition ${location.pathname === item.href
                                    ? "text-[#AA1626] font-bold"
                                    : "hover:text-[#AA1626]"
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="pb-6">
                        <SocialIcons />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
