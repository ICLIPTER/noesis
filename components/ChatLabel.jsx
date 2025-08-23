import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'

const ChatLabel = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className='flex items-center justify-between hover:bg-white/10 rounded-lg text-sm group cursor-pointer p-2'>
      <p className='group-hover:max-w-[83%] truncate'>Chat name here</p>

      <div 
        ref={menuRef} 
        className='group relative flex items-center justify-center h-6 w-5 aspect-square hover:bg-black/80 rounded-lg'
        onClick={(e) => {
          e.stopPropagation()
          setOpenMenu(prev => !prev)
        }}
      >
        <Image 
          src={assets.three_dots} 
          alt='' 
          className='w-4'
        />

        <div className={`absolute ${openMenu ? 'block' : 'hidden'} -right-36 top-6 bg-gray-700 rounded-xl w-max p-2`}>
          <div className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer'>
            <Image src={assets.pencil_icon} alt='' className='w-4'/>
            <p>Rename</p>
          </div>
          <div className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer'>
            <Image src={assets.delete_icon} alt='' className='w-4'/>
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatLabel
