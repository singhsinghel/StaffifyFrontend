import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


const UserTasks = ({hideForm}) => {
    const navigate=useNavigate()
    const{users,fetchUsers,user}=useContext(StoreContext)
    const id=user._id;
    let filteredUsers=users.filter((user)=>user.admin===id);

      useEffect(()=>{
           fetchUsers();
      },[])
  return (
    <div className="user-tasks bg-white  p-5 mt-5 rounded ">
    <div  className={`headings text-[#007BFF]  bg-[#007bff23]   mb-2 py-2 rounded  flex`}>
               <h2 className='w-1/4 text-center'>Name</h2>
               <h3 className='w-1/4 text-center'>Active</h3>
               <h5 className='w-1/4 text-center'>Completed</h5>
               <h5 className='w-1/4  text-center'>Failed</h5>
          </div>
          <div className={`user-details overflow-auto ${!hideForm&&' h-48 '}flex flex-col justify-evenly`}>
        {filteredUsers.length>0&&
         filteredUsers.map((user,index)=>{
            return(
              <div onClick={()=>{navigate('/adminDashboard/profile',{state:{userId:user._id}})}} 
               key={index} className={` mb-2 flex border-2 border-[#28a74681] rounded py-2 cursor-pointer hover:bg-[#28a74681] hover:text-white`}>
               <h2  className='w-1/4  text-center'>{user.name.split(' ')[0]}</h2>
               <h3 className='w-1/4 text-center'>{user.tasks.reduce((acc,task)=>acc+(task.status==='Active'?1:0),0)}</h3>
               <h5 className='w-1/4 text-center'>{user.tasks.reduce((acc,task)=>acc+(task.status==='Completed'?1:0),0)}</h5>
               <h5 className='w-1/4  text-center'>{user.tasks.reduce((acc,task)=>acc+(task.status==='Failed'?1:0),0)}</h5>
          </div>
            )
          })
        }
        </div>
    </div>
  )
}

export default UserTasks;
