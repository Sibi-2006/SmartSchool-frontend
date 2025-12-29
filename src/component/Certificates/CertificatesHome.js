import React, { useContext, useEffect, useRef, useState } from "react";
import { getParentToken } from "../../Storage";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalVariableContext } from "../../Context/GlobalVariable";
import axios from "axios";
import html2pdf from "html2pdf.js";

import Bonafide from "./Bonafide";
import Study from "./Study";
import Character from "./Character";
import Fee from "./Fee";
import Attendance from "./Attendance";

export default function CertificatesHome() {
  const { id, cer_id, cer_name } = useParams();
  const token = getParentToken();
  const navigate = useNavigate();
  const { baseUrl, appName } = useContext(GlobalVariableContext);

  const [certificate, setCertificate] = useState({});
  const [student, setStudent] = useState({});
  const [attendance, setAttendance] = useState([]);
  const pdfRef = useRef();

  // -------- Fetch Certificate --------
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        if (!token) return navigate("/login/parent");

        const res = await axios.get(
          `${baseUrl}/certificate/get/one-certificate/for/parent/${cer_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCertificate(res.data.certificate);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCertificate();
  }, [token, cer_id, baseUrl, navigate]);

  // -------- Fetch Student --------
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!token) return navigate("/login/parent");

        const res = await axios.get(
          `${baseUrl}/parent/get/student/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStudent(res.data.student);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudent();
  }, [token, id, baseUrl, navigate]);

  //------attendance-------
  useEffect(() => {
  const fetchAttendance = async () => {
    try {
      if (!token) {
        navigate("/login/parent");
        return;
      }

      // wait until student data is available
      if (!student.section || !student.standard) return;

      const res = await axios.get(
        `${baseUrl}/attendance/one-student/${student.section}/${student.standard}/${id}/parent`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAttendance(res.data.data);
    } catch (err) {
      console.log("from attendance:", err);
    }
  };

  fetchAttendance();
}, [
  token,
  navigate,
  baseUrl,
  id,
  student.section,
  student.standard
]);


  // -------- Save as PDF --------
  const saveAsPDF = () => {
    const element = pdfRef.current;

    const opt = {
      margin: 0.5,
      filename: `${cer_name}_${student.rollNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
    {/* Bonafide */}
      {cer_name === "bonafide" && (
        <Bonafide
          certificate={certificate}
          student={student}
          appName={appName}
          saveAsPDF={saveAsPDF}
          pdfRef={pdfRef}
        />
      )}

      {/* Study */}
      {cer_name === "study" && (
        <Study
          certificate={certificate}
          student={student}
          appName={appName}
          saveAsPDF={saveAsPDF}
          pdfRef={pdfRef}
        />
      )}

      {/* character */}
      {cer_name === "character" && (
            <Character
                certificate={certificate}
                student={student}
                appName={appName}
                saveAsPDF={saveAsPDF}
                pdfRef={pdfRef}
            />
            )}

            {/* Fee */}
            {cer_name === "fee" && (
            <Fee
                certificate={certificate}
                student={student}
                appName={appName}
                saveAsPDF={saveAsPDF}
                pdfRef={pdfRef}
            />
            )}


            {cer_name === "attendance" && (
                <Attendance
                    attendanceData={attendance}
                    student={student}
                    appName={appName}
                    saveAsPDF={saveAsPDF}
                    pdfRef={pdfRef}
                />
)}



    </div>
  );
}
