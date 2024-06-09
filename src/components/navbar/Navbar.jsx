import React from "react";
import {Link} from "react-router-dom";
import {logState} from "../../redux/loginSlice";
import {useSelector} from "react-redux";

const Navbar = ({className}) => {
    const isLogged = useSelector(logState);
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
                {!isLogged ?
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
