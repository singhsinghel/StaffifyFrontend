import './App.css'
import Header from './components/Header/Header';
import {Route,Routes, useNavigate} from 'react-router-dom'
import SignIn from './pages/SignInPage';
import Edashboard from './pages/Edashboard';
import Adashboard from './pages/Adashboard';
import UserProfile from './pages/UserProfile';
import { useContext, useEffect } from 'react';
import { StoreContext } from './Context/AuthContext';
import Alert from './components/alerts/Alert';
import Notification from './pages/Notification';
import CreateUser from './pages/CreateUser';
import Footer from './components/Footer/Footer';

function App() {

  const {token,user}=useContext(StoreContext);
  return (
    <>
    {token&&<Header />}
    
    <div className={`${token&&"pt-[6rem] p-3"} text-[#343A40]  px-0 sm:px-4 lg:px-40`}>
      <Alert />
    <Routes>
      <Route path='/notification' element={<Notification />} />
      {!token&&<Route path='/' element={<SignIn />} />}
      {user.role==='admin' 
      ?(
        <>
      <Route path='/createUser' element={<CreateUser />} />
      <Route path='/adminDashboard' element={<Adashboard />} /> 
      <Route path='/adminDashboard/profile'element={<UserProfile />} />
      </>
      )
      :
      <>
      <Route path='/employeeDashboard' element={<Edashboard />} />
  
      </>
      } 
    </Routes>
    </div>
      {token&&<Footer />}
    </>
  )
}

export default App
