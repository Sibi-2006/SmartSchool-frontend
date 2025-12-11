import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import axios from 'axios';
import toast from "react-hot-toast";
import VerifePhone from './VerifePhone';
import OtpPage from './OtpPage';

export default function ForgetPassword() {
    const [loginId,setLoginId] = useState("");
    const { from } = useParams();
    const [error,setError] = useState("");
    const { baseUrl } = useContext(GlobalVariableContext);
    const[step,setStep] = useState(0);
    const [phone,setPhone] = useState("");
    const [name,setName] = useState("");

    const handleChanges = (e)=>{
        setLoginId(e.target.value);
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        if(!loginId.trim()){
            setError("pls enter the login-id");
            return;
        }
        try{
            const res = await axios.post(`${baseUrl}/forget/password/for/${from}`, {
                loginId: loginId
                });
              
                if(res.data.isSucces){
                  setStep(1);
                  setPhone(res.data.phone);
                  setName(res.data.name)
                  toast.success("user find succesfully");
                }else{
                  toast.error("can not find user!!!")
                }
        }catch(err){
            toast.error("can not find user!!!")
            return;
        }
        
    }
    const nextBtn = ()=>{
      setStep((prev)=>prev+1);

    }
    const previousBtn = ()=>{
      setStep((prev)=>prev-1);
    }
   

  return (
    <div className=' flex items-center justify-center min-h-screen flex-col'>
      {
        step===0&&(
              <form className=' flex items-center justify-center flex-col border-4 bg-green-100 border-secondary gap-3 p-3 rounded-lg shadow-lg'
            onSubmit={handleSubmit}
          >
            <label className=' text-xl md:text-2xl text-dark font-bold'>Enter the Login id to find user</label>
            <input type="text" placeholder='enter the login id' className='form-input' value={loginId} onChange={e=>handleChanges(e)}/>
            {error&&<p className=' text-sm text-red-400'>{error}</p>}
            <button className='main-btn w-3/4 font-bold text-xl md:text-2xl'>...Find...</button>
          </form>
        )
      }
      {
        step===1&&(
          <VerifePhone phone={phone} name={name} nextBtn={nextBtn} previousBtn={previousBtn}/>
        )
      }
      {
        step===2&&(
          <OtpPage name={name}/>
        )
      }
      
    </div>
  )
}
