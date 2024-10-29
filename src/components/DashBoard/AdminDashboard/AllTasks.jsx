import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AllTasks = ({hideForm}) => {
  const navigate=useNavigate()
  const{url,token,user}=useContext(StoreContext)
  const[tasks,setTasks]=useState([]);

  const fetchTasks=async()=>{
     const response= await axios.get(url+'/api/task/fetch',{headers:{token}});
     if(response.data.success){
      
      //filtering tasks which are assigned by user
      let filteredTasks=response.data.tasks.filter((task)=>task.createdBy===user._id);
         setTasks(filteredTasks);            
        }
  };
  useEffect(()=>{
    fetchTasks();
  },[])
  return (
    <div className=' bg-white  p-5 mt-5 rounded '>
      <div className="headings border text-[#007BFF]  bg-[#007bff23]   mb-2 py-2 px-4 flex justify-between rounded  ">
        <h5 className=''>Name</h5>
        <h5>Task</h5>
        <h5>Status</h5>
     </div>
      <div>
        <div className={`overflow-auto admin-tasks ${!hideForm?'h-48 max-h-48':''}`}>
        {tasks.map((task,index)=>{
           return(
            <div 
             onClick={()=>{navigate('/adminDashboard/profile',{state:{userId:task.user._id}})}} 
             key={index} className={`border-2  mb-2 py-2 px-4 flex justify-between rounded cursor-pointer border-[#28a74681] hover:bg-[#28a74681] hover:text-white `}>
             <h2>{task.user.name.split(' ')[0]}</h2>
             <h3 className='text-sm'>{task.title}</h3>
             <h5>{task.status?task.status:'Not accepted'}</h5>
           </div>
           )
        })}
        </div>
    </div>
    </div>
  )
}

export default AllTasks 
