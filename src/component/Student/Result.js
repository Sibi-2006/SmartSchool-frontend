import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getStudentToken } from '../../Storage';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import axios from 'axios';

export default function Result() {
    const { examType , id } = useParams();
    const [marks , setMarks] = useState([]);
    const token = getStudentToken();
    const navigate = useNavigate();
    const { baseUrl } = useContext(GlobalVariableContext);

    useEffect(()=>{
        const fetchMarks = async ()=>{
            try{
                if(!token){
                    navigate("/login.students");
                    return;
                }

                const res = await axios.get(`${baseUrl}/student/marks/${id}/${examType}`,{
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMarks(res.data.marks);
            }catch(err){
                console.log(err)
            }
        }

        fetchMarks();
    })
  return (
  <div className='p-4 max-w-3xl mx-auto flex items-center justify-center flex-col min-h-screen'>
    <h1 className='text-2xl font-semibold mb-4 text-center'>
      {examType} - Results
    </h1>

    <div className='bg-white shadow-lg rounded-xl p-4 '>
      <table className='w-full border-collapse '>
        <thead>
          <tr className='bg-gray-100 text-left'>
            <th className='p-2 border'>Subject</th>
            <th className='p-2 border'>Marks</th>
            <th className='p-2 border'>Max</th>
            <th className='p-2 border'>Percentage</th>
            <th className='p-2 border'>Status</th>
          </tr>
        </thead>

        <tbody>
          {marks.map((item) => {
            const percentage = ((item.marks / item.maxMarks) * 100).toFixed(1);
            const pass = item.marks >= item.maxMarks * 0.35; // 35% pass

            return (
              <tr key={item._id} className='text-sm'>
                <td className='p-2 border capitalize'>{item.subject}</td>
                <td className='p-2 border'>{item.marks}</td>
                <td className='p-2 border'>{item.maxMarks}</td>
                <td className='p-2 border'>{percentage}%</td>
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
      </table>
    </div>
  </div>
);

}
