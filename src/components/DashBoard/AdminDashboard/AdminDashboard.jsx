import React, { useState } from 'react'
import CreateTask from './CreateTask';
import AllTasks from './AllTasks';
import UserTasks from './UserTasks';

const AdminDashboard = () => {
  const [showUsers,setShowUsers]=useState('tasks');
  const [hideForm,setHideForm]=useState(false)
  return (
  <>
    {!hideForm&&<CreateTask />}

    <div className={`tasks ${hideForm ? 'hideForm' : ''} transition-all`}>

      <div className="switches flex justify-center">
           {!hideForm&& 
           <i
           onClick={()=>{setHideForm(true)}}
           class='bx bx-chevrons-down bx-flip-vertical text-3xl hover:text-[#28A745]' >
           </i>
            }

            {hideForm &&
            <i onClick={()=>{setHideForm(false)}} class='bx bx-chevrons-down text-3xl hover:text-[#28A745]' ></i>
              }
      </div>

     <div className="switch flex justify-center gap-10 px-6 mt-4 ">
      <p onClick={()=>{setShowUsers('tasks')}} className={`cursor-pointer text-center  ${showUsers==='tasks'&& 'rounded border-b-4 border-[#007BFF]  '}transition-all`}>Tasks</p>
      <p onClick={()=>{setShowUsers('users')}} className={`cursor-pointer ${showUsers==='users'&& 'rounded border-b-4 border-[#007BFF] '} transition-all`}>Users </p>
     </div>
     {showUsers === 'tasks' && <AllTasks hideForm={hideForm} />}
     {showUsers === 'users' && <UserTasks hideForm={hideForm} />}
    </div>
  </>
  );
  
}

export default AdminDashboard
