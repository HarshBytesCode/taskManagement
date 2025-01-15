"use client"

import React from 'react';
import AddCollaborator from './addCollaborator';
import { api } from '~/trpc/react';
import UserCollaboratorCard from './userCollaboratorCard';
import { UserType } from '~/types/types';

function Collaborators({projectId}: {projectId: string}) {

    const {data = []} = api.collaborator.getcollaborators.useQuery({
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
            className='mb-2'
            >Drag & drop the card of user on task to assign.</div>
            <div
            className='flex flex-col space-y-2'
            >
                {data.length > 0 ? data.map((user: UserType, index) => (
                    <UserCollaboratorCard user={user} key={index} />
                )): "No collaborator's yet."}
            </div>
        </div>

    </div>
  )
}

export default Collaborators