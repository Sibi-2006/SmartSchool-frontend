import React, { useState , useContext } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import axios from "axios";
export default function CreateAdmin() {
  const [admin, setAdmin] = useState({
    userName: "",
    email: "",
    password: "",
    loginId: "",
  });
  const [message,setMessage] = useState("")
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext);
  const [error, setError] = useState({});

  const handleChanges = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const isValid = () => {
    const temp = {};

    if (!admin.userName.trim()) temp.userName = "Username is required";
    if (!admin.email.trim()) temp.email = "Email is required";
    if (!admin.password.trim()) temp.password = "Password is required";
    if (!admin.loginId.trim()) temp.loginId = "Login ID is required";

    setError(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      console.log("Validation Failed ❌");
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
        navigate("/login/admin");
        return;
    }

    try{
        const res = await axios.post(`${baseUrl}/adminlogin/addnew/admin`,admin,{
            headers: {
          Authorization: `Bearer ${token}`,  
        },
        });
        setMessage(res.data.message)
        setTimeout(() => {
            navigate(-1)
        }, 2000);
    }catch(err){
        console.log(err);
        setMessage("error on server")
    }

    
  };

  return (
    <div className="flex pt-10">
      <NavBar />

      <div className="w-full md:w-3/4 md:ml-[25%] flex items-center justify-center min-h-screen p-4 bg-gray-100 py-32 md:py-20 overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-lg border-t-4 border-primary flex flex-col gap-4 overflow-y-auto"
        >
          <h1 className="text-2xl font-bold text-primary text-center">
            Create Admin
          </h1>

          {/* Username */}
          <input
            type="text"
            placeholder="UserName"
            className="form-input"
            name="userName"
            value={admin.userName}
            onChange={handleChanges}
          />
          {error.userName && (
            <p className="text-red-500">{error.userName}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="form-input"
            name="email"
            value={admin.email}
            onChange={handleChanges}
          />
          {error.email && <p className="text-red-500">{error.email}</p>}

          {/* Login ID */}
          <input
            type="text"
            placeholder="Login-Id"
            className="form-input"
            name="loginId"
            value={admin.loginId}
            onChange={handleChanges}
          />
          {error.loginId && (
            <p className="text-red-500">{error.loginId}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            name="password"
            value={admin.password}
            onChange={handleChanges}
          />
          {error.password && (
            <p className="text-red-500">{error.password}</p>
          )}

          {
            message.length>0 && (
                <p className=" text-green-500 font-serif font-bold">
                    {message}
                </p>
            )
          }

          <button className="main-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
