import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import { getStudentToken } from '../../Storage';
import axios from 'axios';
import Loading from '../Loading';

export default function StudentAttendance() {
    const { id, standard, section } = useParams();
    const [attendances, setAttendances] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const { baseUrl } = useContext(GlobalVariableContext);
    const token = getStudentToken();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [searchDate, setSearchDate] = useState('');
    const [searchStatus, setSearchStatus] = useState('');

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                if (!token) {
                    navigate('/login/students');
                    return;
                }

                const res = await axios.get(
                    `${baseUrl}/attendance/one-student/${section}/${standard}/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setAttendances(res.data.data || []);
                setFiltered(res.data.data || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, [baseUrl, id, section, standard, token, navigate]);

    // Filter logic
    useEffect(() => {
        let filteredData = [...attendances];

        if (searchDate) {
            filteredData = filteredData.filter((record) =>
                record.date.includes(searchDate)
            );
        }

        if (searchStatus) {
            filteredData = filteredData.filter((record) =>
                record.students.some(
                    (s) => s.status.toLowerCase() === searchStatus.toLowerCase()
                )
            );
        }

        setFiltered(filteredData);
    }, [searchDate, searchStatus, attendances]);

    if (loading) return <Loading />;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">My Attendance</h1>

            {/* Search / Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="border px-3 py-2 rounded w-full sm:w-1/3"
                />
                <select
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    className="border px-3 py-2 rounded w-full sm:w-1/3"
                >
                    <option value="">All Status</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
            </div>

            {filtered.length === 0 ? (
                <p className="text-center text-gray-500">No attendance records found.</p>
            ) : (
                <div className="space-y-4">
                    {filtered.map((record) => (
                        <div key={record._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Date: {record.date}</span>
                                <span className="font-semibold">Subject: {record.subject}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Status:</span>
                                {record.students.map((s) => (
                                    <span
                                        key={s.studentId}
                                        className={`px-3 py-1 rounded-full font-medium ${
                                            s.status === 'present' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                        }`}
                                    >
                                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                                    </span>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 mt-2">
                                Marked by: {record.markedBy?.fullName || 'Unknown'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
