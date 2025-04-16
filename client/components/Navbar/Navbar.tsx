import React from 'react'
import Link from 'next/link'

export default function Navbar({style}: {style?: string}) {
  return (
    <>
      <nav className={`${style}`} ></nav>
      <ul className='flex items-center gap-5 text-slate-800 font-medium'>
          <li className='hover:text-sky-500'><Link href="/">Beranda</Link></li>
          <li className='hover:text-sky-500'><Link href="/prediksi">Prediksi</Link></li>
          <li className='hover:text-sky-500'><Link href="/bantuan">Bantuan</Link></li>
      </ul>
    </>
  )
}
