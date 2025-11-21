import React from 'react'

export default function LoginCredentials({
  handleSubmit,
  handlePreviousBtn,
  errors,
  teacherData,
  setTeacherData,
  isFromEditTeacher,
  message=""
}) {

  const handleChanges = (e) => {
    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>

      {/* Show Login Fields ONLY When Adding New Teacher */}
      {!isFromEditTeacher && (
        <div>
          <p className="text-dark font-bold">Create a Teacher Id and Password for Login</p>

          <label className="text-primary font-semibold">Teacher Login Id</label>
          <input
            type="text"
            placeholder="Teacher Login Id"
            className="form-input"
            name="loginId"
            value={teacherData.loginId}
            onChange={handleChanges}
          />
          {errors.loginId && <p className="text-red-500 text-sm">{errors.loginId}</p>}

          <label className="text-primary font-semibold">Teacher Password</label>
          <input
            type="text"
            placeholder="Teacher password"
            className="form-input"
            name="password"
            value={teacherData.password}
            onChange={handleChanges}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
      )}


      {/* Assigned Class */}
      <label className="text-primary font-semibold">Class Assigned (example: 7A, 10B etc.)</label>
      <textarea
        placeholder="Class Assigned"
        className="form-input h-24"
        name="AssignedClass"
        value={teacherData.AssignedClass}
        onChange={handleChanges}
      ></textarea>
      {errors.AssignedClass && <p className="text-red-500 text-sm">{errors.AssignedClass}</p>}


      {/* Salary */}
      <label className="text-primary font-semibold">Salary info</label>
      <input
        type="number"
        placeholder="Salary info"
        className="form-input"
        name="Salary"
        value={teacherData.Salary}
        onChange={handleChanges}
      />
      {errors.Salary && <p className="text-red-500 text-sm">{errors.Salary}</p>}

      {
        message?.length >0 && (
          <p className=' text-green-500 font-bold'>{message}</p>
        )
      }

      {/* Buttons */}
      <div className="flex items-center justify-around mt-4">
        <button className="form-btn" onClick={handlePreviousBtn}>Previous</button>
        <button className="form-btn" onClick={handleSubmit} type="submit">Submit</button>
      </div>

    </div>
  );
}
