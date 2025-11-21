    import { useAtom } from "jotai";
    import Icon from "../../Icon";
    import Input from "../common/Input";
    import { searchDataAtom } from "../../../store/SearchStore";
    import { useState } from "react";
    import Button from "../common/Button";
    import { useNavigate } from "react-router-dom";


    const SearchBar = () => {
        const [searchData, setSearchData] = useAtom(searchDataAtom);
        const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

        const handleChange = (e) => setInputValue(e.target.value);

        const handleSearchClick = () => {
                navigate("/");
                setSearchData(inputValue.trim());
        };

        const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
      handleSearchClick();
    }
  };

        return (
            <div className="md:flex items-center justify-center grow">
                <div className="relative w-full max-w-lg">
                    <Input
                        type="text"
                        placeholder="Search tests, packages, or categories..."
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} 
                        className="w-full py-2 pl-4 pr-10 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-[#203270]"
                    />

                    {/* Clickable search icon */}
                    <Button
                        type="button"
                        onClick={handleSearchClick}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#203270] hover:text-[#16254f] transition"
                    >
                        <Icon
                            path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            className="w-5 h-5"
                        />
                    </Button>
                </div>
            </div>
        );
    };

    export default SearchBar;
