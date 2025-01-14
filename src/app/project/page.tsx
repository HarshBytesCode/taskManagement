'use client'
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import AddTask from '~/components/addTask';
import Collaborators from '~/components/collaborators';
import PrioritiesTable from '~/components/priorities';
import { api } from '~/trpc/react';


function Project() {

  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");


  if(!projectId) return (
    <div>
      Please try again later.
    </div>
  )
  
  const {data: tasks = [], isLoading, error, refetch } = api.task.getTask.useQuery({
    projectId
  })

  if(isLoading) return <Loader2 className='animate-spin'/>

  if(error) return <div>
    Please try again later.
  </div>

  
  return (
    <>
    <div className='flex'>
      <div className='w-full'>
        <div
        className="m-4"
        >
          Tasks
        </div>

        <AddTask refetch={refetch} />
        <PrioritiesTable tasks={tasks} refetch={refetch} />
      </div>
      <div className='lg:min-w-[20%]'>
        <Collaborators projectId={projectId} />
      </div>
    </div>
    </>
  )
}

export default Project

