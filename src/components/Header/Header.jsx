import React, { useContext,useState } from 'react'
import { StoreContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {setToken,user}=useContext(StoreContext);
  const [dropDown,setDropDown]=useState(false);

  
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.setItem('token','');
    localStorage.setItem('userName','');
    localStorage.setItem('role','')
    setToken('')
  }
  return (
    <div className='flex flex-col '>
     <div className='z-50 fixed w-full shadow shadow-zinc-200 py-8 md:py-12  px-10 sm:px-8 lg:px-40 flex h-20 justify-between items-center mb-3 bg-white text-gray-600'>
      <h1 onClick={()=>navigate('/')} className='cursor-pointer text-xl text-[#007BFF] font-medium'>Staffify
      </h1>
      <div className="header-optioins flex gap-3 justify-evenly items-center">


      {/* mobile options */}
      <div className="mobile-view flex gap-4 items-center md:hidden">
           <div className="noti-bell relative">
             <i onClick={()=>navigate('/notification')} class='bx bxs-bell text-xl focus:text-[#007BFF] hover:text-[#007BFF] cursor-pointer'></i>
            {user.notifications.length>0&& <i class='bx bxs-circle absolute text-[#007BFF]  text-[0.5rem] top-0 right-0 '></i>}
           </div>
           <button onClick={()=>{setDropDown(!dropDown)}} className={`switch  text-3xl focus:text-[#007BFF]`}>  
            {dropDown ? (
               <i className="bx bx-x rotate-90 transition all" />
             ) : (
               <i className="bx bx-menu " />
             )}
            </button>
      </div>


      {/* pc-options */}
      <div className="header-option hidden md:flex items-center gap-3">
          <div className="noti-bell relative">
             <i onClick={()=>navigate('/notification')} class='bx bxs-bell text-xl focus:text-[#007BFF]'></i>
             {user.notifications.length>0&& <i class='bx bxs-circle absolute text-[#007BFF] text-[0.5rem] top-0 right-0'></i>}
           </div>
      <button onClick={logout} className='hover:text-[#007BFF] rounded-sm py-1 px-3 font-medium'>Logout</button>
      <p
       onClick={()=>navigate('/createUser')}
       className=' md:inline hover:text-[#007BFF] font-medium cursor-pointer'>
        Create User
      </p>
      </div>
      </div>
     </div>
     <div onClick={()=>setDropDown(!dropDown)} className={`mobile-lists md:hidden fixed w-full ${dropDown?'top-20':'-top-20'}  flex flex-col justify-center z-40 border  bg-white transition-all duration-500 py-4`}>
     <ul>
       <li 
        onClick={()=>navigate('/createUser')}
        className='w-full align-text-bottom hover:bg-slate-200 p-4'>
         Create User
       </li>
       <li onClick={logout} 
         className='w-full hover:bg-slate-200 p-4'>
         Logout
         </li>
     </ul>
     </div>

    </div>
  )
}
export default Header