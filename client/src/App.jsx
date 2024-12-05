import React, { useState } from 'react'
import DropdownMenu from './components/DropdownMenu'
import RadioOption from './components/RadioOption'

export default function App() {
  const radioButton = [
    {label: 'Cari Lagu', isOn: true, id: 1},
    {label: 'Masukan Lirik', isOn: false, id: 2},
  ]
  
  const [currentInput, setCurrentInput] = useState(2)
  const [result, setResult] = useState('')

  const handleOnClick = (radioId) => {
    setCurrentInput(radioId);
  }


  return (
    <div className='flex flex-col text-white px-4 pt-20 h-screen gap-10 items-center'>
        <h1 className='text-5xl font-geist font-medium mb-8'>Song Classifier</h1>

        <form action="" className='flex flex-col sm:w-2/4'>
          
            <RadioOption className='flex flex-row mb-8 justify-center gap-4' data={radioButton} handleRadio={handleOnClick}/>
          
            <DropdownMenu />

            {currentInput === 1 ? <input type="text" className='text-gray-50 p-3 bg-zinc-900 border border-zinc-700 rounded-md' placeholder='Masukan Nama Lagu dan Artis'/> : <textarea name="" id="" rows={8} className='text-gray-50 p-3 bg-zinc-900 border border-zinc-700 rounded-md' placeholder='Masukan Lirik Lagu'></textarea>}
            
            {(result === 1) && <div className='bg-green-800 p-3 rounded-md mt-4'>Hasil: Lagu ini adalah lagu yang bahagia</div>}
            {(result === 0) && <div className='bg-red-800 p-3 rounded-md mt-4'>Hasil: Lagu ini adalah lagu yang sedih</div>}
        </form>
    </div>
  )
}
