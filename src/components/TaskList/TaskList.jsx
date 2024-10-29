import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/AuthContext';
import SingleTask from './SingleTask';
import axios from 'axios';
import { toast } from 'react-toastify';

const TaskList = () => {
  const { url, token } = useContext(StoreContext);
  const [tasks, setTasks] = useState([]);
  const [showComments, setShowComments] = useState('All');

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${url}/api/task/fetch/user`, {
        headers: { token },
      });
      if (response.data.success) {
        setTasks(response.data.tasks);
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    }
  };

  // Function to update task status
  const markTask = async (id, status, e) => {
    e.stopPropagation();
    try {
      const response = await axios.put(
        `${url}/api/task/update`,
        { status, taskId: id },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchTasks();
        toast.success(response.data.message);
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      id="tasklist"
      className="h-2/3 overflow-x-scroll w-full mt-10 py-4 flex flex-col sm:flex-row flex-nowrap gap-2"
    >
      {tasks.map((task) => (
        <div
          key={task._id}
          onMouseLeave={() => setShowComments(false)}
          onClick={()=>setShowComments((prev) =>prev === task._id ? 'All' : task._id)}
          className={`flex flex-col justify-between gap-3 sm:h-full sm:flex-shrink-0 w-[100%] sm:w-[25rem]  rounded-3xl p-3 transition-all duration-1000 ease-in-out`}
        >
          <SingleTask task={task} />


          {task.status !== 'Completed' && task.status !== 'Failed' && (
            <div
              className={`accept-complete-failed ${showComments !== task._id ? ' sm:inline' :'' }`}
            >
              {!task.accepted ? (
                <div
                  onClick={(e) => markTask(task._id, 'accepted', e)}
                  className={`priority cursor-pointer text-center bg-[#007bffbb] p-1 rounded-xl`}
                >
                  <p>Accept Task</p>
                </div>
              ) : (
                <div>
                  <div className="complete-fail flex justify-around text-sm">
                    <button
                      onClick={(e) => markTask(task._id, 'Completed', e)}
                      className="bg-green-100 text-[#28A745] p-1 rounded-md"
                    >
                      Mark as completed
                    </button>
                    <button
                      onClick={(e) => markTask(task._id, 'Failed', e)}
                      className="bg-red-100 text-red-500 p-1 rounded-md"
                    >
                      Mark as failed
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
