import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // import Link and useLocation
import SocialIcons from "./SocialIcons "; // Make sure path is correct
import Button from "../common/Button";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // get current path

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Test Menu", href: "/test-menu" },
        { name: "Resources", href: "/resources" },
        { name: "About Us", href: "/aboutus" },
        { name: "Contact Us", href: "/contactus" },
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
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-700 focus:outline-none"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 w-full h-full bg-white shadow-md z-50 transform transition-all duration-700 ease-out 
    ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
            >
                {/* Close Button */}
                <Button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 text-gray-700 focus:outline-none z-50"
                >
                    <X size={28} />
                </Button>

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
