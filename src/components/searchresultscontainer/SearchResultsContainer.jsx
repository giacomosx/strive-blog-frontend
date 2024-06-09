import React from 'react';
import {useSelector} from "react-redux";
import {searchResultByQuery, searchResultsError, searchResultsLoading} from "../../redux/resultsSlice";
import DotsLoader from "../dotsloader/DotsLoader";
import PostCard from "../posts/postcard/PostCard";

const SearchResultsContainer = () => {
    const resultsData = useSelector(searchResultByQuery)
    const isLoading = useSelector(searchResultsLoading)
    const isError = useSelector(searchResultsError)


    return (
        <>
            {isLoading && <DotsLoader/>}
            {!isLoading && resultsData &&
                <h3 className={'text-3xl px-4 text-zinc-800 mt-4 mb-6 text-center'}>Results:</h3>}
            <div className={'grid gap-4  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-2'}>

                {!isLoading && resultsData && resultsData.map((post, index) => (
                    <PostCard
                        key={'result-' + index}
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
                {isError && <span
                    className={'text-center absolute top-1/2 translate-y-1/2 w-full'}>Ops! There was an error! ❌ </span>}
            </div>
        </>
    );
};

export default SearchResultsContainer;