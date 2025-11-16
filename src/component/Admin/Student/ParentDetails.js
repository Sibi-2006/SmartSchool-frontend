import React from 'react';

export default function ParentDetails({
  student,
  setStudent,
  errors,
  handleNextBtn,
  handlePreviousBtn
}) {
  
  const handleChanges = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>

      {/* Father Name */}
      <label className="text-primary font-semibold">Father Name</label>
      <input
        type="text"
        className="form-input mb-2"
        name="fatherName"
        value={student.fatherName}
        onChange={handleChanges}
      />
      {errors.fatherName && (
        <p className="text-red-500 text-sm">{errors.fatherName}</p>
      )}

      {/* Father Phone */}
      <label className="text-primary font-semibold mt-2">Father Phone</label>
      <input
        type="text"
        className="form-input mb-2"
        name="fatherPhone"
        value={student.fatherPhone}
        onChange={handleChanges}
      />
      {errors.fatherPhone && (
        <p className="text-red-500 text-sm">{errors.fatherPhone}</p>
      )}

      {/* Mother Name */}
      <label className="text-primary font-semibold">Mother Name</label>
      <input
        type="text"
        className="form-input mb-2"
        name="motherName"
        value={student.motherName}
        onChange={handleChanges}
      />
      {errors.motherName && (
        <p className="text-red-500 text-sm">{errors.motherName}</p>
      )}

      {/* Mother Phone */}
      <label className="text-primary font-semibold">Mother Phone</label>
      <input
        type="text"
        className="form-input mb-2"
        name="motherPhone"
        value={student.motherPhone}
        onChange={handleChanges}
      />

      {/* Guardian Name */}
      <label className="text-primary font-semibold">Guardian Name</label>
      <input
        type="text"
        className="form-input mb-2"
        name="GuardianName"
        value={student.GuardianName}
        onChange={handleChanges}
      />

      {/* Guardian Phone */}
      <label className="text-primary font-semibold">Guardian Phone</label>
      <input
        type="text"
        className="form-input mb-2"
        name="GuardianPhone"
        value={student.GuardianPhone}
        onChange={handleChanges}
      />
      {errors.GuardianPhone && (
        <p className="text-red-500 text-sm">{errors.GuardianPhone}</p>
      )}

      {/* Father Occupation */}
      <label className="text-primary font-semibold">Father Occupation</label>
      <input
        type="text"
        className="form-input mb-2"
        name="fatherOccupation"
        value={student.fatherOccupation}
        onChange={handleChanges}
      />

      {/* Mother Occupation */}
      <label className="text-primary font-semibold">Mother Occupation</label>
      <input
        type="text"
        className="form-input mb-2"
        name="motherOccupation"
        value={student.motherOccupation}
        onChange={handleChanges}
      />

      {/* Guardian Occupation */}
      <label className="text-primary font-semibold">Guardian Occupation</label>
      <input
        type="text"
        className="form-input mb-4"
        name="GuardianOccupation"
        value={student.GuardianOccupation}
        onChange={handleChanges}
      />

      {/* Buttons */}
      <div className="flex items-center justify-around mt-4">
        <button className="form-btn" onClick={handlePreviousBtn}>
          Previous
        </button>
        <button className="form-btn" onClick={handleNextBtn}>
          Submit
        </button>
      </div>

    </div>
  );
}
