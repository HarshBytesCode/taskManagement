'use client'

import { Loader2, X } from 'lucide-react';
import React, { useState } from 'react';
import { api } from '~/trpc/react';
import { TaskType } from '~/types/types';

interface EditTaskType {
  task: TaskType,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function EditTask({ task, isOpen, setIsOpen } : EditTaskType) {

  const taskRouter = api.task.addtask.useMutation()
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    expiresAt: task.expiresAt.toString(),
    projectId: task.projectId,
    priority: task.priority,
    assignId: task.assignId,
    taskId: task.id
  })
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {value, name } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))

  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await taskRouter.mutateAsync(formData);

    } catch (error) {
      alert("Error in updating.")
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className={` ${isOpen ? "flex": "hidden" } fixed top-0 left-0 w-full h-full flex-col items-center justify-center backdrop-blur-md text-black`}>
      <X
      size={40}
      className='absolute right-4 top-4 bg-white rounded-full hover:cursor-pointer'
      onClick={() => {
        setIsOpen(false);
      }}
      />
        <form
        onSubmit={handleSubmit}
        className='flex flex-col space-y-4 w-[30%]'
        >
          <div className='flex flex-col'>
            <label htmlFor="title"
            className='text-xl'
            >Title</label>
            <input
            name='title'
            id='title' 
            value={formData.title}
            onChange={handleChange}
            type="text" 
            className='p-2'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="description"
            className='text-xl'
            >Description</label>
            <textarea
            name='description' 
            id='description'
            value={formData.description}
            onChange={handleChange}
            className='p-2'
            />
          </div>
          <button type='submit'
          className='w-full p-2 bg-gray-800 text-white font-semibold rounded-md'
          >
            {isLoading ? <Loader2 className='animate-spin mx-auto' /> : "Update" }
          </button>

        </form>
    </div>
  )
}

export default EditTask