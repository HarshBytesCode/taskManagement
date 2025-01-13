

import React from 'react'
import PriorititesColumn from './prioritiesColumn'
import PriorityCard from './priorityCard'

function PrioritiesTable() {


  return (

    <div
    className='grid grid-cols-4 h-full'
    >
        <PriorititesColumn priority='URGENT' />
        <PriorititesColumn priority='HIGH'/>
        <PriorititesColumn priority='MEDIUM' />
        <PriorititesColumn priority='LOW'/>
    </div>
  )
}

export default PrioritiesTable