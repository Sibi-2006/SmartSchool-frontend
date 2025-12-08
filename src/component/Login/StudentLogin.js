import React, { useContext, useState } from "react";
import { GlobalVariableContext } from "../../Context/GlobalVariable"
import axios from "axios"
import { setStudentToken } from "../../Storage"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function StudentLogin() {
  const [ student,setStudent] = useState({
    loginId:"",
    password:""
  });
  const [error,setError]=useState({});
  const { baseUrl } = useContext(GlobalVariableContext);
   const  [message , setMessage] = useState("");
   const navigate = useNavigate();
  const handleChanges = (e)=>{
    setStudent({
      ...student,[e.target.name]:e.target.value
    });
  };
  const isValid = ()=>{
    const temp = {};
    if(!student.loginId.trim()) temp.loginId="Reqired login id";
    if(!student.password.trim()) temp.password="Reqired Password";
    setError(temp);
    return Object.keys(temp).length === 0;

  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!isValid()) return;
    try{
        const res = await axios.post(`${baseUrl}/student/login`,{
          loginId:student.loginId,
          password:student.password
        });
        setMessage(res.data.message);
        setStudentToken(res.data.token);

        setTimeout(() => {
          navigate("/student/dashboard");
        }, 2000);
    }catch(err){
      setMessage(err.response?.data?.message || "Server error");
      const errorMsg = err.response?.data?.message || "Server error";
toast.error(errorMsg);

    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <form className="form-child"
      onSubmit={handleSubmit}
      >
        <h1 className="form-title">STUDENT</h1>

        <div className="mb-5 relative">
          <label
            htmlFor="id"
            className="form-label"
          >
            Student ID
          </label>
          <input
            id="id"
            type="text"
            placeholder="Enter student ID"
            className="form-input"
            name="loginId"
            value={student.loginId}
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
            value={student.password}
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
  );
}
