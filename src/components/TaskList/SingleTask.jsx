import React, { useContext, useState } from 'react'
import { StoreContext } from '../../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const singleTask = ({task}) => {
    const [comment,setComment]=useState();
    const {url,token,user,setUser}=useContext(StoreContext);
    const addComment = async (e, taskId) => {
        e.preventDefault();
        if (!comment) return toast.warning('Enter something first');
      
        try {
          const response = await axios.post(`${url}/api/task/addComment`, { taskId, comment }, { headers: { token } });
          if (response.data.success) {
            toast.success(response.data.message);
        
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            setComment('');
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error("Error adding comment", error);
          toast.error("An error occurred while adding the comment");
        }
      };
  return (
    <div>
           {task && (
        <>
            <div
              onClick={(e) => e.stopPropagation()}
              className="task-details max-w-96 h-96 flex flex-col justify-between sm:max-w-full bg-white p-4 rounded-lg"
            >
              <div className="task-details">
              <div className="title flex justify-between mb-2">
                <p className="text-xl font-bold">{task.title}</p>
              </div>
              <div className="details flex items-center text-sm font-medium">
                <p className={` px-1  rounded-md ${task.category==='Low'?'bg-green-100 text-[#28A745]':task.category==='Medium'?'text-[#007BFF] bg-blue-100':'text-red-800 bg-red'}`}>{task.category}</p>
                &nbsp;
                 |
                 &nbsp; 
                <p className='text-xs'>
                  {new Date(task.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  &nbsp;{new Date(task.date).toLocaleTimeString('en-IN', { minute:'2-digit',hour:'2-digit'})}
                  </p>
              </div>
              <hr className="my-2" />
              <p>{task.description}</p>
              <hr className="my-2" />
              {task.comments&& task.comments.length>0&&
                <div className='max-h-48 overflow-scroll no-scroll'>
                 <p className='font-semibold'>Comments</p>

                 {/* comments of task */}
                 {task.comments.map((comment, idx) => (
                    <div key={idx} className="flex justify-between items-center my-2">
                       <p className=" flex  w-2/3 flex-col md:flex-row gap-0 md:gap-2">
                         <span className='font-medium '>{comment.createdBy? (comment.createdBy.name===user.name?<p>You</p>:<p>{comment.createdBy.name}</p>):<p>User</p> }</span>
                        <span className='font-normal w-full break-words'>{comment.title}</span> 
                        </p>
                       <p className="text-sm text-gray-500 ml-2 whitespace-nowrap">
                       {new Date(comment.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                       </p>
                </div> 
               ))}
              </div>
             }
             </div>

              <form onSubmit={(e) => addComment(e, task._id)} className="w-full">
                <div className="add-comment w-full relative">
                  <input
                    onClick={(e) => e.stopPropagation()}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full h-10 rounded shadow-sm bg-slate-100 shadow-slate-400 mt-1 px-3 py-1 text-sm outline-none"
                    type="text"
                    placeholder="Add comment"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 translate-y-1/2 transition-all duration-500 bg-slate-100"
                  >
                    <i className="bx bxs-send"></i>
                  </button>
                </div>
              </form>
            </div>
        </>
      )}
    </div>
  )
}

export default singleTask
