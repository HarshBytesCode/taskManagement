

import { Cross } from 'lucide-react'
import React from 'react'

function ProjectModel({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: any}) {

    function handleSubmit() {

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
                type="text"
                placeholder="Enter project name"
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black text-xl font-medium mb-1">
                Description
              </label>
              <textarea
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
                type="date"
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-black text-xl font-medium mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Create Project
            </button>
          </form>

        </div>
    </div>
  )
}

export default ProjectModel