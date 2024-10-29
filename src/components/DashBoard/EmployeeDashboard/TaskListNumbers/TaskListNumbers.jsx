import React, { useContext } from 'react'
import {StoreContext} from '../../../../Context/AuthContext.jsx'

const TaskListNumbers = () => {
    const {user}=useContext(StoreContext);
    console.log(user);
    
  return (
    <div className='flex w-full gap-2 sm:gap-5 justify-center flex-wrap sm:flex-nowrap  '>
        <div className="new-task px-3 sm:px-9 py-3 sm:py-6 w-[45%] text-red-500 bg-red-100 rounded-lg">
            <h2 className='text-5xl sm:text-7xl  font-bold sm:font-bold '>{user.tasks.reduce((acc, task) => acc + (task.newTask ? 1 : 0), 0)}</h2>
            <h3 className='text-xl text-nowrap sm:text-2xl font-semibold  sm:font-bold'>New Task</h3>
        </div>
        <div className="new-task px-3 sm:px-9 py-3 sm:py-6  w-[45%] text-[#007BFF] bg-blue-100 rounded-lg">
            <h2 className='text-5xl sm:text-7xl  font-semibold sm:font-bold  '>{user.tasks.reduce((acc, task) => acc + (task.completed ? 1 : 0), 0)}</h2>
            <h3 className='text-xl text-nowrap sm:text-2xl font-semibold sm:font-bold'>Completed</h3>
        </div>
        <div className="new-task px-3 sm:px-9 py-3 sm:py-6 h-1/4  w-[45%] text-[#28A745] bg-green-100 rounded-lg">
            <h2 className='text-5xl sm:text-7xl  font-semibold sm:font-bold '>{user.tasks.reduce((acc, task) => acc + (task.accepted ? 1 : 0), 0)}</h2>
            <h3 className='text-xl text-nowrap sm:text-2xl font-semibold sm:font-bold'>Accepted</h3>
        </div>
        <div className="new-task px-3 sm:px-9 py-3 sm:py-6 h-1/4  w-[45%] text-yellow-600 bg-yellow-100 rounded-lg">
            <h2 className='text-5xl sm:text-7xl  font-semibold sm:font-bold  '>{user.tasks.reduce((acc, task) => acc + (task.failed ? 1 : 0), 0)}</h2>
            <h3 className='text-xl text-nowrap sm:text-2xl font-semibold sm:font-bold'>Failed</h3>
        </div>

    </div>
  )
}

export default TaskListNumbers
