import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../Context/AuthContext';

const NewSignIn = ({setAuthMode}) => {
  const navigate = useNavigate();
  const { url, setToken,setUser } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    post: '',
    mobile: '',
    birthDay: '',
    whatsapp: '',
    github: '',
    linkedIn: '',
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}/api/user/signin`,
        { user: formData }
      )

      if (response.data.success) {
         localStorage.setItem('token',response.data.token)
         localStorage.setItem('user',JSON.stringify(response.data.user))
  
         setToken(response.data.token);
         setUser(response.data.user);

         toast.success(response.data.message);
         setFormData({
          name: '',
          email: '',
          password: '',
          city: '',
          post: '',
          mobile: '',
          birthDay: '',
          whatsapp: '',
          github: '',
          linkedIn: '',
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error creating user.');
    }
  };

  return (
    <div className="flex justify-center items-center h-auto lg:h-screen ">
      <form onSubmit={onSubmitHandle} className="container lg:m-4 flex flex-col lg:flex-row lg:gap-8">
        {/* Left Side: Contact Information */}
        <div className="w-full lg:w-1/3 px-8 py-12 lg:rounded-2xl bg-blue-900 shadow-2xl">
          <div className="flex flex-col text-white">
            <h1 className="font-bold uppercase text-4xl my-4"> <span className='text-5xl'>Staffify</span> <br /> Work Together, Achieve More</h1>
            <p className="text-gray-400">Lorem ipsum dolor sit amet...</p>
            {/* Contact Information */}
          </div>
          <p className='text-end text-sm text-white font-medium'>Already connected to a team? <span onClick={()=>setAuthMode('login')} className='font-bold cursor-pointer hover:text-green-300'>Login</span> </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-2/3 p-8 bg-white lg:rounded-2xl shadow-2xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={onChangeHandle}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={onChangeHandle}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password*"
              value={formData.password}
              onChange={onChangeHandle}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City*"
              value={formData.city}
              onChange={onChangeHandle}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="text"
              name="post"
              placeholder="Post*"
              value={formData.post}
              onChange={onChangeHandle}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile*"
              value={formData.mobile}
              onChange={onChangeHandle}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
            <div className="birthday">
            <label htmlFor="birthDay" className='text-xs font-medium text-gray-900'>
                Birthday
            </label>
            <input
              type="date"
              name="birthDay"
              placeholder="Birthday*"
              value={formData.birthDay}
              onChange={onChangeHandle}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            />
            </div>
            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp*"
              value={formData.whatsapp}
              onChange={onChangeHandle}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="url"
              name="github"
              placeholder="GitHub"
              value={formData.github}
              onChange={onChangeHandle}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            />
            <input
              type="url"
              name="linkedIn"
              placeholder="LinkedIn"
              value={formData.linkedIn}
              onChange={onChangeHandle}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="my-4">
            <button
              type="submit"
              className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
            >
              Create Account
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};
export default NewSignIn;