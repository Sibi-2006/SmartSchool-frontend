import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalVariableContext } from "../../../Context/GlobalVariable";
import axios from "axios";

import StudentBasicDetails from './StudentBasicDetails';
import AcademicDetails from './AcademicDetails';
import ParentDetails from './ParentDetails';
import FeeDeatils from "./FeeDetails";
import toast from "react-hot-toast";

export default function EditStudent() {
  const { studentId } = useParams();
  const { baseUrl } = useContext(GlobalVariableContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const [message , setMessage] = useState("")
    const isFormEdit = true;
  const [steps, setSteps] = useState(1);
  const [errors, setErrors] = useState({});
  const [student, setStudent] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    bloodGroup: "",
    standard: "",
    section: "",
    rollNumber: "",
    admissionDate: "",
    fatherName: "",
    motherName: "",
    fatherPhone: "",
    GuardianName: "",
    GuardianPhone: "",
    totalFees: "",
    amountPaid: "",
  });

  const [loading, setLoading] = useState(true);

  // NORMALIZE BACKEND DATA — convert all values to string safely
  const normalize = (obj) => {
    const formatted = {};
    for (let key in student) {
      formatted[key] = obj[key] ? String(obj[key]) : "";
    }
    return formatted;
  };

  useEffect(() => {
    const fetchStudent = async () => {
      if (!token) {
        navigate("/login/admin");
        return;
      }

      try {
        const res = await axios.get(
          `${baseUrl}/adminlogin/class/findOne/student/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const cleanData = normalize(res.data.student);
        setStudent(cleanData);

      } catch (err) {
        const errorMsg = err.response?.data?.message || "Server error";
              toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [baseUrl, token, navigate, studentId]);

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );

  const validateStep = () => {
    let temp = {};

    if (steps === 1) {
      if (!student.fullName.trim()) temp.fullName = "Full Name is required";
      if (!student.email.trim()) temp.email = "Email is required";
      if (!student.phone.trim()) temp.phone = "Phone number is required";
      if (!student.gender.trim()) temp.gender = "Gender is required";
      if (!student.dob.trim()) temp.dob = "DOB is required";
      if (!student.address.trim()) temp.address = "Address is required";
      if (!student.bloodGroup.trim()) temp.bloodGroup = "Blood Group is required";
    }

    if (steps === 2) {
      if (!student.standard.trim()) temp.standard = "Standard is required";
      if (!student.section.trim()) temp.section = "Section is required";
      if (!student.rollNumber.trim()) temp.rollNumber = "Roll Number is required";
      if (!student.admissionDate.trim()) temp.admissionDate = "Admission Date is required";
    }

    if (steps === 3) {
      if (!student.fatherName.trim()) temp.fatherName = "Father name is required";
      if (!student.motherName.trim()) temp.motherName = "Mother name is required";

      if (!student.fatherPhone.trim() && !student.GuardianPhone.trim()) {
        temp.fatherPhone = "Provide at least Father or Guardian phone";
        temp.GuardianPhone = "Provide at least Father or Guardian phone";
      }

      if (student.GuardianName.trim() && !student.GuardianPhone.trim()) {
        temp.GuardianPhone = "Guardian phone required when Guardian name is added";
      }
    }

    if (steps === 4) {
      if (!student.totalFees.trim()) temp.totalFees = "Total Fees is required";
      if (!student.amountPaid.trim()) temp.amountPaid = "Amount Paid is required";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };


  const handleNextBtn = () => {
    if (validateStep()) {
      setSteps((prev) => prev + 1);
    }
  };

  const handlePreviousBtn = () => {
    setSteps((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Final Student Data:", student);
    if (!token) {
        navigate("/login/admin");
        return;
      }

      try{
        const res = await axios.patch(`${baseUrl}/student/student/update/or/edit/${studentId}`,student,{
            headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
        setTimeout(() => {
            navigate(`/admin/dashboard/view/details/oneStudent/${studentId}`)
        }, 2000);
      }catch(err){
        console.log(err.message);
        setMessage("something wrong check all data !!! ")
        return;
      }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 py-32 md:py-20 overflow-y-auto">

      <form
        className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-lg border-t-4 border-primary flex items-center justify-center flex-col gap-4 overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-primary text-center mb-4">
          Edit Student
        </h1>

        {steps === 1 && (
          <StudentBasicDetails
            student={student}
            setStudent={setStudent}
            handleNextBtn={handleNextBtn}
            errors={errors}
          />
        )}

        {steps === 2 && (
          <AcademicDetails
            student={student}
            setStudent={setStudent}
            handleNextBtn={handleNextBtn}
            errors={errors}
            handlePreviousBtn={handlePreviousBtn}
          />
        )}

        {steps === 3 && (
          <ParentDetails
            student={student}
            setStudent={setStudent}
            errors={errors}
            handlePreviousBtn={handlePreviousBtn}
            handleNextBtn={handleNextBtn}
          />
        )}

        {steps === 4 && (
          <FeeDeatils
            student={student}
            setStudent={setStudent}
            errors={errors}
            handlePreviousBtn={handlePreviousBtn}
            handleNextBtn={handleNextBtn}
            handleSubmit={handleSubmit}
            isFormEdit={isFormEdit}
            message={message}
          />
        )}

        
      </form>
    </div>
  );
}
