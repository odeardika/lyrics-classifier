import React, { useState } from 'react'
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DropdownMenu({onChange}) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentModel, setCurrentModel] = useState('Pilih Model');

  const data = [
    {label: 'Support Vector Machine', id: 1},
    {label: 'Naive Bayes', id: 2},
  ]

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }

  const handleClick = (model) =>{
    setCurrentModel(model.label);
    onChange(model.id);
  }


  return (
    <div className='bg-zinc-900 border border-zinc-700 rounded-md mb-8' onClick={handleOpen}>
      <div className='p-3 flex justify-between'>
        <label htmlFor="" className='flex gap-2 items-center'>
          {currentModel}
        </label>
        <label htmlFor=""><ChevronDownIcon className="w-5 h-5 ml-2" /></label>
      </div>

      {isOpen && (
        <div className="absolute sm:w-[49%] bg-white divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {data.map((item, index) => (
              <div key={index} className='px-4 py-2 hover:bg-gray-100 text-gray-700' onClick={() => handleClick(item)}>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
