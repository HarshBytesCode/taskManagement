"use client"

import React from 'react';
import AddCollaborator from './addCollaborator';
import { api } from '~/trpc/react';

function Collaborators({projectId}: {projectId: string}) {

    const {data = [], isLoading, error, refetch} = api.collaborator.getcollaborators.useQuery({
        projectId
    });

  return (
    <div
    className='flex flex-col items-center p-3 space-y-4 bg-black h-full w-full'
    >
        <div
        className='text-xl font-semibold border-b'
        >
            Collaborators
        </div>
        <AddCollaborator/>
        <div
        className='w-full border-t pt-2'
        >
            <div
            className='flex flex-col space-y-2'
            >
                {data.length > 0 ? data.map((user: any, index) => (
                    <div key={index} className='flex flex-col w-full border bg-slate-800 rounded-md p-2'>
                        <div>{user.name}</div>
                        <div
                        className='text-sm'
                        >{user.email}</div>
                    </div>
                )): "No collaborators."}
            </div>
        </div>

    </div>
  )
}

export default Collaborators