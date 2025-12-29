import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherToken } from '../../../Storage';
import { GlobalVariableContext } from '../../../Context/GlobalVariable';
import axios from 'axios';

export default function SeeVerifyMarksByClass() {
  const { standard, section, from, total } = useParams();
  const [examType, setExamType] = useState("");
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token =
    from === "admin"
      ? localStorage.getItem("adminToken")
      : getTeacherToken();

  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext);

  const examOptions = [
    "Unit Test 1",
    "Unit Test 2",
    "Midterm",
    "Final",
    "Monthly",
    "Special",
  ];

  useEffect(() => {
    if (!examType) return; // wait until exam selected

    const fetchMarks = async () => {
      if (!token) {
        navigate(`/login/${from}`);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${baseUrl}/verify/${from}/${standard}/${section}/${encodeURIComponent(
            examType
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMarks(res.data.marks);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setMarks([]);
        setError(err.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [examType, token, navigate, from, standard, section, baseUrl]);

  return (
    <div className="p-6 py-28">
      <h1 className="text-lg font-semibold mb-2">
        Total students: {total}
      </h1>
      <h1 className="text-lg font-semibold mb-4">
        Verified students: {marks.length}
      </h1>

      {/* Exam selector */}
      <div className="mb-6 max-w-xs">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Select Exam
        </label>
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">-- Select Exam --</option>
          {examOptions.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && <p className="text-blue-600 font-medium">Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {/* Marks table */}
      {examType && !loading && (
        <div className="mt-4">
          {marks.length === 0 ? (
            <p className="text-gray-500">No students verified for this exam.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr className="text-center">
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Student Name</th>
                    <th className="p-2 border">Standard</th>
                    <th className="p-2 border">Section</th>
                    <th className="p-2 border">Exam</th>
                    <th className="p-2 border">Result</th>
                    <th className="p-2 border">Verified On</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((student, index) => (
                    <tr key={student._id} className="text-center">
                      <td className="p-2 border">{index + 1}</td>
                      <td className="p-2 border font-medium">{student.fullName}</td>
                      <td className="p-2 border">{student.standard}</td>
                      <td className="p-2 border">{student.section}</td>
                      <td className="p-2 border">{student.examType}</td>
                      <td
                        className={`p-2 border font-semibold ${
                          student.result === "PASS" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {student.result}
                      </td>

                      <td className="p-2 border">
                        {new Date(student.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
