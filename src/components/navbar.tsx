



import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div
    className='fixed top-4 left-1/2 transform -translate-x-2/3 bg-black p-2 rounded-xl px-4'
    >
        <ul className='flex space-x-3 '>
            <Link href={"/"} className='bg-gray-700 p-1 px-2 rounded-lg hover:bg-gray-800'>Dashboard</Link>
            <Link href={"/"} className='bg-gray-700 p-1 px-2 rounded-lg hover:bg-gray-800'>Profile</Link>
        </ul>
    </div>
  )
}

export default Navbar