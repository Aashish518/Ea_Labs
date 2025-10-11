// components/Header/SearchBar.jsx

import Icon from "../../Icon";
import Input from "../common/Input";


const SearchBar = () => (
    <div className="md:flex items-center justify-center flex-grow">
        <div className="relative w-full max-w-lg">
            <Input
                type="text"
                placeholder="Search the Lab test"
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#203270]"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Icon
                    path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    className="w-5 h-5 text-[#203270]"
                />
            </div>
        </div>
    </div>
);

export default SearchBar;
