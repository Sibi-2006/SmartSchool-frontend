import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalVariableContext } from "../../Context/GlobalVariable"
export default function ViewOneClass() {
  const { standard, section } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
const { baseUrl } = useContext(GlobalVariableContext);
    const token = localStorage.getItem("adminToken");
    const navigate = useNavigate();
  useEffect(() => {
    const fetchClass = async () => {
      try {
        if (!token) {
                navigate("/login/admin");
                return;
            }
        const res = await axios.get(
          `${baseUrl}/adminlogin/class/${standard}/${section}`
        ,{
            headers: { Authorization: `Bearer ${token}` },

        });
        setStudents(res.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchClass();
  }, [standard, section,baseUrl,token,navigate]);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="py-20 px-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:shadow-lg transition"
      >
        ⬅ Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Standard {standard} - Section {section}
      </h1>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((stu, index) => (
            <div
              key={index}
              className="p-5 rounded-xl shadow-md border border-gray-300 bg-white"
            >
              <h2 className="text-xl font-semibold">{stu.fullName}</h2>
              <h4 className="text-gray-700"><strong>Student-Id : </strong> {stu.studentId}</h4>
              <p className="text-gray-700"><strong>Roll:</strong> {stu.rollNumber}</p>
              <p className="text-gray-700"><strong>Email:</strong> {stu.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {stu.phone}</p>
              <button className="main-btn"
              onClick={()=>navigate(`/admin/dashboard/view/details/oneStudent/${stu.studentId}`)}
              >Full detail about {stu.fullName} </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
