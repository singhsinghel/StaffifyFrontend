import axios from 'axios';
import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';

const CreateTask = () => {
  const { url, token } = useContext(StoreContext);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    assignTo: { name: '', email: '' }, // Updated to store name and email as object
    category: '',
  });
  
  const filteredItems = users.filter(user =>
    user.name.toLowerCase().includes(formData.assignTo.name.toLowerCase()) // Case-insensitive search
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('assignTo.')) {
      setFormData((prev) => ({
        ...prev,
        assignTo: {
          ...prev.assignTo,
          name: value, 
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const resetFormData=()=>{
    setFormData({
      title: '',
      description: '',
      date: '',
      assignTo: { name: '', email: '' },
      category: '',
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        url + '/api/task/create',
        { task: formData, assignTo: formData.assignTo },
        { headers: { token } }
      );
      if (response.data.success) {
        resetFormData();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error occurred');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(url + '/api/user/fetch');
      if (response.data.success) {
        const users = response.data.users;
        // Storing users who are not admins
        const nonAdmins = users.filter((user) => user.role === 'employee');
        setUsers(nonAdmins)
      }
    } catch (error) {
      toast.warn('Cannot access data of users');
    }
  };


  return (
    <>
      <div className="  ">
        <h3 className="font-medium text-2xl mb-4">Create Task</h3>
        <form
          onSubmit={handleSubmit}
          className="rounded bg-white w-[100%] grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:flex justify-between"
        >
          <div className="pc-layout-inputs w-[100%] md:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Task Title */}
            <div className="name col-span-2 ">
              <label htmlFor="titleInput" className="block mb-1">
                Task Title
              </label>
              <input
                required
                onChange={handleChange}
                name="title"
                value={formData.title}
                id="titleInput"
                type="text"
                placeholder="Enter task title"
                className="w-full p-2 rounded-md outline-none border-2 border-gray-400 bg-inherit"
              />
            </div>

            {/* Description */}
            <div className="description col-span-2 md:hidden">
              <label htmlFor="descriptionInput" className="block mb-1">
                Description
              </label>
              <textarea
                required
                onChange={handleChange}
                name="description"
                value={formData.description}
                id="descriptionInput"
                placeholder="Enter task description"
                className="w-full p-2 rounded-md outline-none border-2 border-gray-400 bg-inherit"
              />
            </div>

            {/* Date */}
            <div className="date col-span-2">
              <label htmlFor="dateInput" className="block mb-1">
                Date
              </label>
              <input
                required
                onChange={handleChange}
                name="date"
                value={formData.date}
                id="dateInput"
                type="date"
                className="w-full p-2 rounded-md outline-none border-2 text-white border-gray-400 bg-inherit"
              />
            </div>

            {/* Assign To */}
            <div className="assign-to col-span-2 relative ">
              <label htmlFor="assignTo" className="block mb-1">
                Assign To
              </label>
              <input
                required
                onClick={fetchUsers}
                onChange={handleChange}
                name="assignTo.name" // Update for name input
                value={formData.assignTo.name}
                type="text"
                id="assignTo"
                placeholder="Enter name"
                className="w-full p-2 rounded-md outline-none border-2 border-gray-400 bg-inherit"
              />
              {users.length>0&&<p className='absolute right-3 top-[50%]'><i onClick={()=>setUsers([])} className='bx bx-x text-xl'></i></p>}
              {users.length > 0 && (
                <div className="list w-full absolute bg-zinc-200 z-10 overflow-auto max-h-50">
                  <ul>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, index) => (
                        <li
                          onClick={() => {
                            setUsers([]);
                            setFormData((prev) => ({
                              ...prev,
                              assignTo: {
                                name: item.name,
                                email: item.email,
                              },
                            }));
                          }}
                          className="m-1 cursor-pointer  h-8 hover:bg-zinc-300"
                          key={index}
                        >
                          {item.name.split(' ')[0]}&nbsp;
                          <span className="ms-2 font-thin text-s  cursor-pointer ">
                            {item.email}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className='p-3'>No matching users</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Category */}
            <div className="category col-span-2">
              <label htmlFor="categoryInput" className="block mb-1">
                Category
              </label>
              <select
                onChange={handleChange}
                name="category"
                value={formData.category}
                id="categoryInput"
                className="w-full p-2 rounded-md border-2 border-gray-400 bg-inherit"
              >
                <option className="text-black" value="High">
                  High
                </option>
                <option className="text-black" value="Low">
                  Low
                </option>
                <option className="text-black" value="Regular">
                  Regular
                </option>
              </select>
            </div>
            <button type='button'
            onClick={()=>resetFormData()}
              className="col-span-2  text-[#007BFF] hover:bg-[#007BFF] hover:text-white flex justify-center items-center  px-4 py-3 rounded-md focus:outline-none md:hidden">
              <i className='bx bx-x'></i>
              Cancel
            </button>
            <button className="col-span-2 border-2 border-[#28A745]  hover:bg-[#28A745]  px-4 py-3 rounded-md focus:outline-none md:hidden">
              Create
            </button>
          </div>

          <div className="pc-layout-description flex flex-col justify-evenly w-[50%]">
            <div className="description md:col-span-2 hidden md:block ">
              <label htmlFor="descriptionInput" className="block mb-1">
                Description
              </label>
              <textarea
                required
                rows={9}
                onChange={handleChange}
                name="description"
                value={formData.description}
                id="descriptionInput"
                placeholder="Enter task description"
                className="w-full p-2 rounded-md outline-none border-2 border-gray-400 bg-inherit"
              />
              <div className="buttons flex justify-between gap-2">
                <button className="col-span-1 border-2  border-[#007BFF] hover:bg-[#007BFF] hover:text-white justify-center items-center w-[50%]  px-4 py-3 rounded-md focus:outline-none hidden md:flex">
                  <i className='bx bx-x'></i>
                  Cancel
                </button>
                <button className="col-span-1 border-2 border-[#28A745]  hover:bg-[#28A745] hover:text-white justify-center items-center w-[50%]  px-4 py-3 rounded-md focus:outline-none hidden md:flex">
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTask;
