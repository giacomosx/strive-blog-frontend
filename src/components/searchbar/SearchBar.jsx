import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {getDataById, resetSearchResults} from "../../redux/resultsSlice";

const SearchBar = ({placeholder}) => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(resetSearchResults())
        setQuery(e.target.value)
    }
    const handleClick = () => {
        dispatch(getDataById(`?title=${query}`))
    }

  return (
    <div className='w-full flex gap-1 lg:w-auto'>
        <input
            onChange={handleChange}
            className='ps-3 bg-gray-100 h-auto flex-grow focus-visible:outline-zinc-800'
            type='text'
            placeholder={placeholder}/>
        <button
            onClick={handleClick}
            className='bg-[#02FF84] text-xl pt-3 pb-2 px-3 focus-visible:outline-zinc-800 shadow-retro hover:rotate-2 transition-all'>
            <ion-icon name="search" ></ion-icon>
        </button>
    </div>
  )
}

export default SearchBar