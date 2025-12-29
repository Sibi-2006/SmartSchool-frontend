import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar';

export default function ViewAdmins({users}) {
    const navigate = useNavigate();

  return (
    <div className=' py-32 w-full'>
      <NavBar/>
      
        <h1 className=' text-3xl text-secondary font-bold text-center'>Admin's</h1>

      <div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-32 px-10 w-full'
      >

            {
                users.map((user,index)=>(
                    <div
                        key={index}
                        className=' bg-gray-100 rounded-xl shadow-md w-full flex items-center justify-center flex-col py-8 hover:-translate-y-2 transition-all duration-300'
                    >
                        <h1 className=' text-xl text-dark'>Name : <samp className=' text-primary font-bold'>{user.userName}</samp></h1>
                        <h1 className=' text-xl text-dark'>Admin-Id : <samp  className=' text-primary font-bold'>{user.adminId}</samp></h1>
                        <h3 className=' text-xl text-dark'>Email : <samp  className=' text-primary font-bold'>{user.email}</samp></h3>
                        <button className='main-btn font-bold' >View full details</button>
                    </div>
                ))
            }
      </div>
    </div>
  )
}

