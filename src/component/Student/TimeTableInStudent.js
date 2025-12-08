import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getStudentToken,getParentToken } from '../../Storage';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import axios from 'axios';
import TimeTableStru from '../Admin/TimeTableStru';
import toast from "react-hot-toast";

export default function TimeTableInStudent() {
    const {standard ,section,from} = useParams();
    const token = from==="student"? getStudentToken() : getParentToken();
    const [timeTable, setTimeTable] = useState(null);
    const { baseUrl } = useContext(GlobalVariableContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTimeTable = async () => {
            try {
                if (!token) {
                    navigate(`/login/${from}`);
                    return;
                }
                const res = await axios.get(`${baseUrl}/${from}/oneClass/${standard}/${section}` , {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTimeTable(res.data.timetable);
            }
             catch(err){
      const errorMsg = err.response?.data?.message || "Server error";
      toast.error(errorMsg);
    }
        };
        fetchTimeTable();
    }, [token, navigate, baseUrl, standard, section]);


    return (
        <div className=' pt-28 pb-10'>
            <TimeTableStru
                standard={standard}
                section={section}
                timeTable={timeTable}
                from="student"
            />
        </div>
    );
}