import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalVariableContext } from "../../Context/GlobalVariable";

export default function DeleteStudent() {
  const { studentId } = useParams();
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login/admin");
      return;
    }

    // Check correct input
    if (deleteId !== studentId) {
      setMessage("<-- Enter the correct Student ID -->");
      return;
    }

    try {
      const res = await axios.delete(
        `${baseUrl}/adminlogin/delete/student/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message);
      setMessage("");

      // Redirect after 1 sec
      setTimeout(() => {
        navigate("/admin/dashboard/view/details/student");
      }, 1500);

    } catch (err) {
      console.log(err.message);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 ml-5 mt-10 px-3 py-2 h-16 rounded-lg bg-primary text-white font-semibold shadow-md hover:shadow-lg transition"
      >
        ⬅ Back
      </button>
      <form
        className="bg-gray-200 border-2 border-red-400 rounded-xl shadow-md p-3 gap-4 flex items-center justify-center flex-col w-11/12 md:w-1/4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl text-red-400 font-bold font-serif">
          Delete Student
        </h1>

        <h1 className="text-dark font-serif">
          To delete the student, enter the studentId
          <br />
          <span className="text-red-500 font-bold">{studentId}</span>
        </h1>

        <input
          type="text"
          className="form-input"
          placeholder="Student Id"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />

        {message && <p className="text-red-500">{message}</p>}
        {success && <p className="text-green-600 font-bold">{success}</p>}

        <button className="bg-red-500 rounded-lg py-1 px-4 font-bold text-light text-2xl hover:bg-red-300">
          Delete
        </button>
      </form>
    </div>
  );
}
