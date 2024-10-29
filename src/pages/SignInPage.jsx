import React, { useState } from 'react'
import Login from '../components/Auth/Login/Login'
import NewSignIn from '../components/Auth/Login/NewSignIn'

const SignIn = () => {
  const[authMode,setAuthMode]=useState('login')
  return (
    <div>
      {authMode==='login'? <Login  setAuthMode={setAuthMode} />:<NewSignIn setAuthMode={setAuthMode} />}
    </div>
  )
}

export default SignIn
