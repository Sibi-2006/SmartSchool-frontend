import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTeacherToken } from '../../Storage';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import axios from 'axios';
export default function DashBoard() {
    const navigate = useNavigate();
    const token = getTeacherToken();
    const { baseUrl } = useContext(GlobalVariableContext);
    const [ loading , setLoading ] = useState(true);
    const [ teacher , setTeacher ] = useState({})
    useEffect(()=>{
        const fetchTeacher = async()=>{
            if(!token){
                navigate("/login/teachers");
                return;
            }
            try{
                setLoading(true)
                const res = await axios.get(`${baseUrl}/create/dashboard`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
                setTeacher(res.data.teacher)
            }catch(err){
                console.log(err.message)
            }finally{
                setLoading(false);
            }
        }
        fetchTeacher()
    },[baseUrl,token,navigate])
    if(loading){
        return(
            <div className=' flex items-center justify-center min-h-screen'>
                <p className=' text-2xl text-secondary'>Loading...</p>
            </div>  
        )
    }
    return (
    <div>
      
    </div>
  )
}



// Teacher can:
// ✔ View list of students in their class
// ✔ Mark attendance
// ✔ Add marks / grades
// ✔ Upload assignments/homework
// ✔ View timetable
// ✔ Chat with admin/parents
// ✔ Edit their own profile

// Teacher CANNOT:
// ❌ Create/delete students
// ❌ Create/delete teachers
// ❌ Change admin settings
// ❌ Access other classes
// ❌ Manage fees