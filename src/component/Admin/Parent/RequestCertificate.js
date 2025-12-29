import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getParentToken } from '../../../Storage'
import { GlobalVariableContext } from '../../../Context/GlobalVariable'
import axios from 'axios'

export default function RequestCertificate() {
  const { id } = useParams()
  const token = getParentToken()
  const { baseUrl } = useContext(GlobalVariableContext)
  const navigate = useNavigate()

  const [student, setStudent] = useState({})
  const [data, setData] = useState({
    certificateName: "",
    reason: ""
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  // fetch student
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!token) {
          navigate("/login/parent")
          return
        }

        const res = await axios.get(
          `${baseUrl}/parent/get/student/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        setStudent(res.data.student)
      } catch (err) {
        console.log(err)
      }
    }

    fetchStudent()
  }, [id, baseUrl, navigate, token])

  // input change
  const handleChanges = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setError("")
    setSuccess("")
  }

  // submit
  const handleSubmit = async () => {
    if (!token) {
      navigate("/login/parent")
      return
    }

    // frontend validation
    if (!data.certificateName) {
      setError("Please select a certificate type")
      return
    }

    if (!data.reason.trim()) {
      setError("Please enter a reason for requesting the certificate")
      return
    }

    try {
      setLoading(true)

      await axios.post(
        `${baseUrl}/certificate/add/cerificate-request`,
        {
          student_Id: student._id,
          fullName: student.fullName,
          standard: student.standard,
          section: student.section,
          certificateName: data.certificateName,
          reason: data.reason
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setSuccess("Certificate request sent successfully")
      setData({ certificateName: "", reason: "" })

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">

        <button
  onClick={() => navigate(-1)}
  className="text-sm text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-1"
>
  ← Back
</button>


        <h1 className="text-2xl font-semibold text-center mb-6">
          Certificate Request
        </h1>

        {/* Error Message */}
        {error && (
          <p className="mb-3 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p className="mb-3 text-sm text-green-600 text-center">
            {success}
          </p>
        )}

        {/* Certificate Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Certificate
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="certificateName"
            value={data.certificateName}
            onChange={handleChanges}
          >
            <option value="">-- Select Certificate --</option>
            <option value="bonafide">Bonafide Certificate</option>
            <option value="study">Study Certificate</option>
            <option value="attendance">Attendance Certificate</option>
            <option value="character">Character Certificate</option>
            <option value="fee">Fee Paid Certificate</option>
          </select>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Reason for Request
          </label>
          <textarea
            rows="4"
            placeholder="Eg: For bank purpose / scholarship / college admission"
            name="reason"
            value={data.reason}
            onChange={handleChanges}
            className="w-full border rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          className={`w-full py-2 rounded-lg font-semibold transition 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          Note: Certificate will be issued after school verification.
        </p>
      </div>
    </div>
  )
}
