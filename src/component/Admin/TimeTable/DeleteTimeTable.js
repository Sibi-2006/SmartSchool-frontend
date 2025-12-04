import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function DeleteTimeTable() {
    const { id,section,standard} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("adminToken");

  return (
    <div className=' flex flex-col items-center justify-center min-h-screen'>
        <h1 className=' text-2xl text-dark font-bold'>Delete Time-Table for {standard}-"{section}"</h1>
        <form
            className=' felx items-center justify-center flex-col gap-5 bg-gray-200 shadow-lg rounded-xl py-5 px-3'
        >
            <p className=' text-xl text-dark'>Enter the standard and section like this<br /> <samp className=' text-red-400 text-2xl font-bold text-center'>{standard}-{section}</samp></p>
            <input type="text" placeholder='Enter the  standard and section' className='form-input my-5'/>
            <button className=" bg-red-500 text-light rounded-lg py-2 px-3 hover:bg-red-400 font-bold text-2xl w-1/2"
            >Delete</button>
        </form>
    </div>
  )
}
