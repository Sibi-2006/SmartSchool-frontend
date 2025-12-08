import React, { useContext, useState } from 'react'
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import axios from 'axios';
import { setParentToken } from '../../Storage';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

export default function ParentLogin() {
    const [user,setUser] = useState({
        loginId:"",
        password:""
    });
    const [error,setError]=useState({});
    const [message,setMessage] = useState("");
    const { baseUrl } = useContext(GlobalVariableContext);
    const navigate = useNavigate();
     const handleChanges = (e)=>{
    setUser({
      ...user,[e.target.name]:e.target.value
    });
  };
     const isValid = ()=>{
    const temp = {};
    if(!user.loginId.trim()) temp.loginId="Reqired login id";
    if(!user.password.trim()) temp.password="Reqired Password";
    setError(temp);
    return Object.keys(temp).length === 0;

  }
    const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!isValid()) return;
        try{
            const res = await axios.post(`${baseUrl}/parent/login`,{
                loginId:user.loginId,
                password:user.password
            });
            setParentToken(res.data.token);
            setMessage(res.data.message);
            setTimeout(() => {
                navigate("/parent/dashBoard");
            }, 2000);
        }catch(err){
            setMessage(err.response?.data?.message || "Server error");
            const errorMsg = err.response?.data?.message || "Server error";
              toast.error(errorMsg);
        }

    }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <form className="form-child" onSubmit={handleSubmit}>
       <h1 className="form-title">PARENT-LOGIN</h1>
         <div className="mb-5 relative">
          <label
            htmlFor="id"
            className="form-label"
          >
            Parent ID
          </label>
          <input
            id="id"
            type="text"
            placeholder="Enter parent ID"
            className="form-input"
            name="loginId"
            value={user.loginId}
            onChange={(e)=>handleChanges(e)}
          />
          {error.loginId&&<p className=" text-red-400 font-bold text-sm">{error.loginId}</p>}
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="form-label"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onChange={(e)=>handleChanges(e)}
            className="form-input"
          />
          {error.password&&<p className=" text-red-400 font-bold text-sm">{error.password}</p>}
        </div>
        {
          message&&<p className=" text-green-400 font-bold text-sm">{message}</p>
        }
        {/* Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          LOG IN
        </button>
      </form>
    </div>
  )
}
