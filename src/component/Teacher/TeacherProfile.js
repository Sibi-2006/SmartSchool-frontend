import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTeacherToken } from '../../Storage';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import axios from 'axios';
import NavBar from './NavBar';
import Loading from '../Loading';

export default function TeacherProfile() {
    const { teacherId } =useParams();
    const token = getTeacherToken();
    const { baseUrl } = useContext(GlobalVariableContext);
    const [ teacher , setTeacher ] = useState({});
    const navigate = useNavigate();
    const [ loading , setLoading ] = useState(true);
    useEffect(() => {
        const fetchTeacher = async () => {
            if (!token) {
                navigate("/login/teachers");
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get(`${baseUrl}/create/getOneTeacher/by-Id/${teacherId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTeacher(res.data.teacher);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [baseUrl, token, navigate,teacherId]);
    console.log(teacher)
  return (
    <div>
      <NavBar />
        <div className="w-full md:w-3/4 md:fixed right-0 h-screen overflow-y-auto">
            {
                loading&&(
                    <Loading/>
                )
            }
            <div className='py-24 flex items-center justify-center flex-col gap-10 '>
                <h1 className=' text-3xl font-bold'><samp className=' text-primary'>{teacher.fullName}</samp> - Profile</h1>
                <div className=' w-3/4'>
                    <div className=' grid  grid-cols-1 md:grid-cols-2 gap-6'>
                        <Info label="Full Name" value={teacher.fullName} />
                        <Info label="Email" value={teacher.email} />
                        <Info label="Phone" value={teacher.phone} />
                        <Info label="Gender" value={teacher.gender} />
                        <Info label="DOB" value={teacher.dob} />
                        <Info label="Address" value={teacher.address} />

                        <Info label="Designation" value={teacher.designation} />
                        <Info label="Qualification" value={teacher.qualification} />
                        <Info label="Experience" value={teacher.experience + " Years"} />

                        <Info label="Joining Date" value={teacher.joiningDate} />
                        <Info label="Assigned Class" value={teacher.AssignedClass} />
                        <Info label="Salary" value={"₹ " + teacher.Salary} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
const Info = ({ label, value }) => {
  return (
    <div className='bg-gray-100 shadow-md rounded-md flex flex-col p-4'>
      <span className='text-sm text-gray-600'>{label}</span>
      <span className='text-dark font-bold text-lg'>{value}</span>
    </div>
  );
};
