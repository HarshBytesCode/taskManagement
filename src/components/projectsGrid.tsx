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
        projects.map((project, index) => (
          <ProjectCard key={index}
          title={project.title}
          description={project.description}
          expiresAt={project.expiresAt}
          createdAt={project.createdAt}
          projectId={project.id}
          leadBy={project.User.name}
          />
        ))
      ) : "Add your first project."}

    </div>
  )
}

export default ProjectsGrid