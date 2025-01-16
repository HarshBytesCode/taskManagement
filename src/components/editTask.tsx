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
      setIsLoading(false);
      setIsOpen(false)
    }

  }

  return (
    <div className={` ${isOpen ? "flex left-0": "hidden" } fixed z-50 top-0 -left-100 w-full h-full flex-col items-center justify-center backdrop-blur-md text-black cursor-default`}
    onClick={(e) => {
      e.stopPropagation()
    }}
    >
      <button>
        <X
          size={40}
          className="fixed top-4 right-4 z-50 bg-white rounded-full hover:cursor-pointer p-2 hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        />
      </button>
        <form
        onSubmit={handleSubmit}
        className='flex flex-col space-y-4 w-[30%]'
        >
          <div className='flex flex-col'>
            <label htmlFor="title"
            className='text-xl font-semibold'
            >Title</label>
            <input
            name='title'
            id='title' 
            value={formData.title}
            onChange={handleChange}
            type="text" 
            className='p-3 bg-black text-white rounded-md'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="description"
            className='text-xl font-semibold my-1'
            >Description</label>
            <textarea
            name='description' 
            id='description'
            value={formData.description}
            onChange={handleChange}
            className='p-3 bg-black text-white rounded-md'
            rows={15}
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