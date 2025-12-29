import React, { useEffect, useState } from "react";

export default function Attendance({
  attendanceData = [],
  student,
  appName,
  saveAsPDF,
  pdfRef
}) {
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [percentage, setPercentage] = useState(0);
    console.log(attendanceData)
  // -------- Calculate Attendance --------
 useEffect(() => {
  if (!attendanceData.length || !student?._id) return;

  let p = 0;
  let a = 0;

  attendanceData.forEach((day) => {
    day.students?.forEach((stu) => {
      if (stu.studentId?._id === student._id) {
        stu.status === "present" ? p++ : a++;
      }
    });
  });

  const total = p + a;
  const percent = total ? ((p / total) * 100).toFixed(2) : 0;

  setPresent(p);
  setAbsent(a);
  setPercentage(percent);
}, [attendanceData, student]);


  return (
    <div className="min-h-screen bg-gray-100 p-4 py-28">
     
      

      {/* PDF CONTENT */}
      <div
        ref={pdfRef}
        className="bg-white max-w-3xl mx-auto p-8 border border-gray-300"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold uppercase">
            {appName || "School Name"}
          </h1>
          <p className="text-sm text-gray-600">Attendance Certificate</p>
        </div>

        <hr className="mb-6" />

        {/* Student Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <p>
            <span className="font-semibold">Student Name:</span>{" "}
            {student?.fullName}
          </p>
          <p>
            <span className="font-semibold">Roll No:</span>{" "}
            {student?.rollNumber}
          </p>
          <p>
            <span className="font-semibold">Class:</span>{" "}
            {student?.standard}
          </p>
          <p>
            <span className="font-semibold">Section:</span>{" "}
            {student?.section}
          </p>
        </div>

        {/* Attendance Summary */}
        <div className="border border-gray-300 rounded mb-6">
          <div className="grid grid-cols-3 text-center font-semibold bg-gray-200 p-2">
            <p>Present</p>
            <p>Absent</p>
            <p>Percentage</p>
          </div>
          <div className="grid grid-cols-3 text-center p-4 text-lg">
            <p className="text-green-600 font-bold">{present}</p>
            <p className="text-red-600 font-bold">{absent}</p>
            <p className="font-bold">{percentage}%</p>
          </div>
        </div>

        {/* Statement */}
        <p className="text-sm leading-6 mb-10">
          This is to certify that the above-mentioned student’s attendance
          record is true and correct as per the school records for the
          academic year.
        </p>

        {/* Footer */}
        <div className="flex justify-between mt-16 text-sm">
          <div>
            <p className="font-semibold">Date:</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>

          <div className="text-right">
            <p className="font-semibold">Authorized Signatory</p>
            <p className="mt-6">______________________</p>
          </div>
        </div>
      </div>
       {/* Download Button */}
      <div className="flex justify-center mt-10 mb-4">
        <button
          onClick={saveAsPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
