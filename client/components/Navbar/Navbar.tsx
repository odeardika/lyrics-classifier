import React from 'react'

export default function Navbar({style}: {style?: string}) {
  return (
    <nav className={`${style}`} >
        <ul className='flex items-center gap-5 text-slate-800 font-medium'>
            <li className='hover:text-sky-500'><a href="/">Home</a></li>
            <li className='hover:text-sky-500'><a href="/coming-soon">Predict</a></li>
            <li className='hover:text-sky-500'><a href="/coming-soon">About</a></li>
        </ul>
    </nav>
  )
}
