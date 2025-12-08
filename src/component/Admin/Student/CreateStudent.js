import React, { useContext, useState } from "react";
import NavBar from "../NavBar";
import StudentBasicDetails from "./StudentBasicDetails";
import AcademicDetails from "./AcademicDetails";
import ParentDetails from "./ParentDetails";
import FeeDeatils from "./FeeDetails";
import LoginDetails from "./LoginDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalVariableContext } from "../../../Context/GlobalVariable";
import toast from "react-hot-toast";

export default function CreateStudent() {
  const emptyStudent = {
    // Basic Details
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    bloodGroup: "",

    // Academic
    standard: "",
    section: "",
    rollNumber: "",
    admissionDate: "",

    // Parent Details
    fatherName: "",
    motherName: "",
    fatherPhone: "",
    motherPhone: "",
    GuardianName: "",
    GuardianPhone: "",
    motherOccupation: "",
    fatherOccupation: "",
    GuardianOccupation: "",

    // Fees
    totalFees: "",
    amountPaid: "",

    // Login
    loginId: "",
    password: "",
  };

  const [student, setStudent] = useState(emptyStudent);
  const [steps, setSteps] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext);

  // -------------------------
  // VALIDATION FUNCTION
  // -------------------------
  const validateStep = () => {
    let temp = {};

    if (steps === 1) {
      if (!student.fullName.trim()) temp.fullName = "Full Name is required";
      if (!student.email.trim()) temp.email = "Email is required";
      if (!student.phone.trim()) temp.phone = "Phone number is required";
      if (!student.gender.trim()) temp.gender = "Select gender";
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
        temp.GuardianPhone = "Guardian phone is required when Guardian name is added";
      }
    }

    if (steps === 4) {
      if (!student.totalFees.trim()) temp.totalFees = "Total Fees is required";
      if (!student.amountPaid.trim()) temp.amountPaid = "Amount Paid is required";
    }

    if (steps === 5) {
      if (!student.loginId.trim()) temp.loginId = "Login ID is required";
      if (!student.password.trim()) temp.password = "Password is required";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // -------------------------
  // NAVIGATION BUTTONS
  // -------------------------
  const handleNextBtn = () => {
    if (validateStep()) {
      setSteps((prev) => prev + 1);
    }
  };

  const handlePreviousBtn = () => {
    setSteps((prev) => prev - 1);
  };

  // -------------------------
  // FINAL SUBMIT
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/login/admin");
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/student/addNew/student`, student, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      // Reset after success
      setStudent(emptyStudent);
      setSteps(1);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Server error";
      toast.error(errorMsg);
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
            Create Student
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
            />
          )}

          {steps === 5 && (
            <LoginDetails
              student={student}
              setStudent={setStudent}
              errors={errors}
              handlePreviousBtn={handlePreviousBtn}
              handleSubmit={handleSubmit}
            />
          )}
        </form>
      </div>
    </div>
  );
}
