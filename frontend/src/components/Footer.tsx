import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 py-12">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-4xl text-gray-100 font-extrabold tracking-tight">
          Stay Reserve
        </span>
        <span className="text-gray-200 font-medium tracking-tight flex gap-8">
          <p className="cursor-pointer hover:text-gray-300 transition-colors duration-300">
            Privacy Policy
          </p>
          <p className="cursor-pointer hover:text-gray-300 transition-colors duration-300">
            Terms of Service
          </p>
        </span>
      </div>
    </div>
  )
}

export default Footer