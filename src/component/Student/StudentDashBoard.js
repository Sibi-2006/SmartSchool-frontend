import React, { useContext, useEffect, useState } from 'react'
import { getStudentToken, logoutStudent } from "../../Storage"
import { GlobalVariableContext } from "../../Context/GlobalVariable"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MALEpfp from "../../image/malePfp.png";
import FEMALEpfp from "../../image/femalePfp.png";
import ATTENDANCE from "../../image/Attendance.png";
import MARK from "../../image/mark.png";
import TIMETABLE from "../../image/timeTable.avif";
import toast from "react-hot-toast";

export default function StudentDashBoard() {
  const [student,setStudent] = useState({});
  const token = getStudentToken();
  const { baseUrl } = useContext(GlobalVariableContext);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchStudent = async()=>{
      try{
          if(!token){
            navigate("/login/student");
            return;
          }
          const res = await axios.get(`${baseUrl}/student/dashboard`,{
            headers: { Authorization: `Bearer ${token}` },
          });
          setStudent(res.data.student);
      }catch(err){
      const errorMsg = err.response?.data?.message || "Server error";
      toast.error(errorMsg);
    }
    }
    fetchStudent()
  },[token,navigate,baseUrl]);
  const handleLogout = ()=>{
    logoutStudent();
    navigate('/login/student')
  }
  return (
    <div className='pt-20 pb-10 flex items-center justify-center min-h-screen flex-col gap-10'>
      <h1 className='text-center text-dark font-bold text-3xl'>Welcome - "<samp className=' text-primary'>{student.fullName}</samp>"</h1>
      <div
        className=' grid grid-cols-2 gap-10'
      >
        <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
          onClick={()=>navigate(`/student/attandance/${student._id}/${student.standard}/${student.section}/student`)}
        >
          <img className=' h-28 w-32 md:h-52 md:w-56' src={ATTENDANCE} alt="attrndance" />
          <h1 className=' font-bold text-dark text-2xl text-center py-2'>Attendance</h1>
        </div>
        <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
          onClick={()=>navigate(`/student/mark-home/${student._id}/student`)}
        >
          <img className='h-28 w-32 md:h-52 md:w-56'  src={MARK} alt="mark" />
          <h1 className=' font-bold text-dark text-2xl text-center py-2'>Mark</h1>
        </div>
        <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250  hover:cursor-pointer'
          onClick={()=>navigate(`/student/time-table/${student.standard}/${student.section}/student`)}
        >
          <img className='h-28 w-32 md:h-52 md:w-56'  src={TIMETABLE} alt="time table" />
          <h1 className=' font-bold text-dark text-2xl text-center py-2'>Time table</h1>
        </div>
        <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
          onClick={()=>navigate(`/student/profile/${student._id}/student`)}
        >
          {
            student?.gender?.toLowerCase() === "male" ?(<img className='h-28 w-32 md:h-52 md:w-56'  src={MALEpfp} alt="time table" />):
            (<img className='h-28 w-32 md:h-52 md:w-56'  src={FEMALEpfp} alt="time table" />)
          }
          <h1 className=' font-bold text-dark text-2xl text-center py-2'>Profile</h1>
        </div>

        <div className=' bg-red-500 shadow-md rounded-md flex items-center justify-center text-xl font-bold py-5 hover:scale-105 transform duration-250 hover:cursor-pointer'
          onClick={()=>handleLogout()}
        >
         <h1>Log-out</h1>
        </div>
      </div>
    </div>
  )
}
