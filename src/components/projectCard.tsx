


import React from 'react'
import ProgressBar from './progressBar'
import Link from 'next/link';

interface ProjectCardType {
    title: string,
    description: string | null,
    createdAt: Date,
    expiresAt: Date,
    projectId: string,
    leadBy: string
}


function ProjectCard({
    title,
    description,
    createdAt,
    expiresAt,
    projectId,
    leadBy
}: ProjectCardType) {


    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
        const day = date.getDate().toString().padStart(2, "0");
        return `${day}/${month}/${year}`;
    };
  return (
    <Link
    href={`project?id=${projectId}`}
    className='flex flex-col justify-between border p-3 rounded-xl bg-[#d9d9d9] text-[#284b63] '
    >
        <div
        className=' break-words w-full flex flex-col'
        >
            <h1 
            className='text-2xl font-bold'
            >{title}</h1>
            <p
            className=''
            >{description}</p>
        </div>
        <div>
            <div
            className='text-[#da4167]'
            >
                <div className='flex justify-between items-center'>
                    <div>Deadline</div>
                    <div>{formatDate(expiresAt)}</div>
                </div>
                <ProgressBar
                endDate={expiresAt}
                startDate={createdAt}
                />
            </div>
            <div>
                <div>Lead by - {leadBy}</div>
            </div>
        </div>

    </Link>
  )
}

export default ProjectCard