import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import { setTeacherToken } from "../../Storage.js"
import toast from "react-hot-toast";

export default function TeacherLogin() {
  const [ teacher , setTeacher ] = useState({
    loginId:"",
    password:""
  });
  const [ error , setError ] = useState({});
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext);
  const handleChanges = (e)=>{
    setTeacher({
      ...teacher,[e.target.name]:e.target.value
    });
  }
  const [ message , setMessage ] = useState("");
  const isValid = ()=>{
    const temp = {};

    if(!teacher.loginId.trim()) temp.loginId="teacher is requried";
    if(!teacher.password.trim()) temp.password="password is requried";

    setError(temp);
    return Object.keys(temp).length === 0;
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!isValid()) return;

    try{
        const res = await axios.post(`${baseUrl}/create/teacher/login`,teacher);
        setTeacherToken(res.data.token);
        setMessage(res.data.message)
        setTimeout(() => {
          navigate("/teacher/dashboard");
        }, 2000);
    }catch(err){
      setMessage("error on server")
      const errorMsg = err.response?.data?.message || "Server error";
      toast.error(errorMsg);
    }

  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <form className="form-child"
      onSubmit={handleSubmit}
      >
        <h1 className="form-title">TEACHER</h1>

        {/* Admin ID */}
        <div className="mb-5 relative">
          <label
            htmlFor="id"
            className="form-label"
          >
            TEACHER ID
          </label>
          <input
            id="id"
            type="text"
            placeholder="Enter TEACHER ID"
            name="loginId"
            value={teacher.loginId}
            onChange={e=>handleChanges(e)}
            className="form-input"
          />
          {
          error.loginId&&<p className=" text-red-500">{error.loginId}</p>
        }
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
            value={teacher.password}
            onChange={e=>handleChanges(e)}
            className="form-input"
          />
          {
          error.password && <p className=" text-red-500">{error.password}</p>
        }

        </div>

        {message &&<p className=" text-green-500 font-thin">{message}</p>}
        
        {/* Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          LOG IN
        </button>
      </form>
    </div>
  );
}
