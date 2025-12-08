import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalVariableContext } from '../../../Context/GlobalVariable';
import axios from 'axios';
import TimeTableStru from '../TimeTableStru';
import toast from "react-hot-toast";

export default function OneClassTimeTable() {
    const { standard , section } = useParams();
    const [timeTable,setTimeTable] = useState([]);
    const token = localStorage.getItem("adminToken");
    const navigate = useNavigate();
    const { baseUrl } = useContext(GlobalVariableContext);

    useEffect(()=>{
        const fetchTimeTable =async()=>{

            try{
                if(!token){
                    navigate("/login/admin");
                    return;
                }
                const res = await axios.get(`${baseUrl}/timetable/oneClass/from-admin/${standard}/${section}`,{
                    headers:{Authorization:`Bearer ${token}`}
                });
                setTimeTable(res.data.timetable);
            }catch(err){
               const errorMsg = err.response?.data?.message || "Server error";
toast.error(errorMsg);
            }
        }
        fetchTimeTable();
    },[token,navigate,section,standard,baseUrl])
  return (
    <div className=' pt-28 pb-10 '>
      <TimeTableStru
            standard={standard}
            section={section}
            timeTable={timeTable}
            from="admin"
      />
      
    </div>
  )
}
