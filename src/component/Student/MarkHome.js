import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getParentToken, getStudentToken } from '../../Storage';
import Loading from '../Loading';

export default function MarkHome() {
     const { id , from } = useParams();
    const navigate = useNavigate();
    const token =from==="student"? getStudentToken() : getParentToken();
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const fetchStudent = async()=>{
            try{
                if(!token){
                    navigate(`/login/${from}`);
                    return;
                }
            }catch{
                console.log("token neened");
            }finally{
                setLoading(false);
            }
                
        }
        fetchStudent();
    },[id,token,navigate]);
    const goto = (examType) => {
        const baseUrl = `/student/mark/${id}`;
        navigate(`${baseUrl}/${examType}/${from}`);
    }
  return (
    <div className=' pt-32'>
         <button
            onClick={() => navigate(-1)}
            className="mb-5 ml-10 px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:shadow-lg transition"
            >
            ⬅ Back
            </button>
        <div className=' flex items-center justify-center flex-col min-h-screen gap-5 '>
           
            {
                loading&&(
                    <Loading/>
                    )
            }
            <h1 className=' text-3xl font-bold font-serif text-primary'>Choose the exam type to see the result</h1>
            <div className=' flex items-center justify-center  bg-gray-200 rounded-xl shadow-lg flex-col w-11/12 md:w-1/2'>
                <button className='main-btn w-11/12'
                    onClick={()=>goto("Unit Test 1")}
                >Unit Test 1</button>
                <button className='main-btn w-11/12'
                    onClick={()=>goto("Unit Test 2")}
                >Unit Test 2</button>
                <button className='main-btn w-11/12'
                    onClick={()=>goto("Midterm")}
                >Midterm</button>
                <button className='main-btn w-11/12'
                    onClick={()=>goto("Final")}
                >Final</button>
                <button className='main-btn w-11/12'
                    onClick={()=>goto("Monthly")}
                >Monthly</button>
                <button className='main-btn w-11/12'
                    onClick={()=>goto("Special")}
                >Special</button>
            </div>
        
        </div>
    </div>
  )
}