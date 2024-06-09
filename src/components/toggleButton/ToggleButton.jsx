import React from "react";

const ToggleButton = ({onClick}) => {
    return (
        <button className={'navbar__toggleBtn text-5xl text-zinc-700 lg:hidden'} onClick={onClick}>
            <ion-icon name="menu-outline"></ion-icon>
        </button>
    )
}

export default ToggleButton