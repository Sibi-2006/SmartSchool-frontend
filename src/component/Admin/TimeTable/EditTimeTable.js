import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalVariableContext } from "../../../Context/GlobalVariable";

export default function EditTimeTable() {
  const { standard, section } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const { baseUrl } = useContext(GlobalVariableContext);

  const [timeTable, setTimeTable] = useState({}); // important: object, not array
  const [loading, setLoading] = useState(true);

  // Fetch timetable
  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        if (!token) {
          navigate("/login/admin");
          return;
        }

        const res = await axios.get(
          `${baseUrl}/timetable/oneClass/from-admin/${standard}/${section}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTimeTable(res.data.timetable);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchTimeTable();
  }, [baseUrl, navigate, token, section, standard]);

  if (loading) return <h2>Loading...</h2>;
  if (!timeTable.days) return <h2>No timetable found</h2>;

  // Update timetable
  const updateTimeTable = async () => {
    try {
      await axios.put(
        `${baseUrl}/timetable/edit/${timeTable._id}`,
        timeTable,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Timetable updated successfully!");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // Input field UI
  const inputStyle = {
    padding: "6px",
    marginRight: "10px",
    marginBottom: "10px",
    border: "1px solid #aaa",
    borderRadius: "4px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Edit Timetable - {timeTable.standard} {timeTable.section}
      </h1>

      {Object.keys(timeTable.days).map((day) => (
        <div
          key={day}
          style={{
            marginTop: "30px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>{day.toUpperCase()}</h2>

          {timeTable.days[day].length === 0 && (
            <p style={{ color: "gray" }}>No periods for this day</p>
          )}

          {timeTable.days[day].map((period, index) => (
            <div
              key={period._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <input
                style={inputStyle}
                type="text"
                placeholder="Subject"
                value={period.subject}
                onChange={(e) => {
                  const updated = { ...timeTable };
                  updated.days[day][index].subject = e.target.value;
                  setTimeTable(updated);
                }}
              />

              <input
                style={inputStyle}
                type="text"
                placeholder="Teacher"
                value={period.teacher}
                onChange={(e) => {
                  const updated = { ...timeTable };
                  updated.days[day][index].teacher = e.target.value;
                  setTimeTable(updated);
                }}
              />

              <input
                style={inputStyle}
                type="time"
                value={period.startTime}
                onChange={(e) => {
                  const updated = { ...timeTable };
                  updated.days[day][index].startTime = e.target.value;
                  setTimeTable(updated);
                }}
              />

              <input
                style={inputStyle}
                type="time"
                value={period.endTime}
                onChange={(e) => {
                  const updated = { ...timeTable };
                  updated.days[day][index].endTime = e.target.value;
                  setTimeTable(updated);
                }}
              />
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={updateTimeTable}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Save Changes
      </button>
    </div>
  );
}
