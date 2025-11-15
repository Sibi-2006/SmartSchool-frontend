import React from 'react'
// loginId:"",
//         password:"",
//         AssignedClass :"",
//         Salary:""
export default function LoginCredentials({handleSubmit , handlePreviousBtn,errors,teacherData,setTeacherData}) {
     const handleChanges = (e) =>{
        setTeacherData({
            ...teacherData,[e.target.name]:e.target.value
        })
    };
  return (
    <div>
      <p className=' text-dark font-bold'>Create a Teacher Id and Password for Login</p>
      <label className="text-primary font-semibold">Teacher Login Id</label>
      <input type="text" placeholder="Teacher Login Id" className="form-input"  name='loginId' value={teacherData.loginId} onChange={e=>handleChanges(e)}/>
        {errors.loginId && (
            <p className="text-red-500 text-sm">{errors.loginId}</p>
            )}


      <label className="text-primary font-semibold">Teacher Password</label>
      <input type="text" placeholder="Teacher password" className="form-input" name='password' value={teacherData.password} onChange={e=>handleChanges(e)}/>
            {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
            )}



      <label className="text-primary font-semibold">Class Assigned (example: 7A, 10B etc.)</label>
    <textarea
    placeholder='Class Assigned'
    className='form-input h-24'
    name='AssignedClass'
    value={teacherData.AssignedClass}
    onChange={e=>handleChanges(e)}
    >
         </textarea>
            {errors.AssignedClass && (
            <p className="text-red-500 text-sm">{errors.AssignedClass}</p>
            )}



    <label className="text-primary font-semibold">Salary info</label>
      <input type="text" placeholder="Salary info" className="form-input" name='Salary' value={teacherData.Salary} onChange={e=>handleChanges(e)}/>
   {errors.Salary && (
            <p className="text-red-500 text-sm">{errors.Salary}</p>
            )}




        <div className="flex items-center justify-around mt-4">
        <button className="form-btn" onClick={handlePreviousBtn}>Previous</button>
        <button className="form-btn" onClick={handleSubmit} type="submit">Submit</button>
      </div>
    </div>
  )
}
