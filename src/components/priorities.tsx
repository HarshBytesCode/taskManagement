'use client'

import React from 'react'
import PriorititesColumn from './prioritiesColumn'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function PrioritiesTable({tasks, refetch}: any) {
  
  return (

    <DndProvider backend={HTML5Backend}>
      <div
      className='grid grid-cols-4 h-[90vh]'
      >
          {tasks.length > 0 ? (
            <>
              <PriorititesColumn priority='URGENT' tasks={tasks.filter((task: any) => task.priority == "URGENT")} refetch={refetch} />
              <PriorititesColumn priority='HIGH' tasks={tasks.filter((task: any) => task.priority == "HIGH")} refetch={refetch} />
              <PriorititesColumn priority='MEDIUM' tasks={tasks.filter((task: any) => task.priority == "MEDIUM")} refetch={refetch} />
              <PriorititesColumn priority='LOW' tasks={tasks.filter((task: any) => task.priority == "LOW")} refetch={refetch} />
            </>

          ) : "Add your first task."}
      </div>
    </DndProvider>
  )
}

export default PrioritiesTable