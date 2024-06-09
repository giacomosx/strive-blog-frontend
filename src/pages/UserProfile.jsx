import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout";
import AxiosApi from "../api/axiosApi";
import ResponseMessage from "../components/responsemessage/ResponseMessage";
import {Link} from "react-router-dom";

const UserProfile = () => {
    const [authors, setAuthors] = useState(null);
    const [error, setError] = useState(null);

    const api = new AxiosApi()

    const getMe = async () => {
        try {
            const data = await api.get('/authors/me')
            setAuthors(await data)

        } catch (e) {
            setError(e.status)
        }

    }

    useEffect(() => {
        getMe()
        // eslint-disable-next-line
    }, [])


    return (
        <Layout>
            <div className="flex items-center justify-center h-full w-full">

                {error === 401 && <ResponseMessage>You Must be logged! <br /> <Link className={'underline'} to={'/login'}>Login</Link></ResponseMessage>}

                {!error && authors && (
                    <>
                        <div className="flex h-full w-full justify-center items-center md:items-start">
                            <div className="card px-4 flex flex-col items-center gap-4 mt-8">
                                <img src={authors.avatar} alt="avatar" className="rounded-full max-w-36"/>
                                <div className="details text-center">
                                    <h3 className={'text-2xl mb-2'}>{authors.name} {authors.lastname}</h3>
                                    <p className={'text-zinc-500 mb-2'}> {authors.email}</p>
                                    <p className={'text-zinc-700'}>Author since {new Date(authors.createdAt).getFullYear()}</p>
                                </div>
                            </div>
                        </div>

                    </>
                )}

            </div>
        </Layout>
    );
};

export default UserProfile;