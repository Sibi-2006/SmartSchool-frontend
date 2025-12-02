import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTeacherToken } from '../../Storage';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import axios from 'axios';
import NavBar from './NavBar';
import Loading from '../Loading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile() {
    const { teacherId } =useParams();
    const token = getTeacherToken();
    const { baseUrl } = useContext(GlobalVariableContext);
    const [ teacher , setTeacher ] = useState({});
    const navigate = useNavigate();
    const [ loading , setLoading ] = useState(true);
    const [error,setError] = useState({});
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
                toast.error("Error fetching teacher!");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [baseUrl, token, navigate,teacherId]);

    const handleChange = (e)=>{
        setTeacher({
            ...teacher,[e.target.name]:e.target.value
        });
    }

    const isValid=()=>{
        const temp = {};
        if(!teacher?.fullName.trim()) temp.fullName="Name is required";
        if(!teacher?.email.trim()) temp.email="email is required";
        if(!teacher?.dob.trim()) temp.dob="dob is required";
        if(!teacher?.address.trim()) temp.address="address is required";
        if(!teacher?.gender.trim()) temp.gender="gender is required";
        if(!teacher?.phone.trim()) temp.phone="phone is required";

        setError(temp);
        return Object.keys(temp).length===0;
    }

    const handleSubmit =async (e) =>{
        e.preventDefault();
        if(!isValid()) return;
        try{
            if (!token) {
                navigate("/login/teachers");
                return;
            }
             await axios.patch(`${baseUrl}/create/update/teacher/${teacher._id}`,
                {
                    fullName:teacher.fullName,
                    email:teacher.email ,
                    phone:teacher.phone , 
                    dob:teacher.dob , 
                    gender:teacher.gender , 
                    address:teacher.address
                },{
                    headers: { Authorization: `Bearer ${token}`}
                }
            );
            toast.success("Updated teacher Successfully! 🎉");
            
            setTimeout(() => {
                navigate(`/teacher/profile/${teacherId}`)
            }, 2000);

        }catch(err){
            toast.error("Error on  update teache !!");
            console.log(err);
            return;
        }
    }
  return (
    <div>
      <NavBar />
              <div className="w-full md:w-3/4 md:fixed right-0 h-screen overflow-y-auto">
              <ToastContainer position="top-center" autoClose={1500} />
                  {
                      loading&&(
                          <Loading/>
                      )
                  }
                  <div className='py-24 flex items-center justify-center flex-col gap-10 min-h-screen'>
                    <form 
                    onSubmit={handleSubmit}
                        className='flex flex-col w-11/12 md:w-2/4 bg-gray-200 rounded-lg shadow-md py-3 px-2'
                    >   <h1 className=' text-3xl font-bold text-secondary text-center'>Edit Profile </h1>
                        <label className=' font-bold text-sm text-gray-900'>Name : </label>
                        <input type="text" className='form-input mb-5' placeholder='Name' name='fullName' value={teacher.fullName} onChange={(e) => handleChange(e)}/>
                        {error.fullName&&<p className=' text-red-400 font-bold text-sm'>{error.fullName}</p>}

                        <label className=' font-bold text-sm text-gray-900'>Email : </label>
                        <input type="email" className='form-input mb-5' placeholder='Email' name='email' value={teacher.email} onChange={(e) => handleChange(e)}/>
                        {error.email&&<p className=' text-red-400 font-bold text-sm'>{error.email}</p>}

                        <label className=' font-bold text-sm text-gray-900'>Phone : </label>
                        <input type="text" className='form-input mb-5' placeholder='Phone' name='phone' value={teacher.phone} onChange={(e) => handleChange(e)}/>
                        {error.phone&&<p className=' text-red-400 font-bold text-sm'>{error.phone}</p>}

                        <label className=' font-bold text-sm text-gray-900'>DOB : </label>
                        <input type="date" className='form-input mb-5' name='dob' value={teacher.dob} onChange={(e) => handleChange(e)}/>
                        {error.dob&&<p className=' text-red-400 font-bold text-sm'>{error.dob}</p>}

                        <label className=' font-bold text-sm text-gray-900'>Gender : </label>
                        <select className='form-input mb-5' name="gender" value={teacher.gender} onChange={(e) => handleChange(e)} >
                            <option value="">select</option>
                            <option value="male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {error.gender&&<p className=' text-red-400 font-bold text-sm'>{error.gender}</p>}

                        <label className=' font-bold text-sm text-gray-900'>Address : </label>
                        <textarea className=' form-input h-40 mb-5' placeholder='Address' name='address' value={teacher.address} onChange={(e) => handleChange(e)}></textarea>
                        {error.address&&<p className=' text-red-400 font-bold text-sm'>{error.address}</p>}

                        <button type="submit" className='main-btn md:w-1/2 w-3/4'>Update</button>
                    </form>
                  </div>
            </div>
    </div>
  )
}