import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const StoreContext = createContext(null);

const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user'))||'')
  const url = 'http://localhost:8080';
  const[users, setUsers]=useState([]);

  const fetchUsers=async()=>{
      const response=await axios.get(url+'/api/user/fetch',{headers:{token}});
      if(response.data.success){
        setUsers(response.data.users);
      }
    }    
  const ContextValue = {
    token,
    setToken,
    url,
    users,
    setUsers,
    fetchUsers,
    user,
    setUser
  };

  useEffect(() => {
    // If no token, navigate to the login page
    if (!token) {
      navigate('/');
    } else {
      // If token exists, redirect based on role
      
      const dashboardRoute = user.role === 'admin' ? '/adminDashboard' : '/eployeeDashboard';
      if (window.location.pathname === '/') {
        navigate(dashboardRoute);
      }
    }
  }, [token, user.role, navigate]);

  return (
    <StoreContext.Provider value={ContextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default AuthContext;
