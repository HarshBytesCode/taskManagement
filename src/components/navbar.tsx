'use client';


import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

function Navbar() {

  
  return (
    <div
    className='fixed top-4 left-2 lg:left-1/2 transform lg:-translate-x-2/4 bg-black p-2 rounded-xl px-4'
    >
        <ul className='flex space-x-3 '>
            <Link href={"/"} className='bg-gray-700 p-1 px-2 rounded-lg hover:bg-gray-800'>Dashboard</Link>
            <Link href={"/profile"} className='bg-gray-700 p-1 px-2 rounded-lg hover:bg-gray-800'>Profile</Link>
            <button className='bg-gray-700 p-1 px-2 rounded-lg hover:bg-gray-800'
            onClick={() => signOut()}
            >
              Sign out
            </button>
        </ul>
    </div>
  )
}

export default Navbar