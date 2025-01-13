

import React from 'react';
import { useDrag } from 'react-dnd';
import ProjectCard from './projectCard';

function PriorityCard({priority}: any) {

    const [, drag ] = useDrag(() => ({
        type: 'TASK',
        item: {
        }
    }))


  return (
    <div
    ref={(element: HTMLDivElement | null): void => {drag(element)}}
    className='border p-5 '
    >   {priority}
        <ProjectCard/>
    </div>
  )
}

export default PriorityCard