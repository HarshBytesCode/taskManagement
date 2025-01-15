'use client'

import React from 'react';
import PriorititesColumn from './prioritiesColumn';
import { RefetchType, TaskType } from '~/types/types';

interface PrioritiesTableType {
  tasks: TaskType[],
  refetch: RefetchType
}


function PrioritiesTable({tasks, refetch}: PrioritiesTableType) {
  
  return (
      <div
      className='grid grid-cols-4 h-[90vh]'
      >
        {tasks.length > 0 ? (
          <>
            <PriorititesColumn priority='URGENT' tasks={tasks.filter((task: TaskType) => task.priority == "URGENT")} refetch={refetch} />
            <PriorititesColumn priority='HIGH' tasks={tasks.filter((task: TaskType) => task.priority == "HIGH")} refetch={refetch} />
            <PriorititesColumn priority='MEDIUM' tasks={tasks.filter((task: TaskType) => task.priority == "MEDIUM")} refetch={refetch} />
            <PriorititesColumn priority='LOW' tasks={tasks.filter((task: TaskType) => task.priority == "LOW")} refetch={refetch} />
          </>

        ) : "Add your first task."}
      </div>
  )
}

export default PrioritiesTable