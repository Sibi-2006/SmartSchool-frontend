import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalVariableContext } from '../../../Context/GlobalVariable';
import axios from 'axios';

export default function ViewAllTimeTable() {
  const [timeTable,setTimeTable]=useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const { baseUrl } = useContext(GlobalVariableContext);

  useEffect(()=>{
    const fetchTimeTable = async()=>{
      try{
        if(!token){
          navigate("/login/admin");
          return;
        }
        const res = await axios.get(`${baseUrl}/timetable/get/all/time-table`,{
          headers:{Authorization:`Bearer ${token}`}
        });
        setTimeTable(res.data.AllStandardSection);
      }catch(err){
        console.log(err);
      }
    }
    fetchTimeTable();
  })
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-32 px-10 w-full'>
      {
        timeTable.map((tt,index)=>(
          <div
            key={index}
             className='w-full bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-3 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
          >
            <h1 className=' text-3xl font-bold text-primary text-center'>{tt.standard}-"{tt.section}"</h1>
            <button
              className='mt-4 w-full bg-primary text-white py-2 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold'
              onClick={()=>navigate(`/admin/view/oneclass/time-table/${tt.standard}/${tt.section}`)}
            >

                View Time-Table
            </button>
          </div>
        ))
      }
    </div>
  )
}
