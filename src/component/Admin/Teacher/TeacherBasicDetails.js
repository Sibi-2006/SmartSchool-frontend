import React from 'react'

export default function TeacherBasicDetails({handleNextBtn , errors , teacherData , setTeacherData}) {
    const handleChanges = (e) =>{
        setTeacherData({
            ...teacherData,[e.target.name]:e.target.value
        })
    }
  return (
    <div>
        <div className="w-full mb-4">
            <label className="text-primary font-semibold">Teacher Full Name</label>
            <input
              type="text"
              placeholder="Teacher full name"
              name='fullName'
              value={teacherData.fullName}
              onChange={e=>handleChanges(e)}
              className="form-input"/>
          </div>

        {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}


        <label className="text-primary font-semibold">Gender</label>
          <select className='form-input mb-4'
          name='gender'
          value={teacherData.gender}
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
        <input type="date" className='form-input mb-4' name='dob' value={teacherData.dob} onChange={e=>handleChanges(e)}/>
        {errors.dob && (
            <p className="text-red-500 text-sm">{errors.dob}</p>
            )}
         
         <label className="text-primary font-semibold">Email</label>
        <input type="email" className='form-input mb-4' name='email' value={teacherData.email} onChange={e=>handleChanges(e)}/>
            {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
            )}


        <label className="text-primary font-semibold">Phone Number</label>
        <input type="text" className='form-input mb-4' name='phone' value={teacherData.phone} onChange={e=>handleChanges(e)}/>
            {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
            )}


         <label className="text-primary font-semibold">Address</label>
         <textarea placeholder='Address' className='form-input h-52' name='address' value={teacherData.address} onChange={e=>handleChanges(e)}></textarea>
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
