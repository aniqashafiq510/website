import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black'>
        {/* Divider */}
              <div className="border-t border-gray-700"></div>
        
              {/* Copyright */}
              <div className="mt-6 text-center text-gray-500 text-sm pb-3">
                &copy; {new Date().getFullYear()} WheelSpot. All rights reserved.
              </div>
    </footer>
  )
}

export default Footer