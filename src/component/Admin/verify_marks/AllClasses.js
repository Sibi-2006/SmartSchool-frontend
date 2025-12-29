import React, { useContext, useEffect, useState } from 'react';
import { GlobalVariableContext } from "../../../Context/GlobalVariable"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from "../../Loading";
import {  getTeacherToken } from '../../../Storage';

export default function AllClasses() {
    const { from } = useParams();
     const [classes , setClasses ] = useState([]);
    const { baseUrl } = useContext(GlobalVariableContext);
    const token = from==="admin"?localStorage.getItem("adminToken"):getTeacherToken();
    const navigate = useNavigate();
    const [loading , setLoading ] = useState(true)
    useEffect(()=>{
        const fetchClassData = async ()=>{
            if (!token) {
                navigate(`/login/${from}`)
                return;
            }
            try{
                setLoading(true)
                const to = from==="admin"?"adminlogin":"create";
                const res = await axios.get(`${baseUrl}/${to}/class-stats`,{
                    headers: { Authorization: `Bearer ${token}` },
                });
                setClasses(res.data)
            }catch(err){
                console.log(err.message)
            }finally{
                setLoading(false)
            }
        }
        fetchClassData()
    },[baseUrl,token,navigate,from]);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-32 px-10 w-full'>
                
    
                
                {
                    loading&&(
                        <Loading/>
                    )
                }
                {
                classes.map((cls) => (
                    <div 
                        key={`${cls._id.standard}-${cls._id.section}`}
                        className='w-full bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-3 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
                        >
                            <div className='flex flex-col items-center'>
                                <h1 className='text-gray-600 text-sm uppercase font-semibold tracking-wider'>
                                    Class
                                </h1>
                                <h2 className='text-3xl font-bold text-primary'>
                                    {cls._id.standard}-{cls._id.section}
                                </h2>
                            </div>
    
                            <div className='w-full flex flex-col gap-1 mt-3 text-center'>
                                <p className='text-gray-800 text-lg font-medium'>
                                    Boys: <span className='text-blue-600 font-bold'>{cls.boys}</span>
                                </p>
                                <p className='text-gray-800 text-lg font-medium'>
                                    Girls: <span className='text-pink-600 font-bold'>{cls.girls}</span>
                                </p>
                                <p className='text-gray-900 text-xl font-bold mt-1'>
                                    Total: {cls.total}
                                </p>
                            </div>
    
                            <button
                            className='mt-4 w-full bg-primary text-white py-2 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold'
                            onClick={()=>navigate(`/verify/${cls.total}/${cls._id.standard}/${cls._id.section}/${from}`)}
                            >
                                See who verify the marks
                            </button>
                        </div>
    
                                    ))
                        }
    
            </div>
  )
}
