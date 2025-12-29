import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalVariableContext } from '../../../Context/GlobalVariable';
import { getParentToken } from '../../../Storage';
import axios from 'axios';

export default function OneStudentCertificateInParent() {
    const { cer_id } = useParams();
    const { baseUrl } = useContext(GlobalVariableContext);
    const token = getParentToken();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState({});
      const [message, setMessage] = useState("")
    
    useEffect(()=>{
        const fetchCertificate = async ()=>{
            try{
                if(!token){
                    navigate("login/parent");
                    return;
                };
                const res = await axios.get(`${baseUrl}/certificate/get/one-certificate/for/parent/${cer_id}`,{
                     headers: { Authorization: `Bearer ${token}` } 
                });
                setCertificate(res.data.certificate)
            }catch(err){
                setMessage("Something went wrong ❌");
                console.log(err);
            }
        }
        fetchCertificate();
    })
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-20">
            
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
        {
            certificate.status==="approved"&&(
                    <button
                    onClick={()=>navigate(`/certificate/${certificate.certificateName}/${certificate.student_Id}/${cer_id}`)}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
            
                >See the Certificate</button>
            )
        }{
            certificate.status==="rejected"&&(
                <h1
                  className="text-red-600  px-4 py-1.5 rounded-lg text-sm hover:text-red-700 transition"
            
                >Certificate was rejected!!!! </h1>
            )
        }
        {
            certificate.status==="pending"&&(
                <h1
                  className="text-yellow-600  px-4 py-1.5 rounded-lg text-sm hover:text-yellow-700 transition"
            
                >Waiting for admin to verfiy </h1>
            )
        }
            
    
            </div>
          </div>
        </div>
  )
}
// /certificate/:name/id/:cer_id