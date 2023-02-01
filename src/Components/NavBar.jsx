import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { signOut } from 'firebase/auth'

export const NavBar = () => {
  const {currentUser}=useContext(AuthContext);
  return (
    <div className='navBar'>
        <span className='logo'>FunShun</span>
        <div className='n1'> 
            <img className='l1' src={currentUser.photoURL} alt="" />
              <span>{currentUser.displayName}</span>
            <button className='bt' onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}
