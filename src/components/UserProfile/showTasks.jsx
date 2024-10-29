import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from 'react-toastify';

export default function ShowTasks({ showModal, setShowModal, tasks, getUser }) {
  const [title, setTitle] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showUsers, setShowUsers] = useState('');
  const [comments, setComments] = useState({});
  const [showDetails,setShowDetails]= useState(false);
  const { users, fetchUsers, url, token,user } = useContext(StoreContext);
  const id=user._id;
  let filteredUsers=users.filter((user)=>user.admin===id);

  const getUsers=(task)=>{
      fetchUsers();
      setShowUsers(prev => prev === task._id ? '' : task._id)
    }
  

  const transferTask = async (targetUserId, taskId) => {

    try {
      const response = await axios.post(`${url}/api/task/changeUser`, { taskId, targetUserId }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        getUser();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error Occurred');
    }
  };

  const deleteTask = async (e,taskId) => {
    e.stopPropagation()
    try {
      const response = await axios.delete(`${url}/api/task/delete`, {
        headers: { token },
        data: { taskId }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getUser();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error Occurred');
    }
  };

  const addComment = async(e,taskId) => {
    e.preventDefault()
    if(!comments[taskId])
      return toast.warning('Enter something first')

    const response=await axios.post(url+'/api/task/addComment',{taskId,comment:comments[taskId]},{headers:{token}});
    if(response.data.success){
      toast.success(response.data.message)
      setComments(prevComments => ({
        ...prevComments,
        [taskId]: ""
    }));
      getUser();
    }
    else
    toast.error(response.data.message)
  };

  useEffect(() => {
    fetchUsers();
    if (showModal) {
      let tasksToShow = [];
      switch (showModal) {
        case 'newTask':
          tasksToShow = tasks.filter(task => task.newTask);
          setTitle("New Tasks");
          break;
        case 'accepted':
          tasksToShow = tasks.filter(task => task.status==='Active');
          setTitle('Accepted Tasks');
          break;
        case 'status:Completed':
          tasksToShow = tasks.filter(task => task.status === 'Completed');
          setTitle('Completed Tasks');
          break;
        case 'status:Failed':
          tasksToShow = tasks.filter(task => task.status === 'Failed');
          setTitle('Failed Tasks');
          break;
        default:
          break;
      }
      setFilteredTasks(tasksToShow);
    }
  }, [showModal, tasks]);

  return (
    <>
      {showModal && (
        <>
          <div className="flex justify-center h-full items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[51] outline-none focus:outline-none">
            <div className="relative w-[95%] sm:w-auto md:min-w-96 my-6 mx-auto max-w-3xl bg-white rounded-lg shadow-lg">
              {/* Modal Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black text-2xl"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>

                {/* Body */}
                <div className="relative admin-tasks p-6 flex-auto flex flex-col h-96 overflow-auto gap-3">
                  {filteredTasks.map((task, index) => (
                    <div onClick={()=>{setShowDetails(prev=> prev===task._id?false:task._id)}} key={index} className="flex flex-col border-2 rounded-md border-gray-200 p-3">
                      <div className="title mb-2">
                        <p className="text-xl font-semibold">{task.title}</p>
                      </div>
                      <div className="details flex text-sm font-light">
                        <p>{task.category} |</p>
                        <p>&nbsp; Sent on {new Date(task.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
                      </div>
                      <hr className="my-2" />
                      <p>{task.description}</p>
                      <hr className="my-2" />

                      {/* comments */}
                      {showDetails===task._id&&
                       <>
                         <p>comments</p>
                         {task.comments.map((comment, index) => {
                             return (
                               <div className="flex items-center my-2" key={index}>
                                
                                 <p className="flex-grow w-1/2 overflow-wrap break-words">
                                 {comment.createdBy.name}
                                   {comment.title}
                                 </p>
                                 
                                 {/* Timestamp with text alignment */}
                                 <p className="text-sm text-gray-500 ml-2 whitespace-nowrap">
                                   {new Date(comment.createdAt).toLocaleTimeString()}
                                 </p>
                               </div>
                             );
                           })}

                         <hr className="my-2" />
                       </>}
                      <div className="flex flex-col  relative">
                        <div className="options flex justify-between  items-center gap-2">


                         {/* Add Comment option on accepted and newTask */}
                          {(showModal === 'accepted' || showModal === 'newTask') && (
                            <form  onSubmit={(e)=>{addComment(e,task._id)}} className="w-[65%]">
                                <div className="add-comment w-full relative ">
                                 <input
                                  onClick={(e)=>{e.stopPropagation()}}
                                   value={comments[task._id]||''}
                                  onChange={(e)=>{setComments((prev)=>({...prev,[task._id]:e.target.value}))}}
                                  className=" w-full rounded shadow-sm bg-slate-100 shadow-slate-400 mt-1 px-3 py-1 text-sm  outline-none"
                                  type="text"
                                  placeholder="Add comment"
                                 />
                                 <button 
                                 onClick={(e)=>e.stopPropagation()}
                                  type="submit"
                                  className="absolute right-2 translate-y-1/4 transition-all duration-500 bg-slate-100">
                                  <i class='bx bxs-send'></i>
                                 </button>
                                </div>
                                </form>
                          )}
                          <div className="delete-share flex gap-2 text-nowrap">
                          {/* Delete option for specific statuses */}
                          {(showModal === 'newTask' || showModal === 'status:Failed' || showModal === 'status:Completed') && (
                            <p 
                              onClick={(e) => deleteTask(e,task._id)}
                              className="cursor-pointer hover:text-red-400"
                            >
                              <span className="hidden sm:inline">Delete</span> 
                              <i className="bx bx-task-x align-text-bottom"></i>
                            </p>
                          )}
                          {/* Assign to other for status:Failed and newTask */}
                          {(showModal === 'status:Failed' || showModal === 'newTask') && (
                            <>
                              |
                              <p 
                                onClick={(e) =>{ e.stopPropagation(); getUsers(task)}}
                                className="cursor-pointer hover:text-blue-400"
                              >
                                <span className="hidden sm:inline">Assign to other</span> 
                                <i className="bx bxs-share bx-flip-horizontal align-text-bottom"></i>
                              </p>
                            </>
                          )}
                        </div>
                        </div>
                        
                        {/* Show users list for task reassignment */}
                        {showUsers === task._id && (
                          <div className="show-users bg-gray-100 shadow-sm rounded-xl absolute p-3 mt-8 w-full">
                            <ul>
                              {filteredUsers.map((user, index) => (
                                <li
                                  key={index}
                                  onClick={() => transferTask(user._id, task._id)}
                                  className="m-1 cursor-pointer"
                                >
                                  {user.name} <span className="ms-2 text-xs">{user.email}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid">
                  <button
                    className="text-red-500 font-bold uppercase px-6 py-2 text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-65 fixed inset-0 z-50 bg-black"></div>
        </>
      )}
    </>
  );
}
