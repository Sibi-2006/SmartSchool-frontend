import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalVariableContext } from "../../Context/GlobalVariable"
import axios from 'axios';
import ViewAllStudent from './ViewAllStudent';
export default function ViewDetails() {
    const { category } = useParams();
    const { baseUrl } = useContext(GlobalVariableContext);
    const [ users , setUsers ] = useState([])
    const token = localStorage.getItem("adminToken");
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchUser = async()=>{
            if (!token) {
                navigate("/login/admin");
                return;
            }
            try{
                const res = await axios.get(`${baseUrl}/adminlogin/get/allDetails/from/${category.toLowerCase()}`,{
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data.userData)
            }catch(err){
                console.log(err.message)
            }
        }
        fetchUser();
    },[baseUrl, category, token, navigate])
  return (
    <div className='flex'>
      {
        category.toLowerCase()==="student" && <ViewAllStudent users={users} />
      }
    </div>
  )
}
