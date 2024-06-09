import React from 'react';

const Avatar = ({avatarPath, alt, name, lastname, textWhite}) => {
    return (
        <div className="card__avatar flex items-center gap-2">
            <div className="avatar  w-8 rounded-full overflow-hidden">
                <img src={avatarPath} alt={alt} className="object-cover w-full "/>
            </div>
            <span className={`${textWhite ? 'text-white' :"text-zinc-500 text-xs"}`}>{name} {lastname}</span>
        </div>
    );
};

export default Avatar;