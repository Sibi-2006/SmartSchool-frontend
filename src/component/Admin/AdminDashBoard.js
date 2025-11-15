import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import NavBar from "./NavBar";
export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext)

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("adminToken");
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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login/admin");
  };

  if (!admin) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8">
     <NavBar/>
    </div>
  );
}
