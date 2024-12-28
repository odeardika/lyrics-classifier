import React, { useState } from 'react'
import DropdownMenu from './components/DropdownMenu'
import RadioOption from './components/RadioOption'
import { predict, searchAndPredict } from './api/post'
export default function App() {
  const radioButton = [
    {label: 'Cari Lagu', isOn: true, id: 1},
    {label: 'Masukan Lirik', isOn: false, id: 2},
  ]
  
  const [currentInput, setCurrentInput] = useState(2)
  const [result, setResult] = useState('')
  const [model, setModel] = useState()
  const [lyric, setlyric] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [errorSelectedModel, setErrorSelectedModel] = useState(false);

  const handleOnClick = (radioId) => {
    setCurrentInput(radioId);
  }

  const handleErrorSelectedModel = () => {
    if (model === undefined) {
      setErrorSelectedModel(true);
      console.log(model)
      return true;
    }
    else {
      setErrorSelectedModel(false);
      console.log(model)
      return false;
    }
  }

  const handleKeyDownSearch = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      e.target.blur();
      setResult('');

      if (handleErrorSelectedModel()) {
        return;
      }

      const data = {
        query: searchQuery,
        model : model
      }
      searchAndPredict(data).then((res) => {
        if (res.status === 404) {
          if (res.message === 'lyric not found') {
            setResult(res.message)
          }
        }
        else {
          setResult(res.emotion)
        }
      })
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.target.blur();
      setResult('');
      const isModelSelected = handleErrorSelectedModel();
      if (isModelSelected) {
        return;
      }

      const data = {
        lyric: lyric,
        model: model
      }
      console.log("running")
      
      predict(data).then((res) => {
        if (res.status === 404) {
          if (res.message === 'lyric not found') {
        setResult(res.message)
          }
        }
        else {
          setResult(res.emotion)
        }
      })
    }
  }

  const handleModel = (model) => {
    setModel(model)
  }

  return (
    <div className='flex flex-col text-white px-4 pt-20 h-screen gap-10 items-center'>
        <h1 className='text-5xl font-geist font-medium mb-8'>Song Classifier</h1>

        <form action="" className='flex flex-col sm:w-2/4'>
          
            <RadioOption className='flex flex-row mb-8 justify-center gap-4' data={radioButton} handleRadio={handleOnClick}/>
          
            <div className={`text-red-800 ${errorSelectedModel ? '' : 'hidden'}`}> * Tolong Pilih Model Terlebih Dahulu</div>
            <DropdownMenu onChange={handleModel}/>

            {currentInput === 1 ? 
            <input type="text" className='text-gray-50 p-3 bg-zinc-900 border border-zinc-700 rounded-md' placeholder='Masukan Nama Lagu dan Artis' onKeyDown={handleKeyDownSearch} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/> 
            : <textarea name="" id="" onKeyDown={handleKeyDown} rows={8} placeholder='Masukan Lirik Lagu' className='text-gray-50 p-3 bg-zinc-900 border border-zinc-700 rounded-md' value={lyric} onChange={(e) => setlyric(e.target.value)}></textarea>}
            
            {(result === 1) && <div className='bg-green-800 p-3 rounded-md mt-4'>Hasil: Lagu ini adalah lagu yang bahagia</div>}
            {(result === 0) && <div className='bg-red-800 p-3 rounded-md mt-4'>Hasil: Lagu ini adalah lagu yang sedih</div>}
            {(result === 'lyric not found') && <div className='bg-blue-800 p-3 rounded-md mt-4'>Lirik tidak ditemukan pada database</div>}
        </form>
    </div>
  )
}
