import React from 'react'
import DropdownMenu from './components/DropdownMenu'
import RadioOption from './components/RadioOption'

export default function App() {
  const radioButton = [
    {label: 'Cari Lagu', isOn: false, id: 1},
    {label: 'Masukan Lirik', isOn: false, id: 2},
  ]


  return (
    <div className='flex flex-col text-white px-4 pt-20 h-screen gap-10 items-center'>
        <h1 className='text-5xl font-geist font-medium mb-8'>Song Classifier</h1>

        <form action="" className='flex flex-col sm:w-2/4'>
          
            <RadioOption className='flex flex-row mb-8 justify-center gap-4' data={radioButton} />
          
            <DropdownMenu />
          <input type="text" className='text-gray-50 p-3 bg-zinc-900 border border-zinc-700 rounded-md' placeholder='Masukan Nama Lagu dan Artis'/>
        </form>
    </div>
  )
}
