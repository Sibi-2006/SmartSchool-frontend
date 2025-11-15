import React, { useEffect, useState } from "react";
//         : "",
//         : "",
//         : "",
//         : "",
//         : ""
export default function ProfessionalDetails({handleNextBtn , handlePreviousBtn , errors,teacherData,setTeacherData}) {
    const handleChanges = (e) =>{
        setTeacherData({
            ...teacherData,[e.target.name]:e.target.value
        })
    };
  return (

    <div className="">
      {/* Teacher ID */}
      

      <label className="text-primary font-semibold">Department (Science / Math / English / etc.)</label>
      <input type="text" placeholder="Department (Science / Math / English / etc.)" className="form-input" name="department" value={teacherData.department} onChange={e=>handleChanges(e)}/>
         {errors.department && (
            <p className="text-red-500 text-sm">{errors.department}</p>
            )}

      <label className="text-primary font-semibold">Designation (Teacher / Senior Teacher / HOD)</label>
      <input type="text" placeholder="Designation (Teacher / Senior Teacher / HOD)" className="form-input" name="designation" value={teacherData.designation} onChange={e=>handleChanges(e)}/>
            {errors.designation && (
            <p className="text-red-500 text-sm">{errors.designation}</p>
            )}


      <label className="text-primary font-semibold">Joining Date</label>
      <input type="date" className="form-input mb-4" name="joiningDate" value={teacherData.joiningDate} onChange={e=>handleChanges(e)}/>
            {errors.joiningDate && (
            <p className="text-red-500 text-sm">{errors.joiningDate}</p>
            )}


      <label className="text-primary font-semibold">Qualification</label>
      <input
        type="text"
        placeholder="Qualification"
        className="form-input"
        name="qualification"
        value={teacherData.qualification}
        onChange={e=>handleChanges(e)}
      />
      {errors.qualification && (
            <p className="text-red-500 text-sm">{errors.qualification}</p>
            )}



      <label className="text-primary font-semibold">Experience (in years)</label>
      <input
        type="text"
        placeholder="Experience (in years)"
        className="form-input"
        name="experience"
        value={teacherData.experience}
        onChange={e=>handleChanges(e)}
      />
      {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience}</p>
            )}



      <div className="flex items-center justify-around mt-4">
        <button className="form-btn" onClick={handlePreviousBtn}>Previous</button>
        <button className="form-btn" onClick={handleNextBtn}>Next</button>
      </div>
    </div>
  );
}
