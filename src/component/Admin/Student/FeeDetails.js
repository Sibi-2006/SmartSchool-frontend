import React from 'react'

export default function FeeDetails({
  student,
  setStudent,
  handleNextBtn,
  errors,
  handlePreviousBtn,
  isFormEdit,
  handleSubmit,
  message = "" 
}) {

  const handleChanges = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <label className="text-primary font-semibold">Total Fees</label>
      <input 
        type="text" 
        className='form-input mb-4' 
        name='totalFees' 
        value={student.totalFees} 
        onChange={handleChanges}
      />
      {errors.totalFees && (
        <p className="text-red-500 text-sm">{errors.totalFees}</p>
      )}

      <label className="text-primary font-semibold">Amount Paid</label>
      <input 
        type="text" 
        className='form-input mb-4' 
        name='amountPaid' 
        value={student.amountPaid} 
        onChange={handleChanges}
      />
      {errors.amountPaid && (
        <p className="text-red-500 text-sm">{errors.amountPaid}</p>
      )}

      {message?.length > 0 && (
        <p className='text-red-500 font-serif'>{message}</p>
      )}

      <div className="flex items-center justify-around mt-4">
        <button className="form-btn" onClick={handlePreviousBtn}>Previous</button>

        {isFormEdit ? (
          <button className="form-btn" onClick={handleSubmit}>Submit</button>
        ) : (
          <button className="form-btn" onClick={handleNextBtn}>Next</button>
        )}
      </div>
    </div>
  )
}
