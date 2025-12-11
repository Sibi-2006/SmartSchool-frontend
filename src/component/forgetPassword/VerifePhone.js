import React from 'react'

export default function VerifePhone({phone,name,nextBtn,previousBtn}) {
  return (
    <div className=' flex items-center justify-center flex-col border-4 bg-green-100 border-secondary gap-3 p-3 rounded-lg shadow-lg w-11/12 md:w-1/2'>
      <p className="text-xl text-dark w-3/4">
        Dear <span className="text-primary font-bold underline">{name}</span>, we need to verify your phone number. 
        An OTP has been sent to: 
        <span className="font-bold text-primary underline">{phone}</span>. 
        Click “Next” to continue with verification.
        </p>


      <div className='flex flex-row gap-5 p-4'>
        <button className=" bg-red-500 text-light rounded-lg py-2 px-3 hover:bg-red-400 font-bold text-2xl w-1/2" onClick={previousBtn}>back</button>
        <button className="bg-green-500 text-light rounded-lg py-2 px-3 hover:bg-green-400 font-bold text-2xl w-1/2" onClick={nextBtn}>Next</button>
      </div>
    </div>
  )
}
