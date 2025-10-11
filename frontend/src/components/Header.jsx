import Location from "./ui/header/Location";
import Logo from "./ui/header/Logo";
import NavBar from "./ui/header/NavBar";
import SearchBar from "./ui/header/SearchBar";
import SocialIcons from "./ui/header/SocialIcons ";

// components/Header/Header.jsx
const Header = () => (
    <header className="bg-white text-gray-800 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div className="sm:hidden">
                    <NavBar />
                </div>
                <Logo />
                <div className="hidden sm:block w-full">
                    <SearchBar />
                </div>
                <div className="flex items-center space-x-4">
                    <Location />
                    <div className="hidden sm:block">
                        <SocialIcons />
                    </div>
                </div>
            </div>
            <div className="flex justify-between sm:justify-left">
                <div className="w-full sm:hidden mb-4">
                    <SearchBar />
                </div>
                <div className="hidden sm:block">
                    <NavBar />
                </div>
            </div>
        </div>
    </header>
);

export default Header;
