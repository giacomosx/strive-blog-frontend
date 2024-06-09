import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, logState} from "../../redux/loginSlice";
import Avatar from "../avatar/Avatar";
import AxiosApi from "../../api/axiosApi";

const TopHeader = () => {
    const api = new AxiosApi()
    const isLoggedIn = useSelector(logState);
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    const getUserInfo = async () => {
        if (localStorage.getItem("user")) {
            try {
                const response = await api.get('/authors/me')
                setUser(response);
            } catch (error) {
                console.error(error);
                setUser(null);
            }
        } else {
            return null;
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            getUserInfo();
        }
        // eslint-disable-next-line
    }, [dispatch]);

    const handleClick = () => {
        dispatch(logout())
    }

    return (
        <div className="font-mono top-header w-full bg-zinc-800 p-4 text-sm">
            <div className="flex items-center justify-between md:container md:mx-auto md:justify-end gap-4 min-h-8">
                {user ? (
                    <>
                        <Link to={'/me'}>
                            <Avatar avatarPath={user?.avatar} name={user?.name} textWhite/>
                        </Link>
                        <span className={'underline cursor-pointer text-white md:order-first'} onClick={handleClick}>Logout</span>
                    </>
                ) : (
                    <Link to="/login" className={'text-white'}>Login</Link>
                )}

            </div>
        </div>
    );
};

export default TopHeader;