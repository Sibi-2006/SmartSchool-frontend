import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTeacherToken } from "../../Storage";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import axios from "axios";
import Loading from "../Loading";

export default function DashBoard() {
    const navigate = useNavigate();
    const token = getTeacherToken();
    const { baseUrl } = useContext(GlobalVariableContext);
    const { from } = useParams();
    const [loading, setLoading] = useState(true);
    const [teacherId, setTeacherId] = useState("");
    const [assignedClasses, setAssignedClasses] = useState([]);
    const [classStats, setClassStats] = useState([]);

    // ------------------------------------------
    // 1) FETCH TEACHER INFO
    // ------------------------------------------
    useEffect(() => {
        const fetchTeacher = async () => {
            if (!token) {
                navigate("/login/teachers");
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get(`${baseUrl}/create/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTeacherId(res.data.teacher.teacherId);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [baseUrl, token, navigate]);

    // ------------------------------------------
    // 2) FETCH ASSIGNED CLASSES
    // ------------------------------------------
    useEffect(() => {
        if (!teacherId) return;

        const fetchClass = async () => {
            try {
                const res = await axios.get(
                    `${baseUrl}/create/get/classFor/teacher/${teacherId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const raw = res.data.class || "";

                const list = raw
                    .split("\n")
                    .filter((i) => i.trim() !== "")
                    .map((item) => {
                        const [standard, section] = item.split("-");
                        return { standard, section };
                    });

                setAssignedClasses(list);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchClass();
    }, [teacherId, token, baseUrl]);

    // ------------------------------------------
    // 3) FETCH BOYS/GIRLS/TOTAL FOR EACH CLASS
    // ------------------------------------------
    useEffect(() => {
        if (assignedClasses.length === 0) return;

        const fetchGenderStats = async () => {
            try {
                setLoading(true);
                const results = [];

                for (const cls of assignedClasses) {
                    const res = await axios.get(
                        `${baseUrl}/create/teacher/total-gender/${cls.standard}/${cls.section}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    results.push({
                        _id: {
                            standard: cls.standard,
                            section: cls.section,
                        },
                        boys: res.data.totalBoys,
                        girls: res.data.totalGirls,
                        total: res.data.totalStudents,
                    });
                }
                setClassStats(results);
            } catch (err) {
                console.log(err.message);
            }finally {
                setLoading(false);
            }
        };

        fetchGenderStats();
    }, [assignedClasses, token, baseUrl]);

    return (
        <div>

            <div className="w-full h-screen overflow-y-auto">

            {
                loading&&(
                    <Loading/>
                )
            }
            {
                from==="dashboard" &&(<h1 className=" text-center text-2xl text-primary font-bold mt-28">Assigned Classes</h1>)
            }{
                from==="ToMarkAttendance" && (<h1 className=" text-center text-2xl text-primary font-bold mt-28">choose the class to mark attendance</h1>)
            }{
                from==="add-marks" && (<h1 className=" text-center text-2xl text-primary font-bold mt-28">choose the class to add marks </h1>)
            }
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-32 px-10 w-full">
                     
                    {classStats.map((cls) => (
                        <div
                            key={`${cls._id.standard}-${cls._id.section}`}
                            className="w-full bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-3 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex flex-col items-center">
                                <h1 className="text-gray-600 text-sm uppercase font-semibold tracking-wider">
                                    Class
                                </h1>
                                <h2 className="text-3xl font-bold text-primary">
                                    {cls._id.standard}-{cls._id.section}
                                </h2>
                            </div>

                            <div className="w-full flex flex-col gap-1 mt-3 text-center">
                                <p className="text-gray-800 text-lg font-medium">
                                    Boys:{" "}
                                    <span className="text-blue-600 font-bold">
                                        {cls.boys}
                                    </span>
                                </p>
                                <p className="text-gray-800 text-lg font-medium">
                                    Girls:{" "}
                                    <span className="text-pink-600 font-bold">
                                        {cls.girls}
                                    </span>
                                </p>
                                <p className="text-gray-900 text-xl font-bold mt-1">
                                    Total: {cls.total}
                                </p>
                            </div>
                            {
                                from==="dashboard"&&(
                                    <button
                                        className="mt-4 w-full bg-primary text-white py-2 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold"
                                        onClick={() =>
                                            navigate(
                                                `/teacher/view/class/${cls._id.standard}/${cls._id.section}/teacher`
                                            )
                                        }
                                    >
                                        View Class
                                    </button>
                                )
                            }
                            {
                                from==="ToMarkAttendance"&&(
                                    <button
                                className="mt-4 w-full bg-primary text-white py-2 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold"
                                    onClick={()=>navigate(`/teacher/view/class/mark-attendance/${cls._id.standard}/${cls._id.section}/${teacherId}`)}
                                    >
                                        Mark attendance
                                    </button>
                                )
                            }{
                                from==="add-marks"&&(
                                    <button
                                className="mt-4 w-full bg-primary text-white py-2 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold"
                                    onClick={()=>navigate(`/teacher/view/class/add-marks/${cls._id.standard}/${cls._id.section}/${teacherId}`)}
                                    >
                                        Add Marks 
                                    </button>
                                )
                            }
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
