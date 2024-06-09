import React, {useEffect} from 'react'
import PostCard from '../postcard/PostCard'
import {useDispatch, useSelector} from "react-redux";
import {
    searchResultsData,
    searchResultsLoading,
    searchResultsError,
    getData
} from '../../../redux/resultsSlice'
import DotsLoader from "../../dotsloader/DotsLoader";
import ResponseMessage from "../../responsemessage/ResponseMessage";

const PostContainer = () => {
    const isLoading = useSelector(searchResultsLoading)
    const isError = useSelector(searchResultsError)
    const posts = useSelector(searchResultsData)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    return (
        <>
            {isLoading && <DotsLoader/>}
            {!isLoading && posts &&
                <h3 className={'text-3xl px-4 text-zinc-800 mt-4 mb-6 text-center md:text-2xl md:text-start'}>Recent
                    Posts</h3>}
            <div className={'grid gap-4  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-2'}>
                {!isLoading && posts && posts.map((post) => (
                    <PostCard
                        key={'result-' + post._id}
                        id={post._id}
                        title={post.title}
                        category={post.category}
                        author={post.authorId}
                        content={post.content}
                        img={post.cover}
                        date={post.createdAt}
                        avatar={post.authorId.avatar}
                    />
                ))}
                {isError && <ResponseMessage>Ops! There was an error! ❌</ResponseMessage>}

            </div>
        </>
    )
}

export default PostContainer