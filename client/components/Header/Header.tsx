"use client";
import React from 'react';
import Image from 'next/image';
import icon from '@/public/Logo.svg';
import Navbar from '@components/Navbar/Navbar';
import HamburgerButton from '@/components/Button/HamburgerButton/HamburgerButton';

function Header() {
  return (
    <header className='flex items-center justify-between p-4 shadow-md  lg:px-24'>
        <a href="#" className='flex items-center gap-2 text-xl font-medium text-slate-800'>
            <Image src={icon} alt="Logo" width={50} height={50} className='rounded-full' />
            <span>Lyrics Classifier</span>
        </a>
        <div className=''>
          <HamburgerButton onClick={() => {}}/>
          <Navbar style='hidden md:block'/>
        </div>
    </header>
  )
}

export default Header