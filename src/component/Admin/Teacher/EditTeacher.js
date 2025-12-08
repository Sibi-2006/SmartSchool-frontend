import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalVariableContext } from "../../../Context/GlobalVariable";
import TeacherBasicDetails from '../Teacher/TeacherBasicDetails'
import ProfessionalDetails from '../Teacher/ProfessionalDetails'
import LoginCredentials from '../Teacher/LoginCredentials';

import axios from "axios";
import toast from "react-hot-toast";


export default function EditTeacher() {
    const { teacherId } = useParams();
  const { baseUrl } = useContext(GlobalVariableContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
const [steps , setSteps ] = useState(1);
  const [message , setMessage] = useState("")
const isFromEditTeacher = true;
    const [errors, setErrors] = useState({});
  const [teacherData, setTeacherData] = useState({
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
        AssignedClass :"",
        Salary:""
  });
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
        setTeacherData(res.data.teacher);
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Server error";
toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [baseUrl, token, navigate, teacherId]);

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );

  if (!teacherData)
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        teacherData not found 😢
      </div>
    );
const validateStep = () => {
  let temp = {};

  if (steps === 1) {
    if (!teacherData?.fullName.trim()) temp.fullName = "Full Name is required";
    if (!teacherData?.email.trim()) temp.email = "Email is required";
    if (!teacherData?.phone.trim()) temp.phone = "Phone number is required";
    if (!teacherData?.gender.trim()) temp.gender = "Select gender";
    if (!teacherData?.dob.trim()) temp.dob = "DOB is required";
    if (!teacherData?.address.trim()) temp.address = "address is required";
  }

  if (steps === 2) {
  if (!teacherData?.department) temp.department = "Department is required";
  if (!teacherData?.designation) temp.designation = "Designation is required";
  if (!teacherData?.joiningDate) temp.joiningDate = "Joining date is required";
  if (!teacherData?.qualification) temp.qualification = "Qualification is required";
  if (!teacherData?.experience) temp.experience = "Experience is required";
}

if (steps === 3) {  
  if (!teacherData?.AssignedClass?.trim())
    temp.AssignedClass = "Assigned Class is required";
  
  if (!teacherData?.Salary)
    temp.Salary = "Salary is required";
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
  if (!token) {
    navigate("/login/admin");
    return;
  }

  try{
    const res = await axios.patch(`${baseUrl}/create/getOneTeacher/byId/${teacherId}`,teacherData,
          { headers: { Authorization: `Bearer ${token}` } }
    );
    setMessage(res.data.message);
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  }catch(err){
    console.log(err.message)
  }
   }
  return (
    <div className=" flex items-center justify-center py-32 flex-col">
        <h1 className="text-2xl text-primary font-bold">Edit Teacher's</h1>
      <form
      onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-lg border-t-4  border-primary flex flex-col gap-4 overflow-y-auto"
      

      >
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
                            isFromEditTeacher={isFromEditTeacher} 
                            message={message}
                            />
                        )
                        }
        

      </form>
    </div>
  )
}
