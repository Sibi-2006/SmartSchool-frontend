import React, { useContext, useEffect, useState } from 'react'
import { GlobalVariableContext } from '../../Context/GlobalVariable'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'

export default function CertificateRequest() {
  const { baseUrl } = useContext(GlobalVariableContext)
  const token = localStorage.getItem("adminToken")
  const navigate = useNavigate()

  const [certificate, setCertificate] = useState([])
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!token) {
        navigate("/login/admin")
        return
      }

      try {
        const res = await axios.get(
          `${baseUrl}/certificate/get/all-certificates`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setCertificate(res.data.certificates)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCertificates()
  }, [baseUrl, navigate, token])

  // 🔢 Status counts
  const pendingCount = certificate.filter(c => c.status === "pending").length
  const approvedCount = certificate.filter(c => c.status === "approved").length
  const rejectedCount = certificate.filter(c => c.status === "rejected").length

  // 🔍 Filter logic
  const filteredCertificates =
    filterType === "all"
      ? certificate
      : certificate.filter(c => c.certificateName === filterType)

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-20">
      <NavBar />

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Certificate Requests
      </h1>

      {/* 📊 Status Summary */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl text-center font-semibold">
          Pending: {pendingCount}
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center font-semibold">
          Approved: {approvedCount}
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-xl text-center font-semibold">
          Rejected: {rejectedCount}
        </div>
      </div>

      {/* 🔽 Certificate Filter */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-end">
        <select
          className="border px-4 py-2 rounded-lg text-sm"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
            <option value="all">All Certificates</option>
            <option value="bonafide">Bonafide Certificate</option>
            <option value="study">Study Certificate</option>
            <option value="attendance">Attendance Certificate</option>
            <option value="character">Character Certificate</option>
            <option value="fee">Fee Paid Certificate</option>
        </select>
      </div>

      {/* 📄 Certificate List */}
      {filteredCertificates.length === 0 ? (
        <p className="text-center text-gray-500">
          No certificate requests found
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredCertificates.map((cer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* Student Info */}
              <div>
                <h2 className="text-lg font-semibold">{cer.fullName}</h2>
                <p className="text-sm text-gray-600">
                  Class: {cer.standard} - {cer.section}
                </p>
                <p className="text-sm text-gray-600 capitalize">
                  Certificate: {cer.certificateName}
                </p>
              </div>

              {/* Status + Action */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      cer.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : cer.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {cer.status}
                </span>

                <button
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
                  onClick={() => navigate(`/admin/certificate/${cer._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
