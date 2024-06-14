import React, { useState } from 'react'
import logo from '../assets/logo.png'
import burgerlist from '../assets/burgerlist.svg'
import close from '../assets/close.svg'

const Navbar = () => {
    const[open, setOpen] = useState(false);
    const linkdata = ['Services', 'Portfolio', 'Company', 'GeoAI', 'Events & Media', 'Blogs'];
  return (
    <>
        <div className=''>
            <div className='flex flex-wrap justify-around items-center p-2'>
                {/* LOGO SECTION */}
                <div className=''>
                    <img src={logo} className='w-4/6' />
                </div>
                {/* Header links section */}
                <ul className='hidden lg:flex '>
                    {linkdata.map((item, index) => ( 
                    <li key={index} className='p-3 px-4 font-medium cursor-pointer hover:text-blue-700 hover:transition-all'>{item}</li>
                    ))}
                </ul>
                
                <div className='flex gap-5 items-center'>
                {/* Lets talk */}
                <div className='py-2 px-4 bg-yellow-400 text-sm text-blue-600 font-medium cursor-pointer'>Let's talk</div>
                {/* Responsive */}
                <div className='menu block lg:hidden cursor-pointer' onClick={()=> setOpen(!open)}>
                    <img src={burgerlist} className='w-6 h-6' />
                </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={ open ? 'fixed lg:hidden right-0 top-0 overflow-hidden w-[350px] h-full bg-yellow-400 z-20' : `hidden`}>
            <div className='menu absolute right-2 top-2 cursor-pointer' onClick={()=> setOpen(!open)}>
                    <img src={close} className='w-6 h-6' />
                </div>
            <ul className='relative mt-8 pl-4'>
            {linkdata.map((item, index) => ( 
                    <li key={index} className='p-3 cursor-pointer hover:text-blue-700 hover:transition-all'>{item}</li>
                ))}
            </ul>
            </div>

        </div>
    </>
  )
}

export default Navbar