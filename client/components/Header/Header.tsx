"use client";
import React from 'react';
import Image from 'next/image';
import icon from '@/public/Logo.svg';
import Navbar from '@components/Navbar/Navbar';
import HamburgerButton from '@components/Button/HamburgerButton/HamburgerButton';
import Sidebar from '@components/Sidebar/Sidebar';
import Link from 'next/link';

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className='flex sticky top-0 z-50 bg-white items-center justify-between p-4 shadow-md  lg:px-24'>
        <Link href="/" className='flex items-center gap-2 text-xl font-medium text-slate-800'>
            <Image src={icon} alt="Logo" width={50} height={50} className='rounded-full' />
            <span>Pengklasifikasi Lirik</span>
        </Link>
        <div className=''>
          <div className='relative z-50'>
            <HamburgerButton onClick={handleToggle}/>
          </div>
          <Navbar style='hidden md:block'/>
          <Sidebar isOpen={isOpen} />
        </div>
    </header>
  )
}

export default Header;