

import React from 'react';
import { useDrag } from 'react-dnd';
import ProjectCard from './projectCard';
import ProgressBar from './progressBar';

function PriorityCard({task}: any) {

  const [, drag ] = useDrag(() => ({
      type: 'TASK',
      item: {
        taskId: task.id
      }
  }))

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };


  return (
    <div
    ref={(element: HTMLDivElement | null): void => {drag(element)}}
    className='flex flex-col justify-between border p-3 rounded-xl bg-[#d9d9d9] text-[#284b63]  '
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
          Assigned to 
        </div>
      </div>
    </div>
  )
}

export default PriorityCard