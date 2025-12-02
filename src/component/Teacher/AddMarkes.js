import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import { getTeacherToken } from "../../Storage";
import Loading from "../Loading";
import axios from "axios";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddMarkes() {
  const { standard, section, teacherId } = useParams();
  const [students, setStudents] = useState([]);
  const [boys, setBoys] = useState([]);
  const [girls, setGirls] = useState([]);

  const [teacher, setTeacher] = useState({});
  const { baseUrl } = useContext(GlobalVariableContext);
  const token = getTeacherToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Inputs for each student
  const [inputs, setInputs] = useState({});

  // fetch teacher
  useEffect(() => {
    const fecthTeacher = async () => {
      if (!token) navigate("/login/teachers");

      try {
        setLoading(true);
        const res = await axios.get(
          `${baseUrl}/create/getOneTeacher/by-Id/${teacherId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTeacher(res.data.teacher);
      } catch (err) {
        toast.error("Failed to load teacher data!");
      } finally {
        setLoading(false);
      }
    };
    fecthTeacher();
  }, [baseUrl, teacherId, navigate, token]);

  // fetch class students
  useEffect(() => {
    const fetchClass = async () => {
      try {
        if (!token) {
          navigate(`/login/teacher`);
          return;
        }

        const res = await axios.get(
          `${baseUrl}/create/class/${standard}/${section}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const allStudents = res.data || [];

        // Sort A → Z
        allStudents.sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );

        // Separate boys & girls
        setBoys(allStudents.filter((s) => s.gender === "male"));
        setGirls(allStudents.filter((s) => s.gender === "female"));

        setStudents(allStudents);
        toast.success("Students loaded!");
      } catch (err) {
        toast.error("Failed to load students!");
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [standard, section, baseUrl, token, navigate]);

  // Handle input change per student
  const handleChanges = (e, id) => {
    setInputs({
      ...inputs,
      [id]: {
        ...inputs[id],
        [e.target.name]: e.target.value,
      },
    });
  };

  // Submit marks
  const addmark = async (id) => {
    const data = inputs[id];

    if (!data || !data.mark || !data.exam) {
      toast.error("Please fill exam & marks!");
      return;
    }

    try {
      if (!token) {
        navigate(`/login/teacher`);
        return;
      }

      await axios.post(
        `${baseUrl}/add-mark/from/teacher/${id}`,
        {
          studentId: id,
          standard,
          section,
          marks: data.mark,
          examType: data.exam,
          addedBy: teacher._id,
          subject: teacher.department,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Marks added!");

      // Clear input
      setInputs((prev) => ({
        ...prev,
        [id]: { exam: "", mark: "" },
      }));
    } catch (err) {
      toast.error("Error adding marks!");
    }
  };

  return (
    <div className="py-24 w-full flex items-center justify-center flex-col bg-gray-50 min-h-screen">
      <ToastContainer position="top-center" />

      {loading && <Loading />}

      {!loading && (
        <>
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
            Add Marks —{" "}
            <span className="text-primary font-extrabold">
              {standard} "{section}"
            </span>
          </h1>

          {/* ------------------------ BOYS ------------------------ */}
          <h2 className="text-2xl font-bold text-blue-700 mb-3">👦 Boys</h2>

          <ul className="flex flex-col w-full md:w-3/4 gap-6">
            {boys.length === 0 && (
              <p className="text-gray-500">No boys found.</p>
            )}

            {boys.map((std) => (
              <li
                key={std._id}
                className="w-full border bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h1 className="text-lg font-semibold text-gray-700">
                    Name:{" "}
                    <span className="text-primary font-bold">
                      {std.fullName}
                    </span>
                  </h1>
                  <h2 className="text-md text-gray-600">
                    Roll No:{" "}
                    <span className="text-primary font-bold">
                      {std.rollNumber}
                    </span>
                  </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <select
                    name="exam"
                    className="px-4 py-2 border rounded-lg bg-gray-100"
                    value={inputs[std._id]?.exam || ""}
                    onChange={(e) => handleChanges(e, std._id)}
                  >
                    <option value="">Select Exam</option>
                    <option value="Unit Test 1">Unit Test 1</option>
                    <option value="Unit Test 2">Unit Test 2</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Special">Special</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Enter marks"
                    name="mark"
                    className="px-4 py-2 border rounded-lg bg-gray-100"
                    value={inputs[std._id]?.mark || ""}
                    onChange={(e) => handleChanges(e, std._id)}
                  />
                </div>

                <button
                  className="bg-primary text-white px-5 py-2 rounded-lg font-semibold"
                  onClick={() => addmark(std._id)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>

          {/* ------------------------ GIRLS ------------------------ */}
          <h2 className="text-2xl font-bold text-pink-700 mt-10 mb-3">👧 Girls</h2>

          <ul className="flex flex-col w-full md:w-3/4 gap-6">
            {girls.length === 0 && (
              <p className="text-gray-500">No girls found.</p>
            )}

            {girls.map((std) => (
              <li
                key={std._id}
                className="w-full border bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h1 className="text-lg font-semibold text-gray-700">
                    Name:{" "}
                    <span className="text-primary font-bold">
                      {std.fullName}
                    </span>
                  </h1>
                  <h2 className="text-md text-gray-600">
                    Roll No:{" "}
                    <span className="text-primary font-bold">
                      {std.rollNumber}
                    </span>
                  </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <select
                    name="exam"
                    className="px-4 py-2 border rounded-lg bg-gray-100"
                    value={inputs[std._id]?.exam || ""}
                    onChange={(e) => handleChanges(e, std._id)}
                  >
                    <option value="">Select Exam</option>
                    <option value="Unit Test 1">Unit Test 1</option>
                    <option value="Unit Test 2">Unit Test 2</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Special">Special</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Enter marks"
                    name="mark"
                    className="px-4 py-2 border rounded-lg bg-gray-100"
                    value={inputs[std._id]?.mark || ""}
                    onChange={(e) => handleChanges(e, std._id)}
                  />
                </div>

                <button
                  className="bg-primary text-white px-5 py-2 rounded-lg font-semibold"
                  onClick={() => addmark(std._id)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
