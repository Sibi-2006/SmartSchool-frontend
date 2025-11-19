import React from 'react'

export default function AcademicDetails({student, setStudent, handleNextBtn, errors, handlePreviousBtn}) {
    const handleChanges = (e) =>{
        setStudent({
            ...student,[e.target.name]:e.target.value
        })
    }
  return (
    <div>

      <label className="text-primary font-semibold">standard</label>
        <input type="text" className='form-input mb-4' name='standard' value={student.standard} onChange={e=>handleChanges(e)}/>
            {errors.standard && (
            <p className="text-red-500 text-sm">{errors.standard}</p>
            )}
        <label className="text-primary font-semibold">Section</label>
        <select name='section' value={student.section} onChange={e=>handleChanges(e)} className='form-input mb-4'>
            <option value="">section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        {errors.section && (
            <p className="text-red-500 text-sm">{errors.section}</p>
            )}

         <label className="text-primary font-semibold">RollNumber</label>
        <input type="text" className='form-input mb-4' name='rollNumber' value={student.rollNumber} onChange={e=>handleChanges(e)}/>
            {errors.rollNumber && (
            <p className="text-red-500 text-sm">{errors.rollNumber}</p>
            )}

        <label className="text-primary font-semibold">Admission Date</label>
        <input className='form-input mb-4' type="date" name='admissionDate' value={student.admissionDate} onChange={e=>handleChanges(e)} />
             {errors.admissionDate && (
            <p className="text-red-500 text-sm">{errors.admissionDate}</p>
            )}
            <div className="flex items-center justify-around mt-4">
                <button className="form-btn" onClick={handlePreviousBtn}>Previous</button>
                <button className="form-btn" onClick={handleNextBtn}>Next</button>
            </div>

    </div>
  )
}
