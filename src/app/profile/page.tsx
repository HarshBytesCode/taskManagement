'use client'
import { Edit2, Loader, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { api } from '~/trpc/react';
import { updateProfile } from '~/types/zodSchemas';




function Profile() {

  const updateProfileRouter = api.profile.updateprofile.useMutation();
  const { data, isLoading } = api.profile.getprofiledetails.useQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        email: data.email || '',
      });
    }
  }, [data]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    try {
      updateProfile.parse(formData);
      setIsUpdating(true);
      await updateProfileRouter.mutateAsync(formData);

    } catch (error) {

      if(error instanceof z.ZodError) {
        error.errors.forEach((error) => {
            alert(error.message)
        })
        return
      }
      console.log("Error while updating.", error);
      
    } finally {
      setIsUpdating(false)
    }
  }
  
  if(isLoading) return (
    <Loader className='animate-spin' />
  )

  return (

    <div className='flex w-screen h-screen items-center justify-center'>
      <form
      className='flex flex-col space-y-5 w-1/3'
      onSubmit={handleSubmit}
      >
        <div className='flex'>
          <div className='flex-grow'/>
          <button
          type='button'
          className={`flex bg-gray-900 ${isEditing ? "border": ""} items-center font-semibold justify-center p-2 rounded-md`}
          onClick={() => {
            setIsEditing(!isEditing);
          }}
          ><Edit2 className='mr-2'/>Edit Details</button>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="name"
          className='text-2xl font-semibold'
          >Name</label>
          <input type="text" 
          id='name'
          name='name'
          placeholder='Enter your name'
          readOnly={!isEditing} 
          className='p-2 text-black rounded-md text-xl'
          value={formData.name}
          onChange={handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="email"
          className='text-2xl font-semibold'
          >Email</label>
          <input type="text" 
          id='email'
          name='email'
          placeholder='Enter your email'
          readOnly={!isEditing}
          className='p-2 text-black rounded-md text-xl'
          value={formData.email}
          onChange={handleChange}
          />
        </div>
        <button
        className='bg-gray-900 p-2 rounded-lg font-semibold'
        type='submit'
        >{isUpdating ? <Loader2 className='animate-spin mx-auto'/> :"Update Details!"}</button>
      </form>
    </div>
  )
}

export default Profile