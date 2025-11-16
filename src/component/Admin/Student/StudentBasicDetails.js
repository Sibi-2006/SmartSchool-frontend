import React from 'react'

export default function StudentBasicDetails({student , setStudent, handleNextBtn, errors}) {
    const handleChanges = (e) =>{
        setStudent({
            ...student,[e.target.name]:e.target.value
        })
    }
  return (
    <div>
      <div className="w-full mb-4">
            <label className="text-primary font-semibold">Student Full Name</label>
            <input
              type="text"
              placeholder="Student full name"
              name='fullName'
              value={student.fullName}
              onChange={e=>handleChanges(e)}
              className="form-input"/>
          </div>

        {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}


        <label className="text-primary font-semibold">Gender</label>
          <select className='form-input mb-4'
          name='gender'
          value={student.gender}
          onChange={e=>handleChanges(e)}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other's</option>
          </select>

            {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
            )}


        
        <label className="text-primary font-semibold">Date of Birth</label>
        <input type="date" className='form-input mb-4' name='dob' value={student.dob} onChange={e=>handleChanges(e)}/>
        {errors.dob && (
            <p className="text-red-500 text-sm">{errors.dob}</p>
            )}

            <label className="text-primary font-semibold">Blood Group</label>
        <input type="text" className='form-input mb-4' name='bloodGroup' value={student.bloodGroup} onChange={e=>handleChanges(e)}/>
            {errors.bloodGroup && (
            <p className="text-red-500 text-sm">{errors.bloodGroup}</p>
            )}
         
         <label className="text-primary font-semibold">Email</label>
        <input type="email" className='form-input mb-4' name='email' value={student.email} onChange={e=>handleChanges(e)}/>
            {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
            )}


        <label className="text-primary font-semibold">Phone Number</label>
        <input type="text" className='form-input mb-4' name='phone' value={student.phone} onChange={e=>handleChanges(e)}/>
            {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
            )}


         <label className="text-primary font-semibold">Address</label>
         <textarea placeholder='Address' className='form-input h-52' name='address' value={student.address} onChange={e=>handleChanges(e)}></textarea>
        {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
            )}
        <div className=' flex items-center justify-end'>
            <button className='form-btn'
            onClick={handleNextBtn}
            >Next</button>
        </div>
    </div>
  )
}
