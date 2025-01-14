'use client'
import React, { useEffect, useState } from 'react'

interface ProgressBarType {
    endDate: Date,
    startDate: Date
}

function ProgressBar({endDate, startDate}: ProgressBarType) {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        console.log(endDate, startDate);
        
        const now = new Date().getTime();
        const end = new Date(endDate).getTime();
        const start = new Date(startDate).getTime();

        const progressPercentage = Math.min(100, Math.max(0, ((now - start) / (end - start))*100 ));
        setProgress(progressPercentage);


    }, [endDate])
    

  return (

    <div
    className=' w-full bg-green-600'>
        <div
        style={{
            width: `${progress}%`
        }}
        className='h-3 bg-[#da4167] '
        />
    </div>
  )
}

export default ProgressBar