import React from 'react'
import './employeeDashboard.css'
import TaskListNumbers from './TaskListNumbers/TaskListNumbers'
import TaskList from '../../TaskList/TaskList'

const EmployeeDashboard = () => {
  return (
    <div className='px-4 sm:mt-8 sm:px-12 h-screen'> 
      <TaskListNumbers />
      <TaskList />
    </div>
  )
}

export default EmployeeDashboard
