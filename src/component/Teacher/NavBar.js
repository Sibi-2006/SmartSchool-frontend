import React, { useContext, useState , useEffect } from 'react'
import { Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { logoutTeacher } from '../../Storage';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import { getTeacherToken } from '../../Storage';
import axios from 'axios';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = getTeacherToken();
  const [teacherId, setTeacherId] = useState("");
  const { baseUrl } = useContext(GlobalVariableContext)
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutTeacher();
       navigate("/login/teachers");
   };

    useEffect(() => {
        const fetchTeacher = async () => {
            if (!token) {
                navigate("/login/teachers");
                return;
            }

            try {
                const res = await axios.get(`${baseUrl}/create/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTeacherId(res.data.teacher.teacherId);
            } catch (err) {
                console.log(err.message);
            } 
        };

        fetchTeacher();
    }, [baseUrl, token, navigate]);
    const handleNav = (path) => {
    navigate(path);
    setIsOpen(false); 
  };
  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-primary py-3 px-6 text-xl text-light">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h1
              className="font-bold cursor-pointer md:hidden lg:hidden"
             onClick={() => navigate(-1)}
            >
              ⬅ Back
            </h1>
    
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
    
          {/* Desktop Menu */}
          <nav className="hidden md:flex flex-row justify-around items-center mt-3">
            <button  className="nav-btn-2" onClick={() => navigate(-1)}>⬅ Back</button>
            <button className="nav-btn-2" onClick={() => handleNav("/dashBoard")}>Dashboard</button>
              <button className="nav-btn-2" onClick={() => handleNav(`/teacher/dashboard`)}>Assigned class</button>
              <button className="nav-btn-2" onClick={() => handleNav(`/teacher/ToMarkAttendance`)}>Attendance</button>
              <button className="nav-btn-2" onClick={() => handleNav(`/teacher/add-marks`)}>Add Marks</button>
              <button className="nav-btn-2" onClick={() => handleNav(`/teacher/profile/${teacherId}`)}>Profile</button>
              <button className='nav-btn-2' onClick={()=>handleLogout()}>Log-Out</button>
          </nav>
    
          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 flex flex-col gap-3 bg-primary border-t border-white/20 pt-4">
              <button className="nav-btn-2" onClick={() => handleNav("/dashBoard")}>Dashboard</button>
              <button className="nav-btn-2" onClick={() => handleNav(`/teacher/dashboard`)}>Assigned class</button>
              <button className="nav-btn-2" onClick={() => handleNav(`/teacher/ToMarkAttendance`)}>Attendance</button>
              <button className="nav-btn-2" onClick={() => handleNav(`/teacher/add-marks`)}>Add Marks</button>
              <button className="nav-btn-2" onClick={() => handleNav(`/teacher/profile/${teacherId}`)}>Profile</button>
              <button className='nav-btn-2' onClick={()=>handleLogout()}>Log-Out</button>
            </div>
          )}
        </div>
  );
}
