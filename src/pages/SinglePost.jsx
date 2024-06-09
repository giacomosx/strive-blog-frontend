import Layout from "../layout/Layout";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DotsLoader from "../components/dotsloader/DotsLoader";
import axios from "axios";

const SinglePost = () => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState();
    const [parsedDate, setParsedDate] = useState(null);
    const params = useParams();

    const getSinglePost = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/blogPosts/${params.id}`);
            const data = await response.data
            setPost(data)
            setLoading(false)
            setParsedDate(new Date(data.createdAt))

        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {

        getSinglePost()

    }, [])

    return (
        <Layout>
                {loading && <DotsLoader />}
                {!loading && post && (
                    <>
                        <h3 className={'text-3xl px-4 text-zinc-800 mt-4 mb-6'}>{post.title}</h3>
                        <div className="card w-full px-4 mb-8 pb-4">
                            <span className={'text-zinc-500 text-xs block mb-4'}>
                                    Published:&nbsp;
                                {parsedDate.getDate()}-{parsedDate.getMonth()}-{parsedDate.getFullYear()}
                            </span>
                            <div className="card__cover w-full mb-4">
                                <img src={post.cover} className="card__img object-cover aspect-video "
                                     alt={post.title}/>
                            </div>
                            <div className="card__body flex flex-col gap-4">

                                <div className="card__avatar flex items-center gap-2">
                                    <div className="avatar  w-8 rounded-full overflow-hidden">
                                        <img src={post.authorId.avatar} alt="" className="object-cover w-full "/>
                                    </div>
                                    <span
                                        className="text-zinc-500 text-xs">{post.authorId.name} {post.authorId.lastname}</span>
                                </div>
                                <div className="card__content ">
                                    <p className="text-zinc-700 text-base">{post.content}</p>
                                </div>
                                <div className="card__metadata ">
                                <span
                                    className="card__category px-4 py-2 bg-gray-100 text-zinc-700 text-sm">#{post.category}</span>
                                </div>

                            </div>
                        </div>
                    </>
                )}
        </Layout>
    )
}

export default SinglePost;