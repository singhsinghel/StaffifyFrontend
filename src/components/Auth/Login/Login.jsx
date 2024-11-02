import React, { useContext, useState } from 'react'
import './login.css'
import axios from 'axios'
import { StoreContext } from '../../../Context/AuthContext'
import { toast } from 'react-toastify'


const Login = ({setAuthMode}) => {

  const {url,setToken,setUser}=useContext(StoreContext);
  const[formData,setFormData]=useState({
    email:'',
    password:'',
  })

  const onChangeHandle=(e)=>{
    const{name,value}=e.target;
    setFormData((prev)=>({...prev,[name]:value}));
  }
  const formSubmitHandler=async(e)=>{

    e.preventDefault();
    const response=await axios.post(url+'/api/user/login',formData);
    if(response.data.success){

      localStorage.setItem('token',response.data.token)
      localStorage.setItem('user',JSON.stringify(response.data.user))

      setToken(response.data.token);
      setUser(response.data.user);

      setFormData({email:'',password:''})
      if(response.data.user.role==='admin')
       return toast.success('Hey admin')
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message);
    }
  }
  return (
    <>
    <div className="login min-h-screen py+-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold"><span className='text-[#007BFF] text-4xl'>Staffify</span> <br /> Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={formSubmitHandler}>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    onChange={onChangeHandle}
                    value={formData.email}
                    required
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="email"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    onChange={onChangeHandle}
                    value={formData.password}
                    required
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                    Login
                  </button>
                </div>
              </div>
              </form>
            </div>
          </div>
          <p className='text-end text-sm font-medium'>New to Staffify? <span onClick={()=>setAuthMode('signup')} className='font-bold cursor-pointer hover:text-blue-600'>SignIn</span> </p>
        </div>
      </div>
    </div>
    </>
  );
  
}

export default Login
