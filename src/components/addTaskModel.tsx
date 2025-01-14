'use client'

import { Loader2, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { api } from '~/trpc/react';

interface TaskDataType {
    title: string,
    description: string,
    createdAt: string,
    expiresAt: string,
    projectId: string,
    priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW",
}

function TaskModel({isOpen, setIsOpen, refetch}: {isOpen: boolean, setIsOpen: any, refetch: any}) {

    const taskRouter = api.task.addtask.useMutation();
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const projectId = searchParams.get("id");

    if(!projectId) return (
        <div>
            Please try again.
        </div>
    )

    const [formData, setFormData] = useState<TaskDataType>({
        title: '',
        description: '',
        createdAt: new Date().toISOString().slice(0, 10),
        expiresAt: '',
        priority: "URGENT",
        projectId: projectId
    });

    function handleChange(e: any) {
        const { name, value } = e.target;
        console.log(name, value);
        
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    }

    async function handleSubmit(e: any) {

        e.preventDefault();

        try {
        await taskRouter.mutateAsync(formData);
        refetch()
        
        } catch (error) {

        alert("Error in creating project.")
        
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
                <X
                size={40}
                className='absolute right-4 top-4 bg-white rounded-full hover:cursor-pointer'
                onClick={() => {
                    setIsOpen(false)
                }}
                />
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-black text-xl font-medium mb-1">
                    Title
                </label>
                <input
                    name='title'
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task."
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
                    placeholder="Enter task description"
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
                <div
                className='flex text-2xl items-center justify-center text-white'
                >Select Priority!</div>
                <div className='flex w-full justify-evenly space-x-3 font-semibold'>
                    <input
                        type="radio"
                        name="priority"
                        id="URGENT"
                        className='hidden'
                        value="URGENT"
                        checked={formData.priority === "URGENT"}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='URGENT'
                        className={`flex items-center justify-center w-full rounded-xl p-3 transition-all ${
                        formData.priority === "URGENT" ? 'border-white text-white border-2 scale-110' : ''
                        } bg-[#d00000]`}
                    >
                        <div>URGENT</div>
                    </label>

                    <input
                        type="radio"
                        name="priority"
                        id="HIGH"
                        className='hidden'
                        value="HIGH"
                        checked={formData.priority === "HIGH"}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='HIGH'
                        className={`flex items-center justify-center w-full rounded-xl p-3 transition-all ${
                        formData.priority === "HIGH" ? 'border-white text-white border-2 scale-110' : ''
                        } bg-[#fb8500]`}
                    >
                        <div>HIGH</div>
                    </label>

                    <input
                        type="radio"
                        name="priority"
                        id="MEDIUM"
                        className='hidden'
                        value="MEDIUM"
                        checked={formData.priority === "MEDIUM"}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='MEDIUM'
                        className={`flex items-center justify-center w-full rounded-xl p-3 transition-all ${
                        formData.priority === "MEDIUM" ? 'border-white text-white border-2 scale-110' : ''
                        } bg-[#ffd60a]`}
                    >
                        <div>MEDIUM</div>
                    </label>

                    <input
                        type="radio"
                        name="priority"
                        id="LOW"
                        className='hidden'
                        value="LOW"
                        checked={formData.priority === "LOW"}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='LOW'
                        className={`flex items-center justify-center w-full rounded-xl p-3 transition-all ${
                        formData.priority === "LOW" ? 'border-white text-white border-2 scale-110' : ''
                        } bg-[#adc178]`}
                    >
                        <div>LOW</div>
                    </label>
                    </div>

                <button
                type="submit"
                className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                { isLoading ? <Loader2 className=' animate-spin mx-auto'/> : "Create Task"}
                </button>
            </form>

            </div>
        </div>
    )
}

export default TaskModel