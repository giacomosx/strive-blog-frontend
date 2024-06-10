import React from 'react';
import {categoryList} from '../../data/data';
import {Link} from "react-router-dom";

const CategoryWidget = () => {
    return (
        <div className='widget'>
            <h3 className={'text-3xl text-zinc-800 mb-6 md:text-2xl'}>Categories</h3>
            <ul className={'flex flex-col gap-6 text-zinc-500'}>
                {categoryList.map((category, index) => (
                    <li key={index} className={'hover:underline'}><Link to={`/category/${category}`}>{category}</Link></li>))}
            </ul>
        </div>
    );
};

export default CategoryWidget;