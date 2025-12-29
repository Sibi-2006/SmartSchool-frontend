import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalVariableContext } from '../../Context/GlobalVariable'
import axios from 'axios'
import NavBar from './NavBar'

export default function OneStudentCertificates() {
  const { id } = useParams()
  const { baseUrl } = useContext(GlobalVariableContext)
  const navigate = useNavigate()
  const token = localStorage.getItem("adminToken");
  const [message, setMessage] = useState("")


  const [certificate, setCertificate] = useState(null)

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        if (!token) {
          navigate("/login/admin")
          return
        }

        const res = await axios.get(
          `${baseUrl}/certificate/get/one-certificate/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        setCertificate(res.data.certificate) // ✅ important
      } catch (err) {
        console.log(err)
      }
    }

    fetchCertificate()
  }, [baseUrl, id, navigate, token])

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading certificate details...
      </div>
    )
  }
const changeStatus = async (status) => {
  if (!status || !token) return;

  try {
    const res = await axios.patch(
      `${baseUrl}/certificate/update/status/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCertificate(res.data.certificate); 
    setMessage(`Certificate ${status} successfully ✅`);
    setTimeout(() => {
      navigate("/admin/certificate-request")
    }, 2000);
  } catch (err) {
    console.log(err);
    setMessage("Something went wrong ❌");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-20">
        <NavBar/>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 mb-4"
        >
          ← Back
        </button>

        <h1 className="text-xl font-semibold mb-4 text-center">
          Certificate Details
        </h1>

        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {certificate.fullName}</p>
          <p><strong>Class:</strong> {certificate.standard} - {certificate.section}</p>
          <p className="capitalize">
            <strong>Certificate:</strong> {certificate.certificateName}
          </p>
          <p><strong>Reason:</strong> {certificate.reason}</p>

          <p>
            <strong>Status:</strong>
            <span
              className={`ml-2 px-2 py-0.5 rounded text-xs
                ${
                  certificate.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : certificate.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {certificate.status}
            </span>
          </p>

          <p className="text-xs text-gray-500">
            Requested on: {new Date(certificate.createdAt).toLocaleString()}
              </p>
              {message && (
      <p className="text-center text-sm font-medium text-blue-600 mb-3">
        {message}
      </p>
    )}

          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={()=>changeStatus("approved")}
            >
                Approve
            </button>

            <button className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            onClick={()=>changeStatus("rejected")}
            >
                Reject
            </button>
            </div>

        </div>
      </div>
    </div>
  )
}
