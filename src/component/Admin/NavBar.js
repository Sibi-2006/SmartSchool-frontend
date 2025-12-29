import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const baseUrl = "/admin/dashboard/create";

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false); // close mobile menu after click
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
        <button className="nav-btn-2" onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
        <button className="nav-btn-2" onClick={() => navigate(`${baseUrl}/teacher`)}>Create Teacher</button>
        <button className="nav-btn-2" onClick={() => navigate(`${baseUrl}/student`)}>Create Student</button>
        <button className="nav-btn-2" onClick={() => navigate(`${baseUrl}/admin`)}>Create Admin</button>
        <button className="nav-btn-2" onClick={() => navigate(`${baseUrl}/parent`)}>Create Parent</button>
        <button className="nav-btn-2" onClick={() => navigate(`${baseUrl}/time-table`)}>Create TimeTable</button>
        <button className="nav-btn-2" onClick={() => navigate("/admin/amount/details")}>Amount Details</button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-primary border-t border-white/20 pt-4">
          <button className="nav-btn-2" onClick={() => handleNav("/admin/dashboard")}>Dashboard</button>
          <button className="nav-btn-2" onClick={() => handleNav(`${baseUrl}/teacher`)}>Create Teacher</button>
          <button className="nav-btn-2" onClick={() => handleNav(`${baseUrl}/student`)}>Create Student</button>
          <button className="nav-btn-2" onClick={() => handleNav(`${baseUrl}/admin`)}>Create Admin</button>
          <button className="nav-btn-2" onClick={() => handleNav(`${baseUrl}/parent`)}>Create Parent</button>
          <button className="nav-btn-2" onClick={() => handleNav(`${baseUrl}/time-table`)}>Create TimeTable</button>
          <button className="nav-btn-2" onClick={() => handleNav("/admin/amount/details")}>Amount Details</button>
        </div>
      )}
    </div>
  );
}
