import React, {useState} from "react";
import {Logo} from "../../components/logo/Logo";
import Navbar from "../../components/navbar/Navbar";
import ToggleButton from "../../components/toggleButton/ToggleButton";
import SearchBar from "../../components/searchbar/SearchBar";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <header
                className="font-mono p-4 flex items-center justify-between md:container md:mx-auto flex-wrap">
                <Logo src={"/logo.png"} alt={"Brand Logo"} brandName={"Brand"}/>
                <ToggleButton onClick={handleClick}/>
                <Navbar
                    className={`w-full mt-4 overflow-hidden ${isOpen ? 'h-32' : 'h-0'} transition-all duration-300 ease-in-out lg:h-auto lg:w-auto lg:mt-0 lg:order-last`}/>
                <SearchBar placeholder={'Search...'}/>
            </header>

        </>
    );
};

export default Header;
