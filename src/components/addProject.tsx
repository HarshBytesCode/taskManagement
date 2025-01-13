'use client'
import { CirclePlus } from 'lucide-react';


import React, { useState } from 'react'
import ProjectModel from './addProjectModel';

function AddProject() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
        <button
        className='flex items-center justify-center space-x-2 text-xl bg-[#b8c0ff] p-2 px-4 rounded-xl text-black'
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        >   
            <CirclePlus/>
            <div>Add Project!</div>
        </button>
        <ProjectModel isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default AddProject