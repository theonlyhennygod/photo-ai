import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
        <label htmlFor={name} className='block text-[#666e75] text-[14px] font-medium'>{labelName}</label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className='mt-2 block w-full px-4 py-2 rounded-md border border-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6469ff] focus:border-transparent'
        />
        {isSurpriseMe && (
            <button
            type='button'
            className='mt-2 font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'
            onClick={handleSurpriseMe}
            >
            Surprise Me
            </button>
        )}
    </div>
  )
}

export default FormField