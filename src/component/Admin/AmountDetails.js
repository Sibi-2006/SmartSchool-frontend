import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalVariableContext } from '../../Context/GlobalVariable';
import axios from 'axios';

export default function AmountDetails() {
    const [amount, setAmount] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("adminToken");
    const { baseUrl } = useContext(GlobalVariableContext);

    useEffect(() => {
        const fetchAmount = async () => {
            try {
                if (!token) {
                    navigate("/login/admin");
                    return;
                }
                const res = await axios.get(`${baseUrl}/adminlogin/amount/details`,{
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAmount(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAmount();
    }, [baseUrl,token,navigate]);

    if (!amount) 
        return <h2 className="text-center text-xl mt-10 font-semibold text-gray-600">Loading…</h2>;

    return (
        <div className="max-w-3xl mx-auto mt-20 px-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Amount Details
            </h1>

            {/* GRID */}
            <div className="grid grid-cols-1 gap-6">

                {/* Teacher Salary */}
                <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">Teacher Salary - pre month</h2>
                    <p className="text-2xl font-bold text-green-600">
                        ₹ {amount.teacher.totalSalary}
                    </p>
                </div>

                {/* Total Fees */}
                <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">Total Fees</h2>
                    <p className="text-2xl font-bold text-indigo-600">
                        ₹ {amount.student.totalFees}
                    </p>
                </div>

                {/* Amount Paid */}
                <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">Amount Paid</h2>
                    <p className="text-2xl font-bold text-green-700">
                        ₹ {amount.student.amountPaid}
                    </p>
                </div>

                {/* Balance */}
                <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
                    <p className={`text-2xl font-bold ${amount.student.balance < 0 ? "text-red-600" : "text-yellow-600"}`}>
                        ₹ {amount.student.balance}
                    </p>
                </div>

            </div>
        </div>
    );
}
