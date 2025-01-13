'use client'

import React from 'react'
import ProjectCard from './projectCard'
import { api } from '~/trpc/react'
import { Loader2 } from 'lucide-react';

function ProjectsGrid() {
  
  const {data: projects = [], isLoading, error} = api.project.getprojects.useQuery();

  if(isLoading) return (
    <Loader2
    className=' animate-spin'
    />
  )

  if(error) return (
    <div>
      Please try again later.
    </div>
  )
  

  return (
    <div
    className='grid grid-cols-4 gap-4' 
    >
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard/>
        ))
      ) : "Add your first project."}

    </div>
  )
}

export default ProjectsGrid