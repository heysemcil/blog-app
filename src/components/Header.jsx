import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'

export default function Header() {

  const {userInfo, logout } = useAuth()
  const navigate = useNavigate()
  return (
  <nav className='border-gray-200 bg-gray-50 shadow-sm'>
    <div className="container mx-auto flex flex-wrap items-center justify-between p-2">
      <Link to="/" className='text-2xl font-semibold'> Blog App </Link>
      <div className='w-full md:inline-block md:w-auto'>
        <ul className='flex flex-col items-center space-y-4 font-medium mt-4 md:flex-row md:space-x-9 md:space-y-0 md:mt-0'>
        {userInfo&&(
          <>
          <li> <NavLink to="/post/add"> Add Post</NavLink></li>
          <li> <NavLink to="/post/profile"> Profile</NavLink></li>
          <button className='btn-primary' onClick={()=> logout(navigate)}> Logout</button>
          </>

        )}
        {!userInfo&&(
          <>
          <li> <Link to="/auth/login" className='btn-primary'> Login</Link></li>
          <li> <Link to="/auth/register" className='btn-primary'> Sign up</Link></li>
          </>
         
        )}

        </ul>
      </div>
    </div>
  </nav>
  )
}