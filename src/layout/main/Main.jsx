import React from "react";

const Main = ({children}) => {
    return (
        <main
            className="min-h-[calc(100dvh-248px)] w-full mt-2 md:min-h-[calc(100dvh-200px)] md:w-3/4 md:border-s md:border-gray-200">
            {children}
        </main>
    );
};

export default Main;
