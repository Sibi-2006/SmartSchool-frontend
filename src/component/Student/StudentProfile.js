import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalVariableContext } from "../../Context/GlobalVariable"
import { getStudentToken , getParentToken } from '../../Storage';
import axios from 'axios';
import Loading from '../Loading';
import StudentProfileTemplate from '../PageTemplate/StudentProfileTemplate';
import toast from "react-hot-toast";

export default function StudentProfile() {
    const { id ,from } = useParams();
    const [student,setStudent] = useState({});
    const navigate = useNavigate();
    const { baseUrl } = useContext(GlobalVariableContext);
    const token =from==="student"? getStudentToken() : getParentToken();
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const fetchStudent = async()=>{
            try{
                if(!token){
                    navigate(`/login/${from}`);
                    return;
                }
                setLoading(true);
                const res = await axios.get(`${baseUrl}/${from}/get/student/${id}`,{
                    headers: { Authorization: `Bearer ${token}` },
                })
                setStudent(res.data.student);
              }catch(err){
      const errorMsg = err.response?.data?.message || "Server error";
      toast.error(errorMsg);
    }finally{
                setLoading(false)
            }
        }
        fetchStudent();
    },[baseUrl,id,token,navigate])
  if (!student)
      return (
        <div className="text-center py-20 text-red-600 text-xl">
          Student not found 😢
        </div>
      );
  
    return (
      <div className="min-h-screen bg-gray-100 py-20 px-5">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          ⬅ Back
        </button>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
          {
            loading&&(
              <Loading/>
            )
          }
          <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
            Student Details
          </h1>
  
          {/* BASIC DETAILS */}
          <StudentProfileTemplate student={student}/>
          
        </div>
      </div>
    );
  }
  
  