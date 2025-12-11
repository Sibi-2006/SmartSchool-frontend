import React from 'react'

export default function OtpPage({ name }) {
  return (
    <div className='flex items-center justify-center flex-col border-4 bg-green-100 border-secondary gap-3 p-4 rounded-xl shadow-lg'>
      <p className='text-lg text-center'>
        Hello <span className='font-bold text-primary'>{name}</span>,  
        the OTP service is currently unavailable as it requires a paid SMS gateway  
        (Fast2SMS / MSG91 / Twilio).  
        This feature will be added in a future update.  
        Thank you for your patience.
      </p>
    </div>
  )
}
