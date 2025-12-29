import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentToken, getParentToken } from "../../Storage";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import axios from "axios";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Result() {
  const { examType, id, from } = useParams();
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalVariableContext);

  const token = from === "student" ? getStudentToken() : getParentToken();

  const [marks, setMarks] = useState([]);
  const [student, setStudent] = useState({});
  const [secondPassword, setSecondPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH MARKS ================= */
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        if (!token) {
          navigate(`/login/${from}`);
          return;
        }

        const res = await axios.get(
          `${baseUrl}/${from}/marks/${id}/${examType}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMarks(res.data.marks || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Server error");
      }
    };

    fetchMarks();
  }, [baseUrl, token, navigate, from, examType, id]);

  /* ================= FETCH STUDENT (PARENT ONLY) ================= */
  useEffect(() => {
    if (from !== "parent") return;

    const fetchStudent = async () => {
      try {
        if (!token) {
          navigate(`/login/${from}`);
          return;
        }

        const res = await axios.get(
          `${baseUrl}/${from}/get/student/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStudent(res.data.student);
      } catch (err) {
        toast.error(err.response?.data?.message || "Server error");
      }
    };

    fetchStudent();
  }, [baseUrl, token, navigate, from, id]);

  /* ================= CALCULATIONS ================= */
  const totalMarks = marks.reduce((sum, m) => sum + m.marks, 0);
  const totalMax = marks.reduce((sum, m) => sum + m.maxMarks, 0);

  const totalPercentage =
    totalMax > 0 ? ((totalMarks / totalMax) * 100).toFixed(2) : "0.00";

  const overallPass = marks.every(
    (m) => m.marks >= m.maxMarks * 0.35
  );

  /* ================= PDF DOWNLOAD ================= */
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`${examType} - Result`, 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Subject", "Marks", "Max Marks", "Percentage", "Status"]],
      body: marks.map((item) => {
        const percent = ((item.marks / item.maxMarks) * 100).toFixed(1);
        const pass = item.marks >= item.maxMarks * 0.35;
        return [
          item.subject,
          item.marks,
          item.maxMarks,
          `${percent}%`,
          pass ? "Pass" : "Fail",
        ];
      }),
    });

    doc.text(
      `Total Marks: ${totalMarks}/${totalMax}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(
      `Overall Percentage: ${totalPercentage}%`,
      14,
      doc.lastAutoTable.finalY + 18
    );
    doc.text(
      `Result: ${overallPass ? "PASS" : "FAIL"}`,
      14,
      doc.lastAutoTable.finalY + 26
    );

    doc.save(`${examType}_Result.pdf`);
  };

  /* ================= VALIDATION ================= */
  const isValid = () => {
    let temp = "";

    if (!secondPassword.trim()) {
      temp = "Enter second password";
    }

    setError(temp);

    if (temp) {
      toast.error(temp);
      return false;
    }

    return true;
  };

  /* ================= VERIFY MARKS ================= */
  const VerifyMarks = async () => {
    if (!token) {
      navigate(`/login/${from}`);
      return;
    }

    if (!isValid()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${baseUrl}/parent/verify`,
        {
          student_Id: student._id,
          studentId: student.studentId,
          fullName: student.fullName,
          standard: student.standard,
          section: student.section,
          secondPassword: secondPassword,
          examType:examType,
          result: overallPass ? "PASS" : "FAIL"
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Marks verified successfully ✅");
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="p-4 pt-28 pb-36 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        {examType} - Results
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Marks</th>
              <th className="p-2 border">Max</th>
              <th className="p-2 border">Percentage</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((item) => {
              const percentage = (
                (item.marks / item.maxMarks) * 100
              ).toFixed(1);
              const pass = item.marks >= item.maxMarks * 0.35;

              return (
                <tr key={item._id} className="text-sm">
                  <td className="p-2 border capitalize">{item.subject}</td>
                  <td className="p-2 border">{item.marks}</td>
                  <td className="p-2 border">{item.maxMarks}</td>
                  <td className="p-2 border">{percentage}%</td>
                  <td
                    className={`p-2 border font-semibold ${
                      pass ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {pass ? "Pass" : "Fail"}
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr className="font-semibold bg-gray-50">
              <td className="p-2 border">Total</td>
              <td className="p-2 border">{totalMarks}</td>
              <td className="p-2 border">{totalMax}</td>
              <td className="p-2 border">{totalPercentage}%</td>
              <td
                className={`p-2 border ${
                  overallPass ? "text-green-600" : "text-red-600"
                }`}
              >
                {overallPass ? "PASS" : "FAIL"}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-6 flex justify-center">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Download PDF
          </button>
        </div>
      </div>

      {from === "parent" && (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-xl font-semibold mb-2">
            Parent Verification Required
          </h1>

          <label className="block text-sm font-medium mb-1">
            Second Password
          </label>

          <input
            type="password"
            placeholder="Enter second password"
            value={secondPassword}
            onChange={(e) => {
              setSecondPassword(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-2 border rounded-lg mb-2"
          />

          {error && (
            <p className="text-sm text-red-500 font-semibold">{error}</p>
          )}

          <button
            disabled={loading}
            onClick={VerifyMarks}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold mt-4 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify & Submit"}
          </button>
        </div>
      )}
    </div>
  );
}
