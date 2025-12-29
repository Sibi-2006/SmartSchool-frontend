import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import axios from "axios";
import { getTeacherToken } from "../../Storage";
import Loading from "../Loading";
import NavBar from "./NavBar";
export default function OneStudent() {
  const { studentId ,category } = useParams();
  const { baseUrl } = useContext(GlobalVariableContext);
  const navigate = useNavigate();
  const token = category ==="admin"?localStorage.getItem("adminToken"):getTeacherToken();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!token) {
        navigate(`/login/${category}`);
        return;
      }

      try {
        const res = await axios.get(
          `${baseUrl}/adminlogin/class/findOne/student/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudent(res.data.student);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [baseUrl, token, navigate, studentId,category]);

  if (!student)
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        Student not found 😢
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-5">
      {
              category==="admin"&&<NavBar/>
            }
   
      
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {
          loading&&(
            <Loading/>
          )
        }
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Student Details
        </h1>

        {/* BASIC DETAILS */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 border-l-4 border-blue-500 pl-3">
            Basic Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Detail label="Full Name" value={student.fullName} />
            <Detail label="Email" value={student.email} />
            <Detail label="Phone" value={student.phone} />
            <Detail label="Gender" value={student.gender} />
            <Detail label="Date of Birth" value={student.dob} />
            <Detail label="Blood Group" value={student.bloodGroup} />
            <Detail label="Address" value={student.address} />
          </div>
        </section>

        {/* ACADEMIC DETAILS */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 border-l-4 border-green-500 pl-3">
            Academic Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Detail label="Student ID" value={student.studentId} />
            <Detail label="Standard" value={student.standard} />
            <Detail label="Section" value={student.section} />
            <Detail label="Roll Number" value={student.rollNumber} />
            <Detail label="Admission Date" value={student.admissionDate} />
          </div>
        </section>

        {/* PARENT DETAILS */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 border-l-4 border-orange-500 pl-3">
            Parent Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Detail label="Father Name" value={student.fatherName} />
            <Detail label="Father Phone" value={student.fatherPhone} />
            <Detail label="Father Occupation" value={student.fatherOccupation} />

            <Detail label="Mother Name" value={student.motherName} />
            <Detail label="Mother Phone" value={student.motherPhone} />
            <Detail label="Mother Occupation" value={student.motherOccupation} />

            <Detail label="Guardian Name" value={student.GuardianName} />
            <Detail label="Guardian Phone" value={student.GuardianPhone} />
            <Detail
              label="Guardian Occupation"
              value={student.GuardianOccupation}
            />
          </div>
        </section>

        {/* FEES DETAILS */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 border-l-4 border-purple-500 pl-3">
            Fee Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Detail label="Total Fees" value={student.totalFees} />
            <Detail label="Amount Paid" value={student.amountPaid} />
            <Detail label="Balance" value={student.balance} />
          </div>
        </section>
        {
          category==="admin" &&(
              <div className=" flex flex-row gap-3 mb-20">
            <button className=" bg-red-500 text-light rounded-lg py-2 px-3 hover:bg-red-400 font-bold text-2xl w-1/2"
            onClick={()=>navigate(`/admin/dashboard/view/details/oneStudent/delete/by/studentid/${student.studentId}`)}
            >Delete</button>
            <button
              onClick={()=>navigate(`/admin/dashboard/view/details/oneStudent/edit/by/studentid/${student.studentId}`)}
            className="bg-green-500 text-light rounded-lg py-2 px-3 hover:bg-green-400 font-bold text-2xl w-1/2" >Edit</button>
        </div>
          )
        }
        
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-md border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value || "—"}</p>
    </div>
  );
}
