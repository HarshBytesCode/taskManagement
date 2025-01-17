'use client'

import React from 'react'
import ProjectCard from './projectCard'
import { api } from '~/trpc/react'
import { Loader2 } from 'lucide-react';
import AddProject from './addProject';

function ProjectsGrid() {
  
  const {data: projects = [], isLoading, error, refetch} = api.project.getprojects.useQuery();

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
    <>
    <AddProject refetch={refetch} />
      <div
      className='grid grid-rows-none lg:grid-cols-4 gap-4' 
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
            refetch={refetch}
            />
          ))
        ) : "Add your first project."}

      </div>
    </>
  )
}

export default ProjectsGrid