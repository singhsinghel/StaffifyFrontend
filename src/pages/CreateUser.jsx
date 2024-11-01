import React, { useContext, useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import {StoreContext} from '../Context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {

  const navigate=useNavigate();
  const returnPreviousRoute=()=>{

    navigate(-1)

  }
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    city:'',
    post:'',
    mobile:'',
    birthDay:'',
    whatsapp:'',
    github:'',
    linkedIn:''
  });
  const {url,token}=useContext(StoreContext);

  const onChangeHandle=(e)=>{
    const{name,value}=e.target;
    setFormData((prev)=>({...prev,[name]:value}))
  }

  const onSubmitHandle=async(e)=>{
     e.preventDefault();

     const response=await axios.post(url+'/api/user/create',{userData:formData},{headers:{token}});
     if(response.data.success){
      toast.success(response.data.message);
      setFormData({
        name:'',
        email:'',
        password:'',
        city:'',
        post:'',
        mobile:'',
        birthDay:'',
        whatsapp:'',
        github:'',
        linkedIn:''
      })
     }
     else toast.error(response.data.message)

  }
  return (
    <form onSubmit={onSubmitHandle}>
      <div className="space-y-12 bg-white p-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6">
          {/* Left Column for Section Titles */}
          <div className="md:col-span-1">
          <h2 onClick={returnPreviousRoute} className="cursor-pointer text-base font-semibold leading-7 text-[#077BFF]"><i className='bx bx-arrow-back '></i>Back to previous</h2>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Enter your personal information below.
            </p>
          </div>

          {/* Right Column for Profile Inputs */}
          <div className="md:col-span-3">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                  onChange={onChangeHandle}
                  value={formData.name}
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block outline-none w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={onChangeHandle}
                    value={formData.email}
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block outline-none w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                  onChange={onChangeHandle}
                  value={formData.password}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block outline-none w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                  onChange={onChangeHandle}
                  value={formData.city}
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="block outline-none w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="post" className="block text-sm font-medium leading-6 text-gray-900">
                  Post
                </label>
                <div className="mt-2">
                  <input
                  onChange={onChangeHandle}
                  value={formData.post}
                    id="post"
                    name="post"
                    type="text"
                    required
                    className="block outline-none w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                  Mobile
                </label>
                <div className="mt-2">
                  <input
                  onChange={onChangeHandle}
                  value={formData.mobile}
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    className="block outline-none w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="birthDay" className="block text-sm font-medium leading-6 text-gray-900">
                  Birthday
                </label>
                <div className="mt-2">
                  <input
                  onChange={onChangeHandle}
                  value={formData.birthDay}
                    id="birthDay"
                    name="birthDay"
                    type="date"
                    className="block outline-none w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium leading-6 text-gray-900">
                  WhatsApp
                </label>
                <div className="mt-2">
                  <input
                  onChange={onChangeHandle}
                  value={formData.whatsapp}
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    className="block outline-none w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="github" className="block text-sm font-medium leading-6 text-gray-900">
                  GitHub
                </label>
                <div className="mt-2">
                  <input
                  onChange={onChangeHandle}
                  value={formData.github}
                    id="github"
                    name="github"
                    type="url"
                    className="block outline-none w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="linkedIn" className="block text-sm font-medium leading-6 text-gray-900">
                  LinkedIn
                </label>
                <div className="mt-2">
                  <input
                  onChange={onChangeHandle}
                  value={formData.linkedIn}
                    id="linkedIn"
                    name="linkedIn"
                    type="url"
                    className="block outline-none w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-[#007Bff] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  )
}
