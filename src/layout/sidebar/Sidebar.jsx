import React from 'react'
import CategoryWidget from "../../components/categorywidget/CategoryWidget";


const Sidebar = () => {
  return (
      <aside className='hidden md:flex md:flex-col w-1/4 pt-6 px-4 gap-8'>
          <CategoryWidget />
      </aside>
  )
}

export default Sidebar