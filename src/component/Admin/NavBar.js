import React, { useState } from 'react'
import { Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const baseUrl = "/admin/dashboard/create";
    const handleLogout = () => {
      localStorage.removeItem("adminToken");
       navigate("/login/admin");
   };
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
          fixed left-0 bg-primary h-full w-1/2 sm:w-1/3 md:w-1/4 
          text-light pt-20 md:pt-0 
          ${isOpen ? "block" : "hidden"} 
          md:block
        `}
      >
        <nav className="flex flex-col items-center justify-center gap-4 h-full p-4 text-light font-bold text-xl">
          <button
           className="nav-btn"
          onClick={()=>navigate("/admin/dashboard")}
          >Dash Board</button>
          <button
           className="nav-btn"
          onClick={()=>navigate(`${baseUrl}/admin`)}
          >Create Admin's</button>
          <button
           className="nav-btn"
           onClick={()=>navigate(`${baseUrl}/teacher`)}
           >Create Teacher's</button>
          <button className="nav-btn"
          onClick={()=>navigate(`${baseUrl}/student`)}
          >Create Student's</button>

          <button className="nav-btn"
          onClick={()=>navigate(`${baseUrl}/parent`)}
          >Create Parent's</button>

          <button className="nav-btn"
          onClick={()=>navigate("/admin/dashboard/create/time-table")}
          >Create TimeTable</button>
          <button className="nav-btn"
          onClick={()=>navigate("/admin/amount/details")}
          >Amount Details</button>

          <button
           className="nav-btn"
          onClick={handleLogout}
          >Log-Out</button>
        </nav>
      </div>
    </>
  );
}
