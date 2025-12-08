import React from 'react';
import { useNavigate } from 'react-router-dom';

const DATA = [
  {
    title: "ADMIN",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, quos?",
  },
  {
    title: "TEACHERs",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, quos?",
  },
  {
    title: "STUDENTS",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, quos?",
  },
  {
    title: "PARENT",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, quos?",
  },
];

export default function ChooseTheUser() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6 bg-light min-h-screen overflow-y-auto">
      {DATA.map((data, index) => (
        <div
          key={index}
          className="child bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl p-6 w-72 text-center border-t-4 border-primary"
        >
          <h1 className="text-2xl font-bold text-primary mb-2">{data.title}</h1>
          <p className="text-gray-600 mb-4">{data.about}</p>
          <button className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={()=>navigate(`/login/${data.title.toLowerCase()}`)}
          >
            Go to {data.title} Login
          </button>
        </div>
      ))}
    </div>
  );
}
