import React, { useContext } from 'react'
import { GlobalVariableContext } from "../Context/GlobalVariable"
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const { appName } = useContext(GlobalVariableContext);
    const navigate = useNavigate();
  return (
    <div className='parent flex-col'>
        <div className='child'>
            <p className=' text-secondary'>Welcome To </p>
            <h1 className=' text-6xl font-bold text-dark'>{appName}</h1>
        </div>

        <div className=' w-11/12 md:w-1/2 child my-5 intro-box'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, fugit! 
                Debitis quia nihil amet, reprehenderit quos itaque eaque temporibus odit iste eveniet culpa 
                reiciendis assumenda eos alias, voluptas modi. </p>
                <button
                onClick={()=>navigate('/choosetheuser')}
                className=' main-btn text-xl md:text-2xl'>Explore/SigniIn</button>
        </div>
      
    </div>
  )
}
