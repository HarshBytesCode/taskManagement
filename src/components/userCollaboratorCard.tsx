'use client'


import React from 'react'
import { useDrag } from 'react-dnd'
import { UserType } from '~/types/types'

function UserCollaboratorCard({user}: {user: UserType}) {

    const [, drag] = useDrag({
        type: "ASSIGN",
        item: {
            userId: user.id,
            name: user.name
        }
    })

  return (
    <div 
    ref={(element: HTMLDivElement | null): void => {drag(element)}}
    className='flex flex-col w-full border bg-slate-800 rounded-md p-2'>
        <div>{user.name}</div>
        <div
        className='text-sm'
        >{user.email}</div>
    </div>
  )
}

export default UserCollaboratorCard