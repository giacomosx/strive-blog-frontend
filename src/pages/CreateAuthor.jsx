import Layout from "../layout/Layout";
import React, {useState} from "react";
import Button from "../components/button/Button";
import {Link} from "react-router-dom";
import ErrorBlock from "../components/errorBlock/ErrorBlock";
import ResponseMessage from "../components/responsemessage/ResponseMessage";
import DotsLoader from "../components/dotsloader/DotsLoader";
import axios from "axios";

const CreateAuthor = () => {
    const [author, setAuthor] = useState({})
    const [loading, setLoading] = useState(false);
    const [success, isSuccess] = useState(null);
    const [error, isError] = useState(false);
    const [avatarPath, setAvatarPath] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [errorValidation, setErrorValidation] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const handleFile = (e) => {
        const file = e.target.files[0];
        setAvatar(file)
        setDisabled(false)
    }

    const handleChange = e => {
        setErrorValidation(false)
        setAuthor({
            ...author,
            [e.target.name]: e.target.value.trim()
        });
    }

    const uploadFile = async () => {
        setLoading(true);
        try {
            const avatarInput = new FormData();
            avatarInput.append("image", avatar);

            const response = await axios.post(process.env.REACT_APP_BASE_URL + "/authors/avatar", avatarInput, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response

            setAvatarPath((data.data.source).toString())

            setLoading(false)

        } catch (error) {
            isError(error.response.data.message);
            console.error(error);
        }
    }

    const sendPost = async () => {
        if (!avatarPath || !author.name || !author.lastname || !author.email || !author.password) {
            setErrorValidation(true);
            return
        }

        setLoading(true);

        const body = {
            ...author,
            avatar: avatarPath
        }

        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + '/authors/create', body, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.data

            isSuccess(data)

        } catch (e) {
            console.error(e)
            isError(e.response.data.message)
            setLoading(true)
        }

    }

    const handleRetry = () => {
        setLoading(false)
        isError(false)
    }

    return (
        <Layout>
            <div className={`w-full font-mono px-4 relative`}>
                <h3 className={`text-3xl text-zinc-800 mt-4 mb-6 text-center`}>Become an author</h3>
                {loading && !success && !error && <DotsLoader />}
                {success && <ResponseMessage>Great! You are now an author 🚀 <br/>
                    Check your email for the confirm and back to the&nbsp;
                    <Link className={'underline'} to={'/login'}>login page</Link> </ResponseMessage>}
                {error && <ResponseMessage>Ops! {error}  ❌ <br />
                    <span className={'underline cursor-pointer'} onClick={handleRetry}>Retry</span> </ResponseMessage>}

                <form className={`w-full flex flex-col gap-4 mb-8 mt-8 transition-all ${loading ? 'blur' : ''}`}
                      encType='multipart/form-data'>
                    <label htmlFor="title" className={'text-lg font-bold '}>Upload a distinctive avatar:</label>
                    <div className="container flex flex-wrap gap-4 items-center ">
                        <input type="file" name={'image'} onChange={handleFile}
                               className={`shrink-0 w-3/4 text-zinc-500 text-sm `}/>
                        <Button disabled={disabled} titleBtn={'Save'} onClick={uploadFile} type={'button'}/>
                    </div>
                    {avatarPath && <span className={'text-sm text-zinc-500'}>Avatar saved ✅</span>}
                    {errorValidation && !avatarPath && <ErrorBlock>Avatar required!</ErrorBlock>}
                    {error && <span className={'text-sm text-zinc-500'}>Ops! Upload failed 🔴 </span>}


                    <label htmlFor="name" className={'text-lg font-bold mt-4'}>Insert your name:</label>
                    <input
                        onChange={handleChange}
                        name="name"
                        className={`px-3 py-4 bg-gray-100 h-full flex-grow focus-visible:outline-zinc-800 ${errorValidation && !author.name ? 'border border-red-600' : 'border-none'}`}
                        type='text'
                        placeholder="Es. Jhon"/>
                    {errorValidation && !author.name && <ErrorBlock>Name required!</ErrorBlock>}

                    <label htmlFor="lastname" className={'text-lg font-bold mt-4'}>Insert your lastname:</label>
                    <input
                        onChange={handleChange}
                        name="lastname"
                        className={`px-3 py-4 bg-gray-100 h-full flex-grow focus-visible:outline-zinc-800 ${errorValidation && !author.name ? 'border border-red-600' : 'border-none'}`}
                        type='text'
                        placeholder="Es. Snow"/>
                    {errorValidation && !author.lastname && <ErrorBlock>Lastname required!</ErrorBlock>}

                    <label htmlFor="email" className={'text-lg font-bold mt-4'}>Insert your email:</label>
                    <input
                        onChange={handleChange}
                        name="email"
                        className={`px-3 py-4 bg-gray-100 h-full flex-grow focus-visible:outline-zinc-800 ${errorValidation && !author.name ? 'border border-red-600' : 'border-none'}`}
                        type='email'
                        placeholder="Es. jhon.snow@youknow.it"/>
                    {errorValidation && !author.email && <ErrorBlock>Email Required!</ErrorBlock>}

                    <label htmlFor="email" className={'text-lg font-bold mt-4'}>Insert a password:</label>
                    <input
                        onChange={handleChange}
                        name="password"
                        className={`px-3 py-4 bg-gray-100 h-full flex-grow focus-visible:outline-zinc-800 ${errorValidation && !author.name ? 'border border-red-600' : 'border-none'}`}
                        type='password'
                        placeholder="..."/>
                    {errorValidation && !author.password && <ErrorBlock>Password Required!</ErrorBlock>}

                    <label htmlFor="name" className={'text-lg font-bold mt-4'}>Insert your birth date:</label>
                    <input
                        onChange={handleChange}
                        name="birth_date"
                        className='mb-4 px-3 py-4 bg-gray-100 h-full flex-grow focus-visible:outline-zinc-800'
                        type='text'
                        placeholder="Es. 13-06-1989"/>

                    <Button addingClass={'hover:rotate-0'} titleBtn={'Apply'} onClick={sendPost} type={'button'}/>
                </form>
            </div>
        </Layout>
    )
}

export default CreateAuthor;