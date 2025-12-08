import React, { useContext, useState } from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GlobalVariableContext } from "../../../Context/GlobalVariable";

export default function CreateParent() {
  const [parent, setParent] = useState({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
    loginId: "",
    password: "",
  });

  const [error, setError] = useState({});
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext);

  const handleChange = (e) => {
    setParent({
      ...parent,
      [e.target.name]: e.target.value,
    });
  };

  const isValid = () => {
    const temp = {};

    if (!parent.fullName.trim()) temp.fullName = "name is required";

    if (!parent.email.trim()) {
      temp.email = "email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parent.email)) {
      temp.email = "enter a valid email";
    }

    if (!parent.phone.trim()) temp.phone = "phone is required";
    if (!parent.studentId.trim()) temp.studentId = "student-id is required";
    if (!parent.loginId.trim()) temp.loginId = "login-id is required";
    if (!parent.password.trim()) temp.password = "password is required";

    setError(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      if (!token) {
        navigate("/login/admin");
        return;
      }

      const res = await axios.post(
        `${baseUrl}/adminlogin/create/parent`,
        parent,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // success toast
      toast.success(res.data.message || "Parent created successfully!");

      // clear form
      setParent({
        fullName: "",
        email: "",
        phone: "",
        studentId: "",
        loginId: "",
        password: "",
      });

    } catch (err) {
      const backendMsg =
        err.response?.data?.message || "Something went wrong";

      // error toast
      toast.error(backendMsg);
    }
  };

  return (
    <div className="flex">
      <NavBar />
      <div className="w-full md:w-3/4 md:ml-[25%] flex items-center justify-center min-h-screen p-4 bg-gray-100 py-32 md:py-20 overflow-y-auto">
        <form
          className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-lg border-t-4 border-primary flex flex-col gap-4 overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-primary text-center mb-4">
            Create Parent
          </h1>

          <label className="text-primary font-semibold">Enter Parent name</label>
          <input
            type="text"
            placeholder="father or mother name"
            className="form-input"
            name="fullName"
            value={parent.fullName}
            onChange={handleChange}
          />
          {error.fullName && (
            <p className="text-red-400 font-bold text-sm">{error.fullName}</p>
          )}

          <label className="text-primary font-semibold">Enter Parent email</label>
          <input
            type="email"
            placeholder="enter parent email"
            className="form-input"
            name="email"
            value={parent.email}
            onChange={handleChange}
          />
          {error.email && (
            <p className="text-red-400 font-bold text-sm">{error.email}</p>
          )}

          <label className="text-primary font-semibold">
            Enter Parent Phone number
          </label>
          <input
            type="text"
            placeholder="Phone number"
            className="form-input"
            name="phone"
            value={parent.phone}
            onChange={handleChange}
          />
          {error.phone && (
            <p className="text-red-400 font-bold text-sm">{error.phone}</p>
          )}

          <label className="text-primary font-semibold">
            Enter student eg:(STD-000)
          </label>
          <input
            type="text"
            placeholder="enter student-id"
            className="form-input"
            name="studentId"
            value={parent.studentId}
            onChange={handleChange}
          />
          {error.studentId && (
            <p className="text-red-400 font-bold text-sm">{error.studentId}</p>
          )}

          <label className="text-primary font-semibold">
            Create login-id for Parent{" "}
          </label>
          <input
            type="text"
            placeholder="login-id for parent"
            className="form-input"
            name="loginId"
            value={parent.loginId}
            onChange={handleChange}
          />
          {error.loginId && (
            <p className="text-red-400 font-bold text-sm">{error.loginId}</p>
          )}

          <label className="text-primary font-semibold">Enter password </label>
          <input
            type="text"
            placeholder="password"
            className="form-input"
            name="password"
            value={parent.password}
            onChange={handleChange}
          />
          {error.password && (
            <p className="text-red-400 font-bold text-sm">{error.password}</p>
          )}

          <button className="main-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
