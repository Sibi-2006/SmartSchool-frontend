import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../Context/GlobalVariable";
import Loading from "./Loading";
import CREATEADMIN from "../image/admin.jpeg";
import CREATE_STUDENT from "../image/studentadd.jpeg";
import CREATE_TEACHER from "../image/teacheradd.jpeg";
import CREATE_PARENT from "../image/parent.jpeg"
import AMOUNT from "../image/amount.jpeg";
import TIME_TABLE from "../image/add_timeTable.jpeg";
import DEATILS from "../image/deatils.jpeg";
import certificate from "../image/certificate.jpeg";
export default function AdminHome() {
    const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext)
  const token = localStorage.getItem("adminToken");
  const baseUrlNav = "/admin/dashboard/create";
  useEffect(() => {
    const fetchAdmin = async () => {
      
      if (!token) {
        navigate("/login/admin");
        return;
      }
      try {
        const res = await axios.get(`${baseUrl}/adminlogin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(res.data.admin);
      } catch (err) {
        console.log(err);
        navigate("/login/admin"); 
      }
    };
    fetchAdmin();
  }, [navigate,baseUrl,token]);

  const handleLogout = () => {
      localStorage.removeItem("adminToken");
       navigate("/choosetheuser");
   };
  return (
    <div className=" flex items-center py-28 flex-col  px-10">
      {
            !admin&&(
              <Loading/>
            )
        }

        <div  className=' grid grid-cols-2 gap-10'>

            {/* deatils */}
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
            onClick={()=>navigate("/admin/all-details")}
            >
                <img className='h-28 md:h-52 w-full'  src={DEATILS} alt="all deatils" />
                <h1 className=' font-bold text-dark text-2xl text-center py-2'>ALL DEATILS</h1>
            </div>

            {/* admin */}
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
            onClick={()=>navigate(`${baseUrlNav}/admin`)}
            >
                <img className='h-28 md:h-52 w-full'  src={CREATEADMIN} alt="admin" />
                <h1 className=' font-bold text-dark text-2xl text-center py-2'>CREATE ADMIN</h1>
            </div>
            {/* teacher */}
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
            onClick={()=>navigate(`${baseUrlNav}/teacher`)}
            >
                <img className='h-28 md:h-52 w-full'  src={CREATE_TEACHER} alt="teacher" />
                <h1 className=' font-bold text-dark text-2xl text-center py-2'>CREATE TEACHER</h1>
            </div>
            {/* student */}
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
            onClick={()=>navigate(`${baseUrlNav}/student`)}
            >
                <img className='h-28 md:h-52 w-full'  src={CREATE_STUDENT} alt="student" />
                <h1 className=' font-bold text-dark text-2xl text-center py-2'>CREATE STUDENT</h1>
            </div>
            {/* parent */}
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
            onClick={()=>navigate(`${baseUrlNav}/parent`)}
            >
                <img className='h-28 md:h-52 w-full'  src={CREATE_PARENT} alt="parent" />
                <h1 className=' font-bold text-dark text-2xl text-center py-2'>CREATE PARENT</h1>
            </div>
            {/* verified-marks */}
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
            onClick={()=>navigate(`/verify/marks/by-parents/admin`)}
            >
                <img className='h-28 md:h-52 w-full'  src={CREATE_PARENT} alt="parent" />
                <h1 className=' font-bold text-dark text-2xl text-center py-2'>Verified Marks</h1>
            </div>
            {/* time-table */}
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
            onClick={()=>navigate(`${baseUrlNav}/time-table`)}
            >
                <img className='h-28 md:h-52 w-full'  src={TIME_TABLE} alt="time-table" />
                <h1 className=' font-bold text-dark text-2xl text-center py-2'>ADD TIME-TABLE</h1>
            </div>
            {/* certificate request */}
             <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
            onClick={()=>navigate("/admin/certificate-request")}
            >
                <img className='h-28 md:h-52 w-full'  src={certificate} alt="certificate" />
                <h1 className=' font-bold text-dark text-2xl text-center py-2'>Certificate Request</h1>
            </div>
            {/* admout */}
            <div className=' bg-gray-200 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer'
            onClick={()=>navigate("/admin/amount/details")}
            >
                <img className='h-28 md:h-52 w-full'  src={AMOUNT} alt="amount" />
                <h1 className=' font-bold text-dark text-2xl text-center py-2'>SEE AMOUNT DETAILS</h1>
            </div>
            <div className=' bg-red-400 shadow-md rounded-md hover:scale-105 transform duration-250 hover:cursor-pointer flex items-center justify-center'
            onClick={handleLogout}
            >
                <h1 className=' font-bold text-dark text-2xl text-center py-2 text-center'>LOG-OUT</h1>
            </div>
        </div>

    </div>
  )
}
