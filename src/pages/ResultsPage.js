import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout";
import DotsLoader from "../components/dotsloader/DotsLoader";
import ResponseMessage from "../components/responsemessage/ResponseMessage";
import PostCard from "../components/posts/postcard/PostCard";
import {useParams} from "react-router-dom";
import AxiosApi from "../api/axiosApi";

const ResultsPage = () => {
    const {category} = useParams()
    const api = new AxiosApi()

    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

    const getPosts = async () => {
        setLoading(true)

        try {
            const response = await api.get(`/blogPosts/category/${category}`);
            const data = await response

            setPosts(data);
            setLoading(false);

        } catch (e) {
            setLoading(false)
            setError(e.message)
        }
    }

    useEffect(() => {
        getPosts()
    }, [category])

    return (
        <Layout>
            {loading && <DotsLoader/>}
            {error && <span
                className={'text-center absolute top-1/2 translate-y-1/2 w-full'}>Ops! {error}! ❌ </span>}
            {!loading && posts &&
                <h3 className={'text-3xl px-4 text-zinc-800 mt-4 mb-6 text-center'}>All posts about {category} </h3>}
            <div className={'grid gap-4  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-2'}>
                {!loading && posts && posts.length === 0 &&
                    <ResponseMessage>Not posts yet!</ResponseMessage>}
                {!loading && posts && posts.map((post) => (
                        <>
                            <PostCard
                                key={'author-posts-' + post._id}
                                id={post._id}
                                title={post.title}
                                category={post.category}
                                author={post.authorId}
                                content={post.content}
                                img={post.cover}
                                date={post.createdAt}
                            />

                        </>
                    )
                )
                }
            </div>
        </Layout>
    );
};

export default ResultsPage;
