import React, { useContext, useState } from "react";
import axios from "axios";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function CreateTimeTable() {
  const { baseUrl } = useContext(GlobalVariableContext);

  const [standard, setStandard] = useState("");
  const [section, setSection] = useState("");

  const navigate = useNavigate();

  const [day, setDay] = useState("monday");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!standard || !section) {
      alert("Select class & section bro 😭");
      return;
    }

    if (!subject || !teacher || !startTime || !endTime) {
      alert("Fill all fields bro 😭");
      return;
    }

    try {
      setLoading(true);
const token = localStorage.getItem("adminToken");
      

      const res = await axios.post(
        `${baseUrl}/timetable/add-new/for/${standard}/${section}`,
        {
          day,
          subject,
          teacher,
          startTime,
          endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPreview((prev) => [
        ...prev,
        { day, subject, teacher, startTime, endTime },
      ]);

      setSubject("");
      setTeacher("");
      setStartTime("");
      setEndTime("");

      alert("Added successfully bro 😎🔥");
      console.log("Updated timetable:", res.data);
    } catch (err) {
      console.log(err);
      alert("Error bro 😭");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-28 p-6 bg-white rounded-2xl shadow-lg">
      
      <NavBar/>
      <h2 className="text-2xl font-semibold mb-4">Create Timetable</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Standard</label>
          <select
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Select Standard</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Teacher</label>
          <input
            type="text"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            placeholder="Enter teacher name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={submitHandler}
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add to Timetable"}
        </button>

        <button
          onClick={() => {
            setPreview([]);
          }}
          className="px-4 py-2 rounded-lg bg-gray-100 border hover:bg-gray-200"
        >
          Clear Preview
        </button>
      </div>

      <h3 className="text-lg font-medium mt-6 mb-3">Preview</h3>

      {preview.length === 0 ? (
        <p className="text-sm text-gray-500">No entries yet bro...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border">Day</th>
                <th className="px-4 py-2 border">Subject</th>
                <th className="px-4 py-2 border">Teacher</th>
                <th className="px-4 py-2 border">Start</th>
                <th className="px-4 py-2 border">End</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((item, i) => (
                <tr key={i} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border capitalize">{item.day}</td>
                  <td className="px-4 py-2 border">{item.subject}</td>
                  <td className="px-4 py-2 border">{item.teacher}</td>
                  <td className="px-4 py-2 border">{item.startTime}</td>
                  <td className="px-4 py-2 border">{item.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


