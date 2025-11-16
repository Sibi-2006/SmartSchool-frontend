import React from 'react'

export default function LoginDetails({student, setStudent, handleSubmit, errors, handlePreviousBtn}) {
  const handleChanges = (e) =>{
        setStudent({
            ...student,[e.target.name]:e.target.value
        })
    }
  return (
    <div>
      <p className=' text-dark font-bold font-serif'>Create a login-Id and password for Student</p>
        <label className="text-primary font-semibold">loginId </label>
          <input type="text" className='form-input mb-4' name='loginId' value={student.loginId} onChange={e=>handleChanges(e)}/>
              {errors.loginId && (
              <p className="text-red-500 text-sm">{errors.loginId}</p>
              )}

        <label className="text-primary font-semibold">password</label>
        <input type="text" className='form-input mb-4' name='password' value={student.password} onChange={e=>handleChanges(e)}/>
            {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
            )}

       <div className="flex items-center justify-around mt-4">
            <button className="form-btn" onClick={handlePreviousBtn}>Previous</button>
            <button className="form-btn" onClick={handleSubmit}>Next</button>
        </div>
    </div>
  )
}
