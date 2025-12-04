import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getStudentToken } from '../../Storage';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import axios from 'axios';
import TimeTableStru from '../Admin/TimeTableStru';

export default function TimeTableInStudent() {
    const {standard ,section} = useParams();
    const token = getStudentToken();
    const [timeTable, setTimeTable] = useState(null);
    const { baseUrl } = useContext(GlobalVariableContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTimeTable = async () => {
            try {
                if (!token) {
                    navigate('/login/students');
                    return;
                }
                const res = await axios.get(`${baseUrl}/timetable/oneClass/${standard}/${section}` , {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTimeTable(res.data.timetable);
            } catch (err) {
                console.log(err);
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