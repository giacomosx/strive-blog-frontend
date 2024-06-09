import React from 'react';
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";

const AuthorCard = ({author}) => {
    const navigate = useNavigate();
    return (
        <div key={author._id} className="list__avatar flex items-center gap-2 py-4 border-b border-gray-200">
            <div className="container flex items-center gap-4">
                <div className="avatar h-12  w-12 rounded-full overflow-hidden">
                    <img src={author.avatar} alt="" className="object-cover w-full "/>
                </div>
                <span className=" text-zinc-500 text-base">{author.name} {author.lastname}</span>
            </div>
            <Button addingClass={'shrink-0'} titleBtn={"See posts"}
                    onClick={() => navigate(`/posts/${author._id}`)}/>
        </div>
    );
};

export default AuthorCard;