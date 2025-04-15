import React from 'react'
import Link from 'next/link'

export default function Navbar({style}: {style?: string}) {
  return (
    <>
      <nav className={`${style}`} ></nav>
      <ul className='flex items-center gap-5 text-slate-800 font-medium'>
          <li className='hover:text-sky-500'><Link href="/">Home</Link></li>
          <li className='hover:text-sky-500'><Link href="/predict">Predict</Link></li>
          <li className='hover:text-sky-500'><Link href="/about">About</Link></li>
      </ul>
    </>
  )
}
