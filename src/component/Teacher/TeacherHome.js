import React, { useContext, useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { logoutTeacher } from '../../Storage';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import { getTeacherToken } from '../../Storage';
import axios from 'axios';

import ASSIGNED from "../../image/forTeacher/AssignedClass.jpeg";
import ATTENDANCE from "../../image/forTeacher/addAttandence.jpeg";
import ADDMARK from "../../image/forTeacher/addMarks.jpeg";
import PFP from "../../image/forTeacher/teacherPfp.jpeg";
export default function TeacherHome() {
    const token = getTeacherToken();
  const [teacherId, setTeacherId] = useState("");
  const { baseUrl } = useContext(GlobalVariableContext)
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutTeacher();
       navigate("/choosetheuser");
   };

    useEffect(() => {
        const fetchTeacher = async () => {
            if (!token) {
                navigate("/login/teachers");
                return;
            }

            try {
                const res = await axios.get(`${baseUrl}/create/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTeacherId(res.data.teacher.teacherId);
            } catch (err) {
                console.log(err.message);
            } 
        };

        fetchTeacher();
    }, [baseUrl, token, navigate]);
    
  return (
    <div className=' flex items-center justify-center flex-col py-28 px-10'>
        <div  className=' grid grid-cols-2 gap-10'>
        
                    {/* Assigned Classes */}
                    <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
                        onClick={() => navigate("/teacher/dashboard")}
                    >
                        <img className='h-28 md:h-52 w-full'  src={ASSIGNED} alt="all deatils" />
                        <h1 className=' font-bold text-dark text-2xl text-center py-2'>Assigned Classes</h1>
                    </div>

                    {/* ADD Attendance */}
                    <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
                    onClick={() => navigate("/teacher/ToMarkAttendance")}
                    >
                        <img className='h-28 md:h-52 w-full'  src={ATTENDANCE} alt="attendance" />
                        <h1 className=' font-bold text-dark text-xl md:text-2xl text-center py-2'>ADD ATTENDANCE</h1>
                    </div>

                    {/* ADD mark */}
                    <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
                        onClick={() => navigate("/teacher/add-marks")}
                    >
                        <img className='h-28 md:h-52 w-full'  src={ADDMARK} alt="add mark" />
                        <h1 className=' font-bold text-dark text-2xl text-center py-2'>ADD MARK</h1>
                    </div>
                    {/* ADD mark */}
                    <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
                    onClick={() => navigate(`/teacher/profile/${teacherId}`)}
                    >
                        <img className='h-28 md:h-52 w-full'  src={PFP} alt="pfp" />
                        <h1 className=' font-bold text-dark text-2xl text-center py-2'>PROFILE</h1>
                    </div>
                    <div className=' bg-red-500 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer flex items-center justify-center'
                    onClick={handleLogout}
                    >
                        
                        <h1 className=' font-bold text-dark text-2xl text-center py-2'>LOG-OUT</h1>
                    </div>
        </div>
      
    </div>
  )
}
