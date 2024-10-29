// import React from 'react'


// const addComment = async (e, taskId) => {
//   e.preventDefault();
//   if (!comment) return toast.warning('Enter something first');

//   try {
//     const response = await axios.post(`${url}/api/task/addComment`, { taskId, comment }, { headers: { token } });
//     if (response.data.success) {
//       toast.success(response.data.message);
  
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       setUser(response.data.user);
//       setComment('');
//     } else {
//       toast.error(response.data.message);
//     }
//   } catch (error) {
//     console.error("Error adding comment", error);
//     toast.error("An error occurred while adding the comment");
//   }
// };


// const Tasks = ({task,showDetails,showModal,comment}) => {
//   return (
//     <div>
//                           <div className="flex flex-col border-2 rounded-md border-gray-200 p-3">
//                       {/* comments */}
//                       {showDetails===task._id&&
//                        <>
//                          <hr className="my-2" />
//                        </>}

//                       <div className="flex flex-col  relative">
//                         <div className="options flex justify-between  items-center gap-2">
       
//                           <div className="delete-share flex gap-2 text-nowrap">
//                           {/* Delete option for specific statuses */}
//                           {(showModal === 'newTask' || showModal === 'status:Failed' || showModal === 'status:Completed') && (
//                             <p 
//                               onClick={(e) => deleteTask(e,task._id)}
//                               className="cursor-pointer hover:text-red-400"
//                             >
//                               <span className="hidden sm:inline">Delete</span> 
//                               <i className="bx bx-task-x align-text-bottom"></i>
//                             </p>
//                           )}
//                           {/* Assign to other for status:Failed and newTask */}
//                           {(showModal === 'status:Failed' || showModal === 'newTask') && (
//                             <>
//                               |
//                               <p 
//                                 onClick={(e) =>{ e.stopPropagation(); setShowUsers(prev => prev === task._id ? '' : task._id)}}
//                                 className="cursor-pointer hover:text-blue-400"
//                               >
//                                 <span className="hidden sm:inline">Assign to other</span> 
//                                 <i className="bx bxs-share bx-flip-horizontal align-text-bottom"></i>
//                               </p>
//                             </>
//                           )}
//                         </div>
//                         </div>
                        
//                         {/* Show users list for task reassignment */}
//                         {showUsers === task._id && (
//                           <div className="show-users bg-gray-100 shadow-sm rounded-xl absolute p-3 mt-8 w-full">
//                             <ul>
//                               {users.map((user, index) => (
//                                 <li
//                                   key={index}
//                                   onClick={() => transferTask(user._id, task._id)}
//                                   className="m-1 cursor-pointer"
//                                 >
//                                   {user.name} <span className="ms-2 text-xs">{user.email}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//     </div>
//   )
// }

// export default Tasks
