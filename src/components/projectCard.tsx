


import React from 'react'
import ProgressBar from './progressBar'

function ProjectCard() {

    const randomStartDate = new Date("2024-12-15"); // Create a Date object
    const randomEndDate = new Date("2025-01-30");
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
        const day = date.getDate().toString().padStart(2, "0"); // Ensure day has 2 digits
      
        return `${day}/${month}/${year}`;
      };
  return (
    <div
    className='flex flex-col space-y-3 border p-3 rounded-xl bg-[#d9d9d9] text-[#284b63] '
    >
        <div>
            <h1 
            className='text-2xl font-bold'
            >Title</h1>
            <p>Description</p>
        </div>
        <div
        className='text-[#da4167]'
        >
            <div className='flex justify-between items-center'>
                <div>Deadline</div>
                <div>{formatDate(randomEndDate)}</div>
            </div>
            <ProgressBar
            endDate={randomEndDate}
            startDate={randomStartDate}
            />
        </div>
        <div>
            <div>Lead by - Harsh Gupta</div>
        </div>

    </div>
  )
}

export default ProjectCard