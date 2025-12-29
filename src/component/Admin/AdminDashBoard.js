import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import Loading from "../Loading";
import NavBar from "./NavBar";
export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext)
  const token = localStorage.getItem("adminToken");
  const baseNavUrl ="/admin/dashboard/view/details"
  useEffect(() => {
    const fetchAdmin = async () => {
      
      if (!token) {
        navigate("/login/admin");
        return;
      }
      try {
        const res = await axios.get(`${baseUrl}/adminlogin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(res.data.admin);
      } catch (err) {
        console.log(err);
        navigate("/login/admin"); // redirect if token invalid
      }
    };
    fetchAdmin();
  }, [navigate,baseUrl,token]);
  const [count , setCount ] = useState(0);
  useEffect(()=>{
    const fetchCountAdmin = async()=>{
      if (!token) {
        navigate("/login/admin");
        return;
      }
      try{
        const res = await axios.get(`${baseUrl}/adminlogin/getMax`,{
        headers: { Authorization: `Bearer ${token}` },
        })
        setCount(res.data.count)
      }catch(err){
        console.log(err.message)
      }
      
    }
    fetchCountAdmin();
  },[baseUrl,token,navigate])

  return (
    <div className="p-8">
     
      <NavBar/>
     <div className=" w-full right-0 flex items-center justify-center h-screen ">
     {
      !admin&&(
        <Loading/>
      )
     }
      <div className="flex items-center justify-center flex-col gap-4 overflow-y-auto ">
          <div className="adminBox">
              <h1 className="form-title">ADMIN</h1>
              <p className=" text-dark ">Total Admin : <samp className=" font-bold text-primary">{count.adminCount}</samp></p>
              <button className="main-btn"
                onClick={()=>navigate(`${baseNavUrl}/admin`)}
                >View Admin's details</button>
          </div>
          <div className=" flex flex-col  md:flex-row justify-center items-center g-5">
            <div className="adminBox">
              <h1 className="form-title">TEACHER</h1>
              <p className=" text-dark ">Total Teacher : <samp className=" font-bold text-primary">{count.teacherCount}</samp></p>
              <button
                 className="main-btn"
                 onClick={()=>navigate(`${baseNavUrl}/teacher`)}
                 >View Teacher's details</button>
            </div>
            <div className="adminBox">
              <h1 className="form-title">STUDENT</h1>
              <p className=" text-dark ">Total Student : <samp className=" font-bold text-primary">{count.studentCount}</samp></p>
              <button
                 className="main-btn"
                 onClick={()=>navigate(`${baseNavUrl}/student`)}
                 >View Student's details</button>
            </div>
            
             <div className="adminBox">
              <h1 className="form-title">TimeTable</h1>
              <button
                 className="main-btn"
                 onClick={()=>navigate(`${baseNavUrl}/time-table`)}
                 >View all timeTable details</button>
            </div>
            
          </div>

          </div>
           
          </div>
      </div>
  );
}
