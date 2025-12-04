import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function TimeTableStru({
    standard,
    section,
    timeTable,
    from
}) {
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const navigate = useNavigate();
  return (
    <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Class {standard} - Section {section} Timetable</h1>

            {!timeTable || !timeTable.days ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="bg-white shadow-lg rounded-xl p-6">
                    {days.map((day) => (
                        <div key={day} className="mb-6">
                            <h2 className="text-xl font-semibold capitalize mb-3 border-b pb-1">{day}</h2>

                            {timeTable.days[day]?.length === 0 ? (
                                <p className="text-gray-500 text-sm">No classes</p>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 border">Subject</th>
                                            <th className="p-2 border">Teacher</th>
                                            <th className="p-2 border">Start</th>
                                            <th className="p-2 border">End</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeTable.days[day].map((item) => (
                                            <tr key={item._id} className="hover:bg-gray-50">
                                                <td className="p-2 border">{item.subject}</td>
                                                <td className="p-2 border">{item.teacher}</td>
                                                <td className="p-2 border">{item.startTime}</td>
                                                <td className="p-2 border">{item.endTime}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {
                from==="admin"&&(
                    <div className=" flex flex-row gap-3 items-center justify-around my-20 w-1/2">
                        <button className=" bg-red-500 text-light rounded-lg py-2 px-3 hover:bg-red-400 font-bold text-2xl w-1/2"
                        onClick={()=>navigate(`/admin/delete/time-table/${timeTable._id}/${section}/${standard}`)}
                        >Delete</button>
                        <button
                        className="bg-green-500 text-light rounded-lg py-2 px-3 hover:bg-green-400 font-bold text-2xl w-1/2" >Edit</button>
                    </div>
                )
            }
        </div>
  )
}
