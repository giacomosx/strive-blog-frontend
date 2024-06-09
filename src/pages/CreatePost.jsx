import Layout from "../layout/Layout";
import React, {useState} from "react";
import Button from "../components/button/Button";
import {Link} from "react-router-dom";
import DotsLoader from "../components/dotsloader/DotsLoader";
import ResponseMessage from "../components/responsemessage/ResponseMessage";
import ErrorBlock from "../components/errorBlock/ErrorBlock";
import {useSelector} from "react-redux";
import {logState} from "../redux/loginSlice";
import axios from "axios";

const CreatePost = () => {
    const loginState = useSelector(logState);
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false);
    const [success, isSuccess] = useState(null);
    const [error, isError] = useState(null);
    const [coverPath, setCoverPath] = useState("");
    const [cover, setCover] = useState(null);
    const [errorValidation, setErrorValidation] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const handleFile = (e) => {
        const file = e.target.files[0];
        setCover(file)
        setDisabled(false)
    }

    const handleChange = e => {
        setErrorValidation(false)
        setPost({
            ...post,
            [e.target.name]: e.target.value.trim()
        });
    }

    const uploadFile = async () => {
        setLoading(true);
        try {
            const coverInput = new FormData();
            coverInput.append("image", cover);

            const response = await axios.post(process.env.REACT_APP_BASE_URL + "/blogPosts/upload", coverInput, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response

            setCoverPath((data.data.source).toString())
            setLoading(false)

        } catch (error) {
            isError(error.response.data.message)
            console.error(error)
        }
    }

    const sendPost = async () => {
        if (!coverPath || !post.category || !post.title || !post.content) {
            setErrorValidation(true)
            return
        }

        setLoading(true);

        const body = {
            ...post,
            cover: coverPath
        }

        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + '/blogPosts/create', body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
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
        setLoading(false);
        isError(false);
    }

    return (
        <Layout>
            <div className={`w-full font-mono px-4 relative`}>
                {!loginState ?
                    <ResponseMessage>You must be logged in!</ResponseMessage> :
                    <>
                        <h3 className={'text-3xl text-zinc-800 mt-4 mb-6 text-center'}>Write a new post</h3>
                        {loading && !success && !error && <DotsLoader/>}
                        {success && <ResponseMessage>Good News! Your post is live 🚀 <br/>
                            <Link className={'underline'} to={'/'}>Back to the homepage</Link></ResponseMessage>}
                        {error && <ResponseMessage>Ops! {error}...Your post is still here! ❌ <br/>
                            <span className={'underline cursor-pointer'} onClick={handleRetry}>Retry</span>
                        </ResponseMessage>}

                        <form
                            className={`w-full flex flex-col gap-4 mb-8 mt-8 transition-all ${loading ? 'blur' : ''} `}
                            encType='multipart/form-data'>
                            <label htmlFor="title" className={'text-lg font-bold '}>Put a great cover image:</label>
                            <div className="container flex flex-wrap gap-4 items-center">
                                <input type="file" name={'image'} onChange={handleFile}
                                       className={'shrink-0 w-3/4 text-zinc-500 text-sm'}/>
                                <Button disabled={disabled} titleBtn={'Save'} onClick={uploadFile} type={'button'}/>
                                {errorValidation && !coverPath && <ErrorBlock>Cover Required!</ErrorBlock>}
                                {coverPath && <span className={'text-sm text-zinc-500 block'}>Image saved ✅</span>}
                                {error && <span className={'text-sm text-zinc-500 block'}>Ops! Upload failed 🔴 </span>}
                            </div>

                            <label htmlFor="title" className={'text-lg font-bold mt-4'}>Get a title:</label>
                            <input
                                onChange={handleChange}
                                name="title"
                                className='px-3 py-4 bg-gray-100 h-full flex-grow focus-visible:outline-zinc-800'
                                type='text'
                                placeholder="Es. Why Start Programming?"/>
                            {errorValidation && !post.title && <ErrorBlock>Title Required!</ErrorBlock>}

                            <label htmlFor="category" className={'text-lg font-bold mt-4'}>Chose a category:</label>
                            <select
                                onChange={handleChange}
                                name="category"
                                className={"focus-visible:outline-none w-auto"}
                                id={"category"}>
                                <option disabled>---</option>
                                <option value="node">MongoDb</option>
                                <option value="node">Express</option>
                                <option value="react">React</option>
                                <option value="node">Node</option>
                            </select>
                            {errorValidation && !post.category && <ErrorBlock>Category Required!</ErrorBlock>}

                            <label htmlFor="content" className={'text-lg font-bold mt-4'}>Start to write:</label>
                            <textarea
                                onChange={handleChange}
                                className={'px-3 py-4 bg-gray-100 focus-visible:outline-zinc-800'}
                                name="content"
                                id="content" cols="30" rows="5"
                                placeholder={'Es. Starting to program can be one of the most rewarding and beneficial choices you can make...'}></textarea>
                            {errorValidation && !post.content && <ErrorBlock>Content Required!</ErrorBlock>}

                            <Button addingClass={'hover:rotate-0 mt-4'} titleBtn={'Publish'} onClick={sendPost}
                                    type={'button'}/>
                        </form>

                    </>
                }
            </div>
        </Layout>
    )
}

export default CreatePost;