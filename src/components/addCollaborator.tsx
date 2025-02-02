'use client'


import { Loader2 } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { api } from '~/trpc/react'
import { UserType } from '~/types/types';

function AddCollaborator() {
    const [email, setEmail] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const debounce = useRef< NodeJS.Timeout | null >(null)
    const {data = [], isLoading, refetch} = api.collaborator.searchcollaborator.useQuery({email}, {enabled: false});
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);

        if(debounce.current) {
            clearTimeout(debounce.current)
        }

        debounce.current = setTimeout(() => {

           refetch().catch(error => {
            console.log("Error while refetching.", error);

           })
        }, 300);

    }

  return (
    <div className='flex flex-col space-y-2 w-full'>
        <button
        className='p-2 bg-gray-700 rounded-md w-full'
        onClick={() => setIsAdding(!isAdding)}
        >Add Collaborator</button>
        {isAdding ? 
            <div className='flex flex-col space-y-2'>
                <input type="text"
                className='w-full p-2 bg-gray-800 text-white rounded-md'
                placeholder='Enter email of the user'
                value={email}
                onChange={handleChange}
                />
                <div
            className='flex flex-col space-y-2'
            >
                {data.length > 0 ? data.map((user: UserType, index) => (
                    <div key={index} className='flex justify-between  w-full border bg-slate-800 rounded-md p-2'>
                        <div className='flex flex-col'>
                            <div>{user.name}</div>
                            <div
                            className='text-sm'
                            >{user.email}</div>
                        </div>
                        <button
                        className='bg-green-600 p-2 rounded-lg px-4'
                        >Add</button>
                    </div>
                )): isLoading ? <Loader2 className=' animate-spin mx-auto' />  :"Not able to find any collaborator by this email."}
            </div>
            </div>
        : ""}
    </div>
  )
}

export default AddCollaborator