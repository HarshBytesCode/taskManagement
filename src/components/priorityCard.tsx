'use client'
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ProgressBar from './progressBar';
import { api } from '~/trpc/react';
import { Loader2 } from 'lucide-react';
import { TaskType } from '~/types/types';


interface PriorityCardType {
  task: TaskType
}

function PriorityCard({task}: PriorityCardType) {

  const assignRouter = api.task.assign.useMutation();
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  
  const [, drag ] = useDrag(() => ({
      type: 'TASK',
      item: {
        taskId: task.id
      }
  }))

  const [, drop ] = useDrop(() => ({
    accept: "ASSIGN",
    drop: async(item: {userId: string, name: string}) => {

      try {
        setAssignLoading(true)
        await assignRouter.mutateAsync({
          userId: item.userId,
          taskId: task.id
        })
        setAssignedTo(item.name)

      } catch (error) {
        alert("Not able to assign issue.")
      } finally {
        setAssignLoading(false)
      }
    }
  }))

  const dragDropRef = (element: HTMLDivElement | null ) => {
    drag(element);
    drop(element);
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };


  return (
    <div
    ref={dragDropRef}
    className='flex flex-col justify-between border p-3 rounded-xl bg-[#d9d9d9] text-[#284b63]'
    >
      <div
      className=' break-words w-full flex flex-col'
      >
        <h1 
        className='text-2xl font-bold'
        >{task.title}</h1>
        <p
        className=''
        >{task.description}</p>
      </div>
      <div>
        <div
        className='text-[#da4167]'
        >
          <div className='flex justify-between items-center'>
            <div>Deadline</div>
            <div>{formatDate(task.expiresAt)}</div>
          </div>
          <ProgressBar
          endDate={task.expiresAt}
          startDate={task.createdAt}
          />
        </div>
      </div>
      <div>
        <div>
          {assignLoading ? <Loader2 className=' animate-spin'/> : task.assignedTo || assignedTo ? 
            <>
              Assigned To - {assignedTo || task.assignedTo?.name}
            </>
          : "Yet to be assigned."}
        </div>
      </div>
    </div>
  )
}

export default PriorityCard