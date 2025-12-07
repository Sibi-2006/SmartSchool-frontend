import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalVariableContext } from "../../../Context/GlobalVariable"

export default function DeleteTimeTable() {
    const { id,section,standard} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("adminToken");
    const [data,setData] = useState("");
    const [message,setMessage] = useState("")
    const { baseUrl } = useContext(GlobalVariableContext)
    const handleChange = (e) =>{
      setData(e.target.value);
    };

    const handleSubmit = async(e)=>{
      e.preventDefault();
      if(!data){
        setMessage("standard and section required");
        return;
      }
      const tempData = `${standard}-${section}`;
      if(tempData===data){
        if(!token){
          navigate("/login/admin");
          return;
        }
        try{
          const res = await axios.delete(`${baseUrl}/timetable/delete/${id}`,{
            headers:{Authorization:`Bearer ${token}`}
          });
          setMessage(res.data.message);
          setTimeout(() => {
            navigate("/admin/dashboard/view/details/time-table")
          }, 2000);
        }catch(err){
          console.log(err)
        }
      }else{
        setMessage(`correct formet ${standard}-${section}`)
      }
    }
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen'>
        <h1 className=' text-2xl text-dark font-bold'>Delete Time-Table for {standard}-"{section}"</h1>
        <form
            className=' felx items-center justify-center flex-col gap-5 bg-gray-200 shadow-lg rounded-xl py-5 px-3'
            onSubmit={handleSubmit}
        >
            <p className=' text-xl text-dark'>Enter the standard and section like this<br /> <samp className=' text-red-400 text-2xl font-bold text-center'>{standard}-{section}</samp></p>
            {
              message&&(<p className=' text-sm text-gray-800 font-bold'>{message}</p>)
            }
            <input type="text" placeholder='Enter the  standard and section' className='form-input my-5' value={data} onChange={(e)=> handleChange(e)}/>
            <button className=" bg-red-500 text-light rounded-lg py-2 px-3 hover:bg-red-400 font-bold text-2xl w-1/2"
            >Delete</button>
        </form>
    </div>
  )
}
