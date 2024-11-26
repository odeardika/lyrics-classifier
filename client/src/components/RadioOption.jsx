import React, { useState } from 'react';

function RadioOption({className, data}) {
    

    const [radioOn , setRadioOn] = useState(0);

    const handleOnClick = (radioId) => {

        setRadioOn(radioId);
    }

    return (
    <div className={className}>
        {data.map((item, index) => (
            <div className='flex items-center gap-3' key={index} onClick={() => handleOnClick(item.id)}>
                <div className={`w-4 h-4 border rounded-full border-white flex justify-center items-center`}>
                    <div className={`bg-white rounded-full w-2 h-2 ${(item.id === radioOn) ? '' : 'hidden'}`}></div>
                </div>
                <label className='text-white text-lg sm:text-xl'>{item.label}</label>
            </div>
        ))}
    </div>
  )
}

export default RadioOption;