import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import SearchResultsContainer from "../components/searchresultscontainer/SearchResultsContainer";
import Sidebar from "./sidebar/Sidebar";
import TopHeader from "../components/topheader/TopHeader";

const Layout = ({children}) => {
    return (
        <>
            <TopHeader/>
            <Header/>
            <div className="flex columns-2 font-mono md:container md:mx-auto md:mt-4">
                <Sidebar/>
                <Main>
                    <SearchResultsContainer/>
                    {children}
                </Main>
            </div>
            <Footer/>
        </>
    );
};

export default Layout;
