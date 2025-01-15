'use client'

import { Cross, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { api } from '~/trpc/react';

function ProjectModel({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

  const projectRouter = api.project.addproject.useMutation();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    createdAt: new Date().toISOString().slice(0, 10),
    expiresAt: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    console.log(name, value);
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    try {
      await projectRouter.mutateAsync(formData);
      
    } catch (error) {
      alert("Error in creating project.");
      console.log("Error in creating project.", error);
      
      
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
    
    
  }

  return (
    <div
    className={`${isOpen ? "flex" : "hidden"} justify-center items-center w-full h-full fixed top-0 left-0 text-black backdrop-blur-sm `}
    >
        <div
        className=' w-11/12 md:w-1/3'
        >
            <Cross
            className='absolute right-4 top-4'
            onClick={() => {
                setIsOpen(false)
            }}
            />
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-black text-xl font-medium mb-1">
                Project Name
              </label>
              <input
                name='title'
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project name"
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black text-xl font-medium mb-1">
                Description
              </label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label className="block text-black text-xl font-medium mb-1">
                Start Date
              </label>
              <input
                name='createdAt'
                type="date"
                value={formData.createdAt}
                onChange={handleChange}
                placeholder='dd/mm/yyyy'
                maxLength={10}
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black text-xl font-medium mb-1">
                End Date
              </label>
              <input
                name='expiresAt'
                type="date"
                value={formData.expiresAt}
                onChange={handleChange}
                placeholder='DD/MM/YYYY'
                maxLength={10}
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              { isLoading ? <Loader2 className=' animate-spin mx-auto'/> : "Create Project"}
            </button>
          </form>

        </div>
    </div>
  )
}

export default ProjectModel