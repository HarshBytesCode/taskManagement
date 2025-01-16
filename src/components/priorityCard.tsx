'use client'
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ProgressBar from './progressBar';
import { api } from '~/trpc/react';
import { Loader2, Trash2 } from 'lucide-react';
import { RefetchType, TaskType } from '~/types/types';
import EditTask from './editTask';


interface PriorityCardType {
  task: TaskType,
  refetch: RefetchType
}

function PriorityCard({task, refetch}: PriorityCardType) {

  const deleteTaskRouter = api.task.deleteTask.useMutation();
  const assignRouter = api.task.assign.useMutation();
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
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
    className='flex flex-col justify-between border p-3 rounded-xl bg-[#d9d9d9] text-[#284b63] cursor-pointer'
    onClick={() => {
      setIsEditing(true)
    }}
    >
      <EditTask isOpen={isEditing} setIsOpen={setIsEditing} task={task} />
      <div
      className=' break-words w-full flex flex-col'
      >
        <div className='flex justify-between'>
          <h1 
          className='text-2xl font-bold'
          >{task.title}</h1>
          <button
          onClick={async (e) => {
              
            e.preventDefault();
            try {
              setIsDeleting(true);
              await deleteTaskRouter.mutateAsync({
                  taskId: task.id
              })
              refetch()
            } catch (error) {
                
            }finally {
              setIsDeleting(false)
            }
          }}
          >
            {isDeleting ? <Loader2 className='animate-spin'/> : 
              <Trash2 className='text-black hover:text-red-800'/>
            }
          </button>
        </div>
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