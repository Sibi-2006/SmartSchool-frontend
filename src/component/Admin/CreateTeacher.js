import React, { useContext, useState } from 'react'
import TeacherBasicDetails from './Teacher/TeacherBasicDetails'
import ProfessionalDetails from './Teacher/ProfessionalDetails'
import LoginCredentials from './Teacher/LoginCredentials';
import { GlobalVariableContext } from "../../Context/GlobalVariable"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function CreateTeacher() {
    const [steps , setSteps ] = useState(1);
    const [errors, setErrors] = useState({});
    const { baseUrl } = useContext(GlobalVariableContext);
    const navigate = useNavigate();
    const [teacherData, setTeacherData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        dob: "",
        // Professional Details
        teacherId: "",
        department: "",
        designation: "",
        joiningDate: "",
        qualification: "",
        experience: "",
        //loginCredentials
        loginId:"",
        password:"",
        AssignedClass :"",
        Salary:""
});

const validateStep = () => {
  let temp = {};

  if (steps === 1) {
    if (!teacherData.fullName.trim()) temp.fullName = "Full Name is required";
    if (!teacherData.email.trim()) temp.email = "Email is required";
    if (!teacherData.phone.trim()) temp.phone = "Phone number is required";
    if (!teacherData.gender.trim()) temp.gender = "Select gender";
    if (!teacherData.dob.trim()) temp.dob = "DOB is required";
    if (!teacherData.address.trim()) temp.address = "address is required";
  }

  if (steps === 2) {
    if (!teacherData.department.trim()) temp.department = "Department is required";
    if (!teacherData.designation.trim()) temp.designation = "Designation is required";
    if (!teacherData.joiningDate.trim()) temp.joiningDate = "Joining date is required";
    if (!teacherData.qualification.trim()) temp.qualification = "Qualification is required";
    if (!teacherData.experience.trim()) temp.experience = "Experience is required";
  }

  if(steps === 3 ){
    if (!teacherData.loginId.trim()) temp.loginId = "LoginId is required";
    if (!teacherData.password.trim()) temp.password = "passsword is required";
    if (!teacherData.AssignedClass.trim()) temp.AssignedClass = "AssignedClass is required";
    if (!teacherData.Salary.trim()) temp.Salary = "Salary is required";
  }

  setErrors(temp);
  return Object.keys(temp).length === 0;
};



   const handleNextBtn = () => {
  if (validateStep()) {
    setSteps((prev) => prev + 1);
  }
};

    const handlePreviousBtn = ()=>{
        setSteps((prev)=> prev-1);
    }

   const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(teacherData);

  const token = localStorage.getItem("adminToken");

  if (!token) {
    navigate("/login/admin");
    return;
  }

  try {
      await axios.post(
      `${baseUrl}/create/teacher`,
      teacherData,
      {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }
    );

    setTeacherData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        dob: "",
        teacherId: "",
        department: "",
        designation: "",
        joiningDate: "",
        qualification: "",
        experience: "",
        loginId:"",
        password:"",
        AssignedClass :"",
        Salary:""
    })
    setSteps(1)

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

    

  return (
    <div className="flex ">


      {/* MAIN CONTENT AREA */}
      <div className="w-full  flex items-center justify-center min-h-screen p-4 bg-gray-100 py-32 md:py-20 overflow-y-auto">

        <form
          className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-lg border-t-4  border-primary flex flex-col gap-4 overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-primary text-center mb-4">
            Create Teacher's
          </h1>

          {/* FIELD 1 */}
          {
                steps === 1 && (
                    <TeacherBasicDetails 
                    handleNextBtn={handleNextBtn} 
                    errors={errors}
                    teacherData={teacherData}
                    setTeacherData={setTeacherData}
                    />
                )
                }

                {
                steps === 2 && (
                    <ProfessionalDetails 
                     handleNextBtn={handleNextBtn}
                     handlePreviousBtn={handlePreviousBtn}
                     errors={errors}
                    teacherData={teacherData}
                    setTeacherData={setTeacherData}
                    />
                )
                }

                 {
                steps === 3 && (
                    <LoginCredentials 
                     handleSubmit={handleSubmit}
                     handlePreviousBtn={handlePreviousBtn}
                     errors={errors}
                    teacherData={teacherData}
                    setTeacherData={setTeacherData} 
                    />
                )
                }

        
        

        </form>

      </div>
    </div>
  )
}
