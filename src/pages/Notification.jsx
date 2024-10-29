import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getDate } from '../utils/Functions';
import axios from 'axios';
import { toast } from 'react-toastify';
import SingleTask from '../components/TaskList/SingleTask';

const Notification = () => {
  const { user, url, token, setUser } = useContext(StoreContext);
  const [deleteButton, setDeleteButton] = useState();
  const [comment, setComment] = useState('');
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  const deleteNotification = async (e) => {
    e.stopPropagation()
    try {
      const response = await axios.post(`${url}/api/user/deleteNoti`, { notiId: deleteButton }, { headers: { token } });
      if (response.data.success) {
        
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
      } else {
        toast.error("Can't delete the notification");
      }
    } catch (error) {
      console.error("Error deleting notification", error);
      toast.error("An error occurred while deleting the notification");
    }
  };

  return user.notifications.length > 0 ? (
    <div>
      <div className="flex mt-8 justify-center">
        <div className="w-1/6 hidden lg:inline">
          <p onClick={() => navigate(-1)} className="text-[#007BFF] font-semibold text-nowrap cursor-pointer">
            <i className="bx bx-arrow-back"></i> Back to previous
          </p>
        </div>
        <div className="w-full md:w-4/6 lg:w-1/2 h-dvh  md:px-0 ">
          <div className="heading flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">
              <i onClick={() => navigate(-1)} className="bx bx-arrow-back me-2 cursor-pointer hover:text-[#007BFF]"></i>
              Notifications
            </h1>
            <p className="lg:hidden text-end font-semibold text-gray-400">Mark all as read</p>
          </div>
          <p className="hidden lg:block hover:text-gray-500 cursor-pointer text-end font-semibold text-gray-400">
            Mark all as read
          </p>

          {/* mapping all notifications */}
          <div className="notifications rounded-md bg-white flex flex-col mt-5">
            {user.notifications.map((notification, index) => (
              <div
                key={index}
                onClick={() => {
                  notification.taskId ? setTask(notification.taskId) : setTask(null);
                }}
                onMouseEnter={() => {setDeleteButton(notification._id);console.log(notification)}
                }
                onMouseLeave={() => setDeleteButton(null)}
                className={`flex justify-between hover:bg-slate-100 ${
                  index === user.notifications.length - 1 ? '' : 'border-b border-gray-200'
                } items-center w-full cursor-pointer p-4`}
              >
                <p>{notification.message}</p>
                {deleteButton !== notification._id ? (
                  <p className="text-xs font-medium text-gray-400">{getDate(notification.createdAt)}</p>
                ) : (
                  <i onClick={deleteNotification} className="bx bx-x text-[#007bff]"></i>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/6 hidden lg:inline"></div>
      </div>

      {/* modal to show task */}
      {task && (
        <>
          <div
            onClick={() => setTask(null)}
            className=" flex flex-col justify-center h-full items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[51] outline-none focus:outline-none"
          >
            <SingleTask task={task} />
          </div>
          <div className="opacity-35 fixed inset-0 z-50 bg-black"></div>
        </>
      )}
    </div>
  ) : (
    <p className="h-dvh text-center mt-auto">You don't have any notifications</p>
  );
};

export default Notification;
