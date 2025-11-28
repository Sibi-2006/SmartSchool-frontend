import React, { useContext, useEffect, useState } from 'react';
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading';
import { getTeacherToken } from '../../Storage';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Attendance() {
    const { standard, section, teacherId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { baseUrl } = useContext(GlobalVariableContext);
    const [attendance, setAttendance] = useState({});
    const [teacher, setTeacher] = useState({});
    const token = getTeacherToken();

    const navigate = useNavigate();

    const [boys, setBoys] = useState([]);
    const [girls, setGirls] = useState([]);

    // =============================
    // Fetch Class Students
    // =============================
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

                setStudents(res.data || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                toast.error("Error fetching students!");
                setLoading(false);
            }
        };

        fetchClass();
    }, [standard, section, baseUrl, token, navigate]);


    // Sort + Split Boys/Girls
    useEffect(() => {
        if (!students || students.length === 0) {
            setBoys([]);
            setGirls([]);
            return;
        }

        const sorted = [...students].sort((a, b) =>
            a.fullName.localeCompare(b.fullName)
        );

        const currentBoys = sorted.filter(
            (std) => std.gender?.toLowerCase() === "male"
        );
        const currentGirls = sorted.filter(
            (std) => std.gender?.toLowerCase() === "female"
        );

        setBoys(currentBoys);
        setGirls(currentGirls);
    }, [students]);


    // Fetch Teacher
    useEffect(() => {
        const fetchTeacher = async () => {
            if (!token) {
                navigate("/login/teachers");
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get(`${baseUrl}/create/getOneTeacher/by-Id/${teacherId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTeacher(res.data.teacher);
            } catch (err) {
                console.log(err.message);
                toast.error("Error fetching teacher data!");
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [baseUrl, token, navigate,teacherId]);


    // Submit attendance
    const submitAttendance = async () => {
        try {
            const payload = {
                date: new Date().toISOString().slice(0, 10),
                standard,
                section,
                subject: teacher.department,
                markedBy: teacher._id,
                students: students.map((std) => ({
                    studentId: std._id,
                    name: std.fullName,
                    rollNumber: std.rollNumber,
                    status: attendance[std._id] || "absent",
                })),
            };

            await axios.post(
                `${baseUrl}/attendance/mark`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Attendance Saved Successfully! 🎉");

        } catch (err) {
            console.error(err);
            toast.error("Error marking attendance!");
        }
    };


    return (
        <div className="py-20 px-10 overflow-y-auto">

            {/* Toast Container */}
            <ToastContainer position="top-center" autoClose={2000} />

            {loading && <Loading />}

            {!loading && (
                <>
                    <h1 className="text-xl font-bold mb-4">Attendance</h1>

                    {/* Boys */}
                    <div className="mb-6">
                        <h2 className="font-semibold text-blue-600 text-lg">
                            Boys ({boys.length})
                        </h2>
                        <ul className="mt-2">
                            {boys.map((boy) => (
                                <li key={boy._id} className="border p-2 rounded mb-2 flex justify-between">
                                    {boy.fullName}

                                    <select
                                        value={attendance[boy._id] || ""}
                                        onChange={(e) =>
                                            setAttendance({ ...attendance, [boy._id]: e.target.value })
                                        }
                                        className="border px-2 py-1 rounded"
                                    >
                                        <option value="">Select</option>
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                    </select>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Girls */}
                    <div>
                        <h2 className="font-semibold text-pink-600 text-lg">
                            Girls ({girls.length})
                        </h2>
                        <ul className="mt-2">
                            {girls.map((girl) => (
                                <li key={girl._id} className="border p-2 rounded mb-2 flex justify-between">
                                    {girl.fullName}

                                    <select
                                        value={attendance[girl._id] || ""}
                                        onChange={(e) =>
                                            setAttendance({ ...attendance, [girl._id]: e.target.value })
                                        }
                                        className="border px-2 py-1 rounded"
                                    >
                                        <option value="">Select</option>
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                    </select>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={submitAttendance}
                        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
                    >
                        Submit Attendance
                    </button>

                </>
            )}
        </div>
    );
}
