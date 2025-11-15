import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
export default function AdminLogin() {
  const [admin, setAdmin] = useState({ adminId: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext)

  const isValid = () => {
    const tempError = {};
    if (!admin.adminId.trim()) tempError.adminId = "Enter Admin ID";
    if (!admin.password.trim()) tempError.password = "Enter Password";
    setErrors(tempError);
    return Object.keys(tempError).length === 0;
  };

  const handleChanges = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/adminlogin/login`, admin);

      localStorage.setItem("adminToken", res.data.token);
      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Server error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <form
        className="form-child p-8 bg-white shadow-lg rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="form-title text-2xl font-bold mb-6 text-center">ADMIN LOGIN</h1>

        {/* Admin ID */}
        <div className="mb-5 relative">
          <label htmlFor="id" className="form-label block mb-1 font-semibold">
            Admin ID
          </label>
          <input
            id="id"
            type="text"
            placeholder="Enter Admin ID"
            name="adminId"
            onChange={handleChanges}
            className="form-input w-full border p-2 rounded"
          />
          {errors.adminId && <div className="text-red-500 text-sm mt-1">{errors.adminId}</div>}
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="form-label block mb-1 font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={handleChanges}
            className="form-input w-full border p-2 rounded"
          />
          {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
        </div>

        {message && <p className="text-center text-sm my-2">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-lg transition-all duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "LOG IN"}
        </button>
      </form>
    </div>
  );
}
