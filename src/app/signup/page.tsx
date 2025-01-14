'use client'

import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { api } from '~/trpc/react';

function SignUp() { 

  const signUpRouter = api.authentication.signup.useMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: any) => {

    e.preventDefault();
    try {

      setLoading(true);
      const user = await signUpRouter.mutateAsync(formData);
      
      if(!user) {
        return 
      }

      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password
      })

      if(signInResponse?.ok) {
        router.push("/");
      }

    } catch (error) {
      console.log("SignUp error", error);
      alert("Problem in signup.");
      
    } finally {
      
      setLoading(false);
    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#219ebc] py-2 px-4 rounded-lg hover:bg-[#4d8fad] focus:ring-4 focus:ring-blue-300"
        >
          {loading ? 
          <Loader2 
          className=' animate-spin mx-auto'
          /> : "Sign Up" }
        </button>
      </form>
    </div>
  );
}

export default SignUp;
