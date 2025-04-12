import React from 'react';
import Headers from '@components/Header/Header';

export default function page() {
  return (
    <div className=''>
        <Headers />

        <div className="flex flex-col items-center justify-center ">
            <h1 className='text-2xl text-sky-600 font-bold my-5'>Clasify Lyrics</h1>
                <form action="/predict" method="POST" className="flex flex-col items-center justify-center w-full md:w-3/4 px-6">
                    <textarea 
                        name="lyrics" 
                        placeholder="Enter lyrics here..." 
                        rows={10} 
                        className="w-full p-2 border border-gray-300 rounded-t-md" 
                    ></textarea>
                    <div className='w-full flex items-center border border-gray-300 border-t-0 p-4 justify-start bg-sky-100 rounded-b-md'>
                        <button 
                            type="submit" 
                            className="bg-sky-600 text-white p-2 rounded-md hover:bg-sky-700"
                        >
                            Predict
                        </button>
                    </div>
                </form>
        </div>
    </div>
  )
}
