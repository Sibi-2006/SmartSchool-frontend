import React from 'react'

export default function StudentProfileTemplate({student}) {
  return (
    <div>
      <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-l-4 border-blue-500 pl-3">
              Basic Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Detail label="Full Name" value={student.fullName} />
              <Detail label="Email" value={student.email} />
              <Detail label="Phone" value={student.phone} />
              <Detail label="Gender" value={student.gender} />
              <Detail label="Date of Birth" value={student.dob} />
              <Detail label="Blood Group" value={student.bloodGroup} />
              <Detail label="Address" value={student.address} />
            </div>
          </section>
  
          {/* ACADEMIC DETAILS */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-l-4 border-green-500 pl-3">
              Academic Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Detail label="Student ID" value={student.studentId} />
              <Detail label="Standard" value={student.standard} />
              <Detail label="Section" value={student.section} />
              <Detail label="Roll Number" value={student.rollNumber} />
              <Detail label="Admission Date" value={student.admissionDate} />
            </div>
          </section>
  
          {/* PARENT DETAILS */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-l-4 border-orange-500 pl-3">
              Parent Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Detail label="Father Name" value={student.fatherName} />
              <Detail label="Father Phone" value={student.fatherPhone} />
              <Detail label="Father Occupation" value={student.fatherOccupation} />
  
              <Detail label="Mother Name" value={student.motherName} />
              <Detail label="Mother Phone" value={student.motherPhone} />
              <Detail label="Mother Occupation" value={student.motherOccupation} />
  
              <Detail label="Guardian Name" value={student.GuardianName} />
              <Detail label="Guardian Phone" value={student.GuardianPhone} />
              <Detail
                label="Guardian Occupation"
                value={student.GuardianOccupation}
              />
            </div>
          </section>
  
          {/* FEES DETAILS */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-l-4 border-purple-500 pl-3">
              Fee Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Detail label="Total Fees" value={student.totalFees} />
              <Detail label="Amount Paid" value={student.amountPaid} />
              <Detail label="Balance" value={student.balance} />
            </div>
          </section>
    </div>
  )
}


  function Detail({ label, value }) {
    return (
      <div className="bg-gray-50 p-3 rounded-md border">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{value || "—"}</p>
      </div>
    );
  }