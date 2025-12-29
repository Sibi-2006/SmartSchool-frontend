import React, { useContext, useEffect, useState } from 'react'
import { GlobalVariableContext } from "../Context/GlobalVariable"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Home() {
    const { appName , homeUrl } = useContext(GlobalVariableContext);
    const [isSucces,setIsSucces] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
      const connectSever = async()=>{
        try{
          const res = await axios.get(`${homeUrl}`);
          setIsSucces(res.data.isSucces)
        }catch(err){
          setIsSucces(false);
          console.log(err)
        }
      }
      connectSever();
    },[homeUrl]);
  return (
    <div className='parent flex-col'>
      {
        !isSucces?(
          <div className="w-11/12 md:w-1/2 h-1/2 child my-5 intro-box flex flex-col items-center justify-center gap-4">
            
            {/* Loader */}
            <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>

            {/* Message */}
            <p className="text-center text-gray-600">
              This project is hosted on Render’s free plan.  
              Please wait while the server wakes up…
            </p>

          </div>
        ):(
            <div className='w-11/12 md:w-1/2 h-1/2 child my-5  flex flex-col items-center justify-center gap-4'>
              <div className='child'>
              <p className=' text-secondary'>Welcome To </p>
              <h1 className=' text-6xl font-bold text-dark'>{appName}</h1>
              </div>

              <div className=' child my-5 intro-box'>
                  <p>
                    A School Management System helps manage daily school activities in one place.
                    It allows administrators, teachers, students, and parents to access important
                    information such as attendance, classes, exams, and announcements easily.
                    This system reduces paperwork, saves time, and improves communication between
                    everyone involved.
                  </p>

                      <button
                      onClick={()=>navigate('/choosetheuser')}
                      className=' main-btn text-xl md:text-2xl'>Explore/SigniIn</button>
              </div>
          </div>
        )
      }
       
      
    </div>
  )
}
