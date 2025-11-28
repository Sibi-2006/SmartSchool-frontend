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
       navigate("/login/teacher");
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
    console.log("nav : ",teacherId)
  return (
    <>
      {/* MOBILE TOP NAV */}
      <nav className="fixed top-0 left-0 w-full bg-primary text-light p-4 flex justify-between items-center md:hidden z-50">
        <h1 className="text-xl font-bold">Admin-dashboard</h1>

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* SIDEBAR (mobile + desktop) */}
<div
  className={`
    fixed left-0 top-0 bg-primary h-full 
    w-1/2 sm:w-1/3 md:w-1/4 
    text-light 
    pt-20 md:pt-0 
    ${isOpen ? "block" : "hidden"} 
    md:block
    overflow-y-auto
  `}
>
  <nav className="flex flex-col items-center gap-6 p-4 text-light font-bold text-xl pt-24">
    <button className="nav-btn" onClick={() => navigate("/teacher/dashboard")}>
      Dash Board
    </button>

    <button className="nav-btn" onClick={() => navigate("/teacher/ToMarkAttendance")}>
      Mark attendance
    </button>

    <button className="nav-btn" onClick={() => navigate("/teacher/add-marks")}>
      Add Marks
    </button>

    <button className="nav-btn">
      View Time Table
    </button>

    <button className="nav-btn" onClick={() => navigate(`/teacher/profile/${teacherId}`)}>
      Profile
    </button>

    <button className="nav-btn" onClick={handleLogout}>
      Log-Out
    </button>
  </nav>
</div>

    </>
  );
}
