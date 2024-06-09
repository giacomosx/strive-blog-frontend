import Layout from "../layout/Layout";
import React, {useEffect, useState} from "react";
import DotsLoader from "../components/dotsloader/DotsLoader";
import AuthorCard from "../components/authorcard/AuthorCard";
import axios from "axios";

const Authors = () => {
    const [authors, setAuthors] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const getAuthors = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + '/authors')
            const data = await response.data.authors;
            setAuthors(data)
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false)
            setError(e.message)
        }
    }

    useEffect(() => {
        getAuthors();
    }, [])

    return (
        <Layout>
            <div className="px-4">
                {loading && <DotsLoader/>}
                {!loading && authors &&
                    <h3 className={'text-3xl px-4 text-zinc-800 mt-4 mb-6 text-center'}>Our cool authors</h3>}
                {!loading && authors && (
                    authors.map((author) => (<AuthorCard key={author._id} author={author} />))
                )}
                {!loading && error && <span
                    className={'text-center top-1/2 translate-y-1/2 w-full h-full block'}>Ops! {error}! ❌ </span>}
            </div>
        </Layout>
    )
}

export default Authors;