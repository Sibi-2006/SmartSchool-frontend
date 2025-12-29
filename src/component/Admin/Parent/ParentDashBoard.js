import React, { useContext, useEffect, useState } from 'react'
import { GlobalVariableContext } from '../../../Context/GlobalVariable'
import { getParentToken, logoutParent } from '../../../Storage';
import { useNavigate } from 'react-router-dom';
import MALEpfp from "../../../image/malePfp.png";
import FEMALEpfp from "../../../image/femalePfp.png";
import ATTENDANCE from "../../../image/Attendance.png";
import MARK from "../../../image/mark.png";
import TIMETABLE from "../../../image/timeTable.avif";
import CERTIFICATE from "../../../image/certificate.jpeg";
import CERTIFI from "../../../image/Certifi.jpeg"
import axios from 'axios';
import toast from "react-hot-toast";



export default function ParentDashBoard() {
    const { baseUrl } = useContext(GlobalVariableContext);
    const token = getParentToken();
    const navigate = useNavigate();
    const [message,setMessage] = useState("");
    const [studentId,setStudentId] = useState("");
    const [student,setStudent] = useState({});
    useEffect(()=>{
        const dashBoard = async()=>{
            try{
                if(!token){
                    navigate("/login/parent");
                    return;
                }
                const res = await axios.get(`${baseUrl}/parent/dashboard`,{
                    headers:{Authorization:`Bearer ${token}`}
                });
                setStudentId(res.data.parent.studentId);
            }catch(err) {
              const errorMsg = err.response?.data?.message || "Server error";
              toast.error(errorMsg);
              setMessage(errorMsg);
          }

        }
        dashBoard();
    },[baseUrl,navigate,token]);


    //fetch parent
    useEffect(()=>{
        const fetchParent = async ()=>{
            try{
                if(!token){
                    navigate("/login/parent");
                    return;
                }
                const res = await axios.get(`${baseUrl}/parent/get-student/${studentId}`,{
                    headers:{Authorization:`Bearer ${token}`}
                });
                setStudent(res.data.student);
            }catch(err) {
              const errorMsg = err.response?.data?.message || "Server error";
              toast.error(errorMsg);
              setMessage(errorMsg);
          }
        }
        fetchParent();
    },[baseUrl,navigate,studentId,token])



    const handleLogout = ()=>{
  logoutParent();
  navigate("/login/parent");
}
  return (
    <div className='pt-20 pb-10 flex items-center justify-center min-h-screen flex-col gap-10'>
          <h1 className='text-center text-dark font-bold text-3xl'>Welcome - <samp className=' text-primary'>{student.fullName}</samp> 's Parent</h1>
          <div
            className=' grid grid-cols-2 gap-10'
          >
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
              onClick={()=>navigate(`/student/attandance/${student._id}/${student.standard}/${student.section}/parent`)}
            >
              <img className=' h-28 w-32 md:h-52 md:w-56' src={ATTENDANCE} alt="attrndance" />
              <h1 className=' font-bold text-dark text-2xl text-center py-2'>Attendance</h1>
            </div>
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
              onClick={()=>navigate(`/student/mark-home/${student._id}/parent`)}
            >
              <img className='h-28 w-32 md:h-52 md:w-56'  src={MARK} alt="mark" />
              <h1 className=' font-bold text-dark text-2xl text-center py-2'>Mark</h1>
            </div>
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250  hover:cursor-pointer'
              onClick={()=>navigate(`/student/time-table/${student.standard}/${student.section}/parent`)}
            >
              <img className='h-28 w-32 md:h-52 md:w-56'  src={TIMETABLE} alt="time table" />
              <h1 className=' font-bold text-dark text-2xl text-center py-2'>Time table</h1>
            </div>
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
              onClick={()=>navigate(`/student/profile/${student._id}/parent`)}
            >
              {
                student?.gender?.toLowerCase() === "male" ?(<img className='h-28 w-32 md:h-52 md:w-56'  src={MALEpfp} alt="time table" />):
                (<img className='h-28 w-32 md:h-52 md:w-56'  src={FEMALEpfp} alt="time table" />)
              }
              <h1 className=' font-bold text-dark text-2xl text-center py-2'>Profile</h1>
            </div>


              {/* request certificate */}
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
              onClick={()=>navigate(`/student/request-certificate/${student._id}/parent`)}
            >
              <img className='h-28 w-32 md:h-52 md:w-56'  src={CERTIFICATE} alt="certificate" />
              <h1 className=' font-bold text-dark text-2xl text-center py-2'>Request <br /> Certificate</h1>
            </div>

            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
              onClick={()=>navigate(`/student/certificate/${student._id}/parent`)}
            >
              <img className='h-28 w-32 md:h-52 md:w-56'  src={CERTIFI} alt="certificate" />
              <h1 className=' font-bold text-dark text-2xl text-center py-2'>Certificate</h1>
            </div>


            <div className=' bg-red-400 shadow-md rounded-md hover:scale-105 transform duration-250  hover:cursor-pointer flex items-center justify-center'
              onClick={()=>handleLogout()}
            >
              <h1 className=' font-bold text-dark text-2xl text-center py-2'>Log-Out</h1>
            </div>
          </div>
        </div>
  )
}