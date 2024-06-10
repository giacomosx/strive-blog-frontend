import React, {useState} from 'react';
import Layout from "../layout/Layout";
import InputField from "../components/inputfield/InputField";
import Button from "../components/button/Button";
import axios from "axios";
import ErrorBlock from "../components/errorBlock/ErrorBlock";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch} from "react-redux";
import {login} from "../redux/loginSlice";

const Login = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = e => {
        setError(null)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = async e => {

        try {

            const response = await axios.post(process.env.REACT_APP_BASE_URL + "/auth/login", formData);
            const data = await response.data

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', data.userData.userId)

            setSuccess(true)
            dispatch(login(data))

            setTimeout(() => {
                navigate('/me')
            }, 1000)

        } catch (e) {
            console.error(e)
            setError(e.response.data.message)
        }
    }

    return (
        <Layout>
            <div className="flex justify-center items-center h-full w-full mt-4 px-4">
                <div className="login__card border border-zinc-800 py-8 px-12 shadow-retro">
                    <h3 className={'w-full text-center text-2xl md:text-3x'}>Login to your account</h3>
                    <form className={'mt-8'}>
                        <InputField
                            label
                            labelTitle={'Email'}
                            htmlFor={'email'}
                            name={'email'}
                            onChange={handleChange}
                            placeholder="Enter your email..."
                            type="email"
                            variant={'w-full'}/>

                        <InputField
                            label
                            name={'password'}
                            htmlFor={'password'}
                            labelTitle={'Password'}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            type="password"
                            variant={'w-full'}/>

                        {error && <ErrorBlock>{error}</ErrorBlock>}
                        {success && (<span className={'text-sm text-green-800 block'}>User logged!</span>)}
                        <Button addingClass={'w-full mt-4'} titleBtn={'Login'} type={'button'} onClick={handleClick}/>
                        <p className={'mt-8'}>or <Link className={'underline text-zinc-500 text-sm'} to={`${process.env.REACT_APP_BASE_URL}/auth/google-login`}>Login with Google</Link></p>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;