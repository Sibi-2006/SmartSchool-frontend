import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import { getTeacherToken } from "../../Storage";
import NavBar from "./NavBar";

export default function ViewOneClass() {
  const { standard, section, category } = useParams();
  const { baseUrl } = useContext(GlobalVariableContext);
  const token =
    category === "admin"
      ? localStorage.getItem("adminToken")
      : getTeacherToken();

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassAndAttendance = async () => {
      try {
        if (!token) {
          navigate(`/login/${category}`);
          return;
        }

        // 1️⃣ Fetch students
        const classRes = await axios.get(
          `${baseUrl}/adminlogin/class/${standard}/${section}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const studentsData = classRes.data || [];
        setStudents(studentsData);

        // 2️⃣ Fetch attendance % for each student
        const attendancePromises = studentsData.map((stu) =>
          axios.get(
            `${baseUrl}/attendance/one-student/percentage/${section}/${standard}/${stu._id}/${category}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        );

        const attendanceResponses = await Promise.all(attendancePromises);

            const attendanceObj = {};
    attendanceResponses.forEach((res, index) => {
      attendanceObj[studentsData[index].studentId] = parseFloat(
        res.data.attendancePercentage
      );
    });


        setAttendanceMap(attendanceObj);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchClassAndAttendance();
  }, [standard, section, category, baseUrl, token, navigate]);

  if (loading)
    return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="py-20 px-10">
      {category === "admin" && <NavBar />}

      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Standard {standard} - Section {section}
      </h1>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {students.map((stu, index) => {
            const attendance = attendanceMap[stu.studentId];
            const isLow = attendance < 75;

            return (
              <div
                key={index}
                className={`p-5 rounded-xl shadow-md bg-white border-2
                  ${isLow ? "border-red-500" : "border-gray-300"}
                `}
              >
                {/* 🔔 Warning Badge */}
                {isLow && (
                  <div className="mb-2 inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ⚠️ Attendance Below 75%
                  </div>
                )}

                <h2 className="text-xl font-semibold">{stu.fullName}</h2>

                <p className="text-gray-700">
                  <strong>Student-Id:</strong> {stu.studentId}
                </p>

                <p className="text-gray-700">
                  <strong>Roll:</strong> {stu.rollNumber}
                </p>

                <p className="text-gray-700">
                  <strong>Email:</strong> {stu.email}
                </p>

                <p className="text-gray-700">
                  <strong>Phone:</strong> {stu.phone}
                </p>

                {/* 🎯 Attendance Percentage */}
                <p
                  className={`mt-2 font-bold text-lg ${
                    isLow ? "text-red-600" : "text-green-600"
                  }`}
                >
                  Attendance:{" "}
                  {attendance !== undefined ? `${attendance}%` : "Loading..."}
                </p>

                {/* 🔘 Buttons */}
                <div className="flex flex-col mt-4 gap-2">
                  {category === "admin" ? (
                    <>
                      <button
                        className="main-btn"
                        onClick={() =>
                          navigate(
                            `/admin/dashboard/view/details/oneStudent/${stu.studentId}/admin`
                          )
                        }
                      >
                        Full detail about {stu.fullName}
                      </button>

                      <button
                        className="main-btn"
                        onClick={() =>
                          navigate(
                            `/student/attandance/${stu._id}/${standard}/${section}/admin`
                          )
                        }
                      >
                        Attendance detail about {stu.fullName}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="main-btn"
                        onClick={() =>
                          navigate(
                            `/teacher/view/details/oneStudent/${stu.studentId}/teacher`
                          )
                        }
                      >
                        Full detail about {stu.fullName}
                      </button>

                      <button
                        className="main-btn"
                        onClick={() =>
                          navigate(
                            `/student/attandance/${stu._id}/${standard}/${section}/teacher`
                          )
                        }
                      >
                        Attendance detail about {stu.fullName}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
