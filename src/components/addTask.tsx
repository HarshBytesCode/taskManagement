import { CirclePlus } from 'lucide-react';
import React from 'react'

function AddTask() {
  return (
    <div>
        <button
        className='flex items-center justify-center space-x-2 text-xl bg-[#b8c0ff] p-2 px-4 rounded-xl text-black'
        >   
            <CirclePlus/>
            <div>Add Task!</div>
        </button>
    </div>
  )
}

export default AddTask