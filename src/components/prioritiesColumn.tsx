'use client'

import { useDrop } from 'react-dnd';
import React, { useState } from 'react';
import PriorityCard from './priorityCard';
import { api } from '~/trpc/react';
import { Loader2 } from 'lucide-react';
import { RefetchType, TaskType } from '~/types/types';


interface PriorityType {
    priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW",
    tasks: TaskType[],
    refetch: RefetchType
}

function PriorititesColumn({priority, tasks, refetch}: PriorityType) {

    const priorityRouter = api.task.updatepriority.useMutation();
    const [isPriorityChanging, setIsPriorityChanging] = useState(false);

    const [, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: async (item: {taskId: string}) => {

            try {
                setIsPriorityChanging(true)
                await priorityRouter.mutateAsync({
                    taskId: item.taskId,
                    priority
                })
                await refetch()
                
            } catch (error) {
                alert("Not able to update priority.")
            } finally {
                setIsPriorityChanging(false)
            }

        }
    }))

  return (

    <div
    className='flex flex-col space-x-2'
    >
        <div className={`flex w-full items-center justify-center text-3xl font-bold ${priority == "URGENT" ? "text-[#d00000]" : priority == "HIGH" ? "text-[#fb8500]" : priority == "MEDIUM" ? "text-[#ffd60a]" : priority == "LOW" ? "text-[#adc178]" : "" } `}>
            {priority.toUpperCase()}
            {isPriorityChanging ? <Loader2 className='ml-2 animate-spin'/> : ""}
        </div>
        <div 
        ref={(element: HTMLDivElement | null): void => {drop(element)}}
        className='flex flex-col p-3 border-r h-full space-y-4'
        >
            {tasks.map((task, index) => (
                <PriorityCard key={index} task={task} refetch={refetch} />
            ))}
        </div>

    </div>
  )
}

export default PriorititesColumn