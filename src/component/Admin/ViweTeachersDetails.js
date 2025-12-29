import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

export default function ViewTeachersDetails({ users }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredTeachers = users.filter((t) =>
    t.fullName.toLowerCase().includes(search.toLowerCase()) ||
    t.department.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-32 w-full px-5 md:px-20">
      <NavBar/>
      <div className="flex items-center justify-center mb-8">
        <input
          type="search"
          placeholder="Search teachers by name, department, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input placeholder-gray-500 w-full md:w-1/2 p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
      </div>

      <h1 className="text-center text-primary font-bold text-3xl py-8 tracking-wide">
        Teacher's Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((tch, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all cursor-pointer group"
            >
              <h1 className="text-lg font-semibold text-gray-700">
                Name: <span className="text-secondary font-bold">{tch.fullName}</span>
              </h1>

              <h1 className="text-lg font-semibold text-gray-700 mt-2">
                Department: <span className="text-secondary font-bold">{tch.department}</span>
              </h1>

              <h1 className="text-lg font-semibold text-gray-700 mt-2">
                Email: <span className="text-secondary font-bold">{tch.email}</span>
              </h1>

              <button
                onClick={() => navigate(`/admin/dashboard/view/details/oneteacher/${tch.teacherId}`)}
                className="main-btn mt-5 w-full py-2 rounded-xl shadow bg-primary text-white font-bold hover:bg-secondary transition-all"
              >
                View Full Details
              </button>
            </div>
          ))
        ) : (
          <h1 className="text-center col-span-3 text-xl text-gray-500 font-semibold py-10">
            No teachers found
          </h1>
        )}
      </div>
    </div>
  );
}