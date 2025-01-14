'use client'
import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react'
import TaskModel from './addTaskModel';

function AddTask({refetch}: any) {
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
            <div>Add Task!</div>
        </button>
        <TaskModel isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />
    </div>
  )
}

export default AddTask