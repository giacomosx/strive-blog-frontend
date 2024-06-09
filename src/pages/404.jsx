import React from 'react';
import Layout from "../layout/Layout";
import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <Layout>
            <div className="flex flex-col gap-6 justify-center items-center h-full w-full ">
                <span className={'text-lg'}>Ops! Page not found.</span>
                <span className="text-8xl">404</span>
                <Link to={'/'} className={'underline'}>Back to the homepage</Link>
            </div>
        </Layout>
    );
};

export default Page404;