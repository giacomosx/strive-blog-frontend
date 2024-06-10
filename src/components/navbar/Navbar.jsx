import React from "react";
import {Link} from "react-router-dom";
import {logState} from "../../redux/loginSlice";
import {useSelector} from "react-redux";
import {useSession} from "../../middlewares/ProtectedRoutes";

const Navbar = ({className}) => {
    const session = useSession()
    return (
        <nav className={`${className}`}>
            <ul className={`flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6`}>
                <li>
                    <Link className="text-zinc-500 hover:underline" to={`/`}
                          title='Home'>Home</Link>
                </li>
                <li>
                    <Link className="text-zinc-500 hover:underline" to={`/authors`}
                          title='Authors'>Authors</Link>
                </li>
                {!session ?
                    (<li>
                        <Link className="text-zinc-500 hover:underline" to={`/become-author`}
                              title='Become an author'>Become an author</Link>
                    </li>)
                    :
                    (
                        <li>
                            <Link className="text-zinc-500 hover:underline" to={`/create`}
                                  title='Write'>Write</Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
};

export default Navbar;
