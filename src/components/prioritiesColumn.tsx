'use client'

import { useDrop } from 'react-dnd';
import React from 'react';
import PriorityCard from './priorityCard';

enum Priority {
    URGENT = "URGENT",
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

interface PriorityType {
    priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW"
}

function PriorititesColumn({priority}: PriorityType) {

    const [, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: () => {

        }
    }))

    const initialTasks: {}[] = [
        { id: '1', content: 'Task 1', priority: 'low' },
        { id: '2', content: 'Task 2', priority: 'low' },
        { id: '3', content: 'Task 3', priority: 'medium' },
        { id: '4', content: 'Task 4', priority: 'high' },
      ];

  return (

    <div
    className='flex flex-col space-x-2'
    >
        <div className={`flex w-full items-center justify-center text-3xl font-bold ${priority == "URGENT" ? "text-[#d00000]" : priority == "HIGH" ? "text-[#fb8500]" : priority == "MEDIUM" ? "text-[#ffd60a]" : priority == "LOW" ? "text-[#adc178]" : "" } `}>
            {priority.toUpperCase()}
        </div>
        <div 
        ref={(element: HTMLDivElement | null): void => {drop(element)}}
        className='flex flex-col p-3 border space-y-4'
        >
            <PriorityCard/>
        </div>

    </div>
  )
}

export default PriorititesColumn