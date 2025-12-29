import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import axios from "axios";
import Loading from "../Loading";
import NavBar from "./NavBar";

export default function OneTeacher() {
  const { teacherId } = useParams();
  const { baseUrl } = useContext(GlobalVariableContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!token) {
        navigate("/login/admin");
        return;
      }

      try {
        const res = await axios.get(
          `${baseUrl}/create/getOneTeache/teacher/byId/${teacherId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTeacher(res.data.teacher);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [baseUrl, token, navigate, teacherId]);


  if (!teacher)
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        Teacher not found 😢
      </div>
    );

  return (
    <div className="py-28 px-6 md:px-20 w-full bg-gray-50 min-h-screen">
      <NavBar/>
      

      <h1 className="text-3xl text-center font-bold text-primary mb-10">
        Teacher Full Details
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        {
          loading&&(
            <Loading/>
          )
        }
        {/* TOP SECTION */}
        <div className="flex flex-col items-center gap-3 text-center mb-10">
         
          <h2 className="text-2xl font-bold text-secondary">{teacher.fullName}</h2>
          <p className="text-gray-600 font-semibold">Teacher ID: {teacher.teacherId}</p>
          <p className="text-gray-600 font-semibold">Department: {teacher.department}</p>
        </div>

        {/* DETAILS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Info label="Full Name" value={teacher.fullName} />
          <Info label="Email" value={teacher.email} />
          <Info label="Phone" value={teacher.phone} />
          <Info label="Gender" value={teacher.gender} />
          <Info label="DOB" value={teacher.dob} />
          <Info label="Address" value={teacher.address} />

          <Info label="Designation" value={teacher.designation} />
          <Info label="Qualification" value={teacher.qualification} />
          <Info label="Experience" value={teacher.experience + " Years"} />

          <Info label="Joining Date" value={teacher.joiningDate} />
          <Info label="Assigned Class" value={teacher.AssignedClass} />
          <Info label="Salary" value={"₹ " + teacher.Salary} />
        </div>

        <div className=" flex flex-row gap-3 items-center justify-around my-20">
            <button className=" bg-red-500 text-light rounded-lg py-2 px-3 hover:bg-red-400 font-bold text-2xl w-1/2"
            onClick={()=>navigate(`/admin/dashboard/view/details/oneteacher/delete/by/studentid/${teacher.teacherId}`)}
            >Delete</button>
            <button
            onClick={()=>navigate(`/admin/dashboard/view/details/oneteacher/edit/by/studentid/${teacher.teacherId}`)}
            className="bg-green-500 text-light rounded-lg py-2 px-3 hover:bg-green-400 font-bold text-2xl w-1/2" >Edit</button>
        </div>

        {/* CREATED / UPDATED */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>Created At: {teacher.createdAt?.slice(0, 10)}</p>
          <p>Updated At: {teacher.updatedAt?.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
}

// SMALL COMPONENT FOR CLEAN UI
const Info = ({ label, value }) => (
  <div className="flex flex-col p-4 bg-gray-100 rounded-xl shadow-sm">
    <span className="text-gray-500 text-sm font-semibold">{label}</span>
    <span className="text-gray-900 font-bold">{value}</span>
  </div>
);
