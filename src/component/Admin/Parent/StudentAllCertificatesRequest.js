import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getParentToken } from '../../../Storage';
import { GlobalVariableContext } from '../../../Context/GlobalVariable';
import axios from 'axios';

export default function StudentAllCertificatesRequest() {
    const { id } = useParams();
    const token = getParentToken();
    const navigate = useNavigate();
    const [certificate,setCertificate] = useState([]);
    const { baseUrl } = useContext(GlobalVariableContext);

    useEffect(()=>{
        const fetchCertificates = async()=>{
            try{
                if(!token){
                    navigate("/login/parent");
                    return;
                }
                const res = await axios.get(`${baseUrl}/certificate/get/one-student/all-certificates/${id}`,{
                    headers:{Authorization:`Bearer ${token}`}
                });
                setCertificate(res.data.certificates)
                
            }catch(err){
                console.log(err);
            }
        }
        fetchCertificates();
    },[token,navigate,id,baseUrl])
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-20">
        
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Certificate Requests
          </h1>


       {certificate.length === 0 ? (
        <p className="text-center text-gray-500">
          No certificate requests found
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {certificate.map((cer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* Student Info */}
              <div>
                <h2 className="text-lg font-semibold">
                  {cer.fullName}
                </h2>
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
                  onClick={() => navigate(`/parent/certificate/${cer._id}`)}
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
