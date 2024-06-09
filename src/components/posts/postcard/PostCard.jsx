import React from "react";
import Button from "../../button/Button";
import {useNavigate} from "react-router-dom";
import Avatar from "../../avatar/Avatar";

const PostCard = ({title, category, content, img, author, date, avatar, id}) => {
    const navigate = useNavigate();
    const parsedDate = new Date(date);

    return (
        <div className="card border-b border-gray-200 w-full px-4 mb-8 pb-8 md:border-0">
            <div className="card__cover bg-white shadow-retro border border-zinc-800 w-full mb-4 overflow-hidden h-48">
                <img src={img} className="card__img w-full h-full object-cover" alt={title}/>
            </div>
            <div className="card__body flex flex-col gap-4">
                <span
                    className={'text-zinc-500 text-xs block'}>
                        Published:&nbsp;
                    {parsedDate.getDate()}-{parsedDate.getMonth()}-{parsedDate.getFullYear()}
                </span>

                <div className="card__headings">
                    <h2 className="text-zinc-800 text-xl">{title}</h2>
                </div>
                <div className="card__content line-clamp-3 text-ellipsis ">
                    <p className="text-zinc-700 text-base">{content}</p>
                </div>
                <div className="card__metadata ">
                    <span className="card__category px-4 py-2 bg-gray-100 text-zinc-700 text-sm">#{category}</span>
                </div>
                <div className="card__actions flex justify-between items-center mt-4">
                    <Avatar avatarPath={author.avatar} name={author.name} lastname={author.lastname}  />
                    <Button titleBtn={"Read more"} onClick={() => navigate(`/post/${id}`)}/>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
