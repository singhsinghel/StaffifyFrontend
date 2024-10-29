import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { StoreContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import ShowTasks from '../components/UserProfile/showTasks';

const userProfile = () => {

    //get id from state 
    const location=useLocation();
    const[user,setUser]=useState(null);
    const{userId}=location.state;
    const {url,token}=useContext(StoreContext);
    const [showModal, setShowModal] = useState(false);
    const [formData,setFormData]=useState({
      title: '',
      description: '',
      date: '',
      assignTo: { name: '', email: '' },
      category: '',
    });

    const handleChange=(e)=>{
      const {name,value}=e.target;
      setFormData((prev)=>({
       ...prev,
       [name]:value,
       assignTo:{namme:user.name,email:user.email}
      }))
    }
    const assignTask=async()=>{
      try {
        const response = await axios.post(
          url + '/api/task/create',
          { task: formData, assignTo: formData.assignTo },
          { headers: { token } }
        );
        if (response.data.success) {
          setFormData({
            title: '',
            description: '',
            date: '',
            assignTo: { name: '', email: '' },
            category: '',
          });
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error); 
        toast.error('Error occurred');
      }
    }
    
    const isbusy=user&&user.tasks.reduce((acc, task) => acc + (task.accepted &&task.status!=='Completed' ? 1 : 0), 0)
    const getUser=async()=>{
        try {
            const response=await axios.get(url+'/api/user/fetch/user',{headers:{id:userId}});
            if(response.data.success){
             setUser(response.data.user);             
              }
        } catch (error) {
            console.log(error);
        }
    }
    const switchRole=async()=>{
       try {
        const response = await axios.post(url+'/api/user/switchUser',{},{headers:{token}});
        if(response.data.success){
            toast.success(`${user.name} is promoted to admin`)
        }
       } catch (error) {
        
       }
    }
    useEffect(()=>{
     getUser()  
    },[url,userId])
    if(!user)
      return <p>loading...</p>
  return (
<div className="container  w-full mt-8  ">
  <div className="flex flex-wrap md:flex-nowrap gap-2 sm:gap-4 justify-center  ">
    <div className="w-full sm:w-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className=" bg-zinc-300 sm:text-center flex gap-10 items-start sm:block p-6">
            <img
              className="rounded-full border-4 w-16 md:w-64 border-white sm:mx-auto mb-4"
              src="../../src/assets/male.jpg"
              alt=""
            />
            <div className="name-email">
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <ul className="mt-1">
          <li className="border-b border-gray-200">
            <a  className="block py-3 px-4  hover:bg-gray-100">
               Profile
            </a>
          </li>
          <li className="border-b border-gray-200">
            <a  className={`block py-3 px-4 ${isbusy>0?'text-yellow-600':'text-green-600'} hover:bg-gray-100`}>
              {isbusy?'Working':'Free'}
              <span className={`text-sm float-right`}><i class='bx bxs-circle'></i></span>
            </a>
          </li>
          <li className="border-b border-gray-200">
            <a className="block py-3 px-4 text-gray-600 hover:bg-gray-100">
               Make Admin
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className=" details">
      <div className="bg-white shadow-md rounded-lg mb-6">
        <form className="p-4 flex flex-col gap-2">
              <input
                onChange={handleChange}
                name="title"
                value={formData.title}
                id="titleInput"
                type="text"
                placeholder="Task title"
                className="w-full p-2 rounded-md outline-none border-2 border-gray-400 bg-inherit"
              />
                <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                  placeholder="Task Description"
                  rows="2"
                  className="w-full p-3 border-2  rounded-md bg-inherit border-gray-400 focus:outline-none"
                ></textarea>
              <input
                onChange={handleChange}
                name="date"
                value={formData.date}
                id="dateInput"
                type="date"
                className="w-full p-2 rounded-md outline-none border-2 border-gray-400 bg-inherit"
              />
               <select
                onChange={handleChange}
                name="category"
                value={formData.category}
                id="categoryInput"
                className="w-full p-2 rounded-md border-2 border-gray-400 bg-inherit"
               >
                <option className="text-black" value="High">
                  High
                </option>
                <option className="text-black" value="Low">
                  Low
                </option>
                <option className="text-black" value="Regular">
                  Regular
                </option>
          </select>
        </form>
        <footer className="bg-zinc-100 border-t-2 border-gray-200 p-4 flex items-center rounded-lg justify-between">
          <button onClick={assignTask} className="bg-[#007BFF] text-white px-4 py-2 rounded-md">Assign Task</button>
          <ul className="flex space-x-4">
            <li>
              <a href={user.socials.github} className="text-gray-600">
                <i className="bx bxl-github text-xl"></i>
              </a>
            </li>
            <li>
              <a href={user.socials.linkedIn} className="text-gray-600">
                <i className="bx bxl-linkedin text-xl"></i>
              </a>
            </li>
          </ul>
        </footer>
      </div>
      <div id='personalDetails' className="bg-white  shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Bio Graph</h1>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 mb-4">
            <p><span className="font-semibold">First Name: </span> {user.name.split(' ')[0]}</p>
          </div>
          <div className="w-full md:w-1/2 mb-4">
            <p><span className="font-semibold">Last Name: </span> {user.name.split(' ')[1]} </p>
          </div>
          <div className="w-full md:w-1/2 mb-4">
            <p><span className="font-semibold">City: </span>{user.city}</p>
          </div>
          <div className="w-full md:w-1/2 mb-4">
            <p><span className="font-semibold">Birthday: </span>{new Date(user.birthDay).toLocaleDateString()}</p>
          </div>
          <div className="w-full md:w-1/2 mb-4">
            <p><span className="font-semibold">Post: </span>{user.post}</p>
          </div>
          <div className="w-full md:w-1/2 mb-4">
            <p><span className="font-semibold">Email: </span> {user.email}</p>
          </div>
          <div className="w-full md:w-1/2 mb-4">
            <p><span className="font-semibold">Mobile: </span> (+91) {user.mobile}</p>
          </div>
          <div className="w-full md:w-1/2 mb-4">
            <p><span className="font-semibold">Whatsapp: </span> (+91) {user.whatsapp}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-6">
  <div onClick={() => setShowModal('newTask')} className="bg-white cursor-pointer shadow-md rounded-lg p-4 md:p-6 flex items-center">
    <div className="flex-shrink-0">
      <div className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full bg-zinc-100 flex items-center justify-center text-xl md:text-lg lg:text-2xl text-blue-500">
      {user.tasks&&user.tasks.reduce((acc, task) => acc + (task.newTask ? 1 : 0), 0)}
      </div>
    </div>
    <div className="ml-4 md:ml-4 lg:ml-6">
      <h4 className="text-blue-500 text-lg md:text-base lg:text-xl font-semibold">New Task</h4>
      <p className="text-sm md:text-xs lg:text-sm">Started: 15 July</p>
      <p className="text-sm md:text-xs lg:text-sm">Deadline: 15 August</p>
    </div>
  </div>

  <div onClick={() => setShowModal('accepted')} className="bg-white cursor-pointer shadow-md rounded-lg p-4 md:p-6 flex items-center">
    <div className="flex-shrink-0">
      <div className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full bg-zinc-100 flex items-center justify-center text-xl md:text-lg lg:text-2xl text-yellow-500">
      {user.tasks&&user.tasks.reduce((acc, task) => acc + (task.status==='Active' ? 1 : 0), 0)}
      </div>
    </div>
    <div className="ml-4 md:ml-4 lg:ml-6">
      <h4 className="text-yellow-500 text-lg md:text-base lg:text-xl font-semibold">Active Tasks</h4>
      <p className="text-sm md:text-xs lg:text-sm">Started: 15 July</p>
      <p className="text-sm md:text-xs lg:text-sm">Deadline: 15 August</p>
    </div>
  </div>

  <div onClick={() => setShowModal('status:Completed')} className="bg-white cursor-pointer shadow-md rounded-lg p-4 md:p-6 flex items-center">
    <div className="flex-shrink-0">
      <div className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full bg-zinc-100 flex items-center justify-center text-xl md:text-lg lg:text-2xl text-green-500">
      {user.tasks&&user.tasks.reduce((acc, task) => acc + (task.status==='Completed' ? 1 : 0), 0)}
      </div>
    </div>
    <div className="ml-4 md:ml-4 lg:ml-6">
      <h4 className="text-green-500 text-lg md:text-base lg:text-xl font-semibold">Completed Tasks</h4>
      <p className="text-sm md:text-xs lg:text-sm">Started: 15 July</p>
      <p className="text-sm md:text-xs lg:text-sm">Deadline: 15 August</p>
    </div>
  </div>

  <div onClick={() => setShowModal('status:Failed')} className="bg-white cursor-pointer shadow-md rounded-lg p-4 md:p-6 flex items-center">
    <div className="flex-shrink-0">
      <div className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full bg-zinc-100 flex items-center justify-center text-xl md:text-lg lg:text-2xl text-red-500">
      {user.tasks&&user.tasks.reduce((acc, task) => acc + (task.status==='Failed' ? 1 : 0), 0)}
      </div>
    </div>
    <div className="ml-4 md:ml-4 lg:ml-6">
      <h4 className="text-red-500 text-lg md:text-base lg:text-xl font-semibold">Failed Tasks</h4>
      <p className="text-sm md:text-xs lg:text-sm">Started: 15 July</p>
      <p className="text-sm md:text-xs lg:text-sm">Deadline: 15 August</p>
    </div>
  </div>
    </div>
    </div>
  </div>
  <ShowTasks showModal={showModal} setShowModal={setShowModal} tasks={user.tasks} getUser={getUser} />
</div>
      );
    };
    

    


export default userProfile
