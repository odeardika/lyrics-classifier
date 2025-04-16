import React from 'react';
import Image from 'next/image';
import heroImage from '@/public/assets/Hero.png';

function Hero() {
    return (
        <div className='flex flex-col items-center text-start justify-center px-4 md:text-center bg-gradient-to-b from-slate-100 to-slate-50 lg:px-24 lg:flex-row lg:text-left lg:space-x-8 md:h-screen'>
            <div className='flex flex-col gap-3 items-start lg:w-1/2 lg:items-start lg:space-y-4'>
                <h1 className='text-3xl font-bold text-sky-600 md:text-4xl lg:text-5xl'>Klasifikasikan Emosi Lagu dengan Lyrics Classifier</h1>
                <div className='w-full lg:hidden'>
                    <Image
                        src={heroImage}
                        alt="Gambar Hero"
                        className='object-contain rounded-lg'
                        layout='intrinsic'
                        width={350}
                        height={400}
                    />
                </div>
                <p className='text-lg text-justify font-light text-slate-500 md:text-base'>Aplikasi web ini memanfaatkan pembelajaran mesin untuk menganalisis dan mengklasifikasikan lirik lagu. Dengan memproses konten teks dari lirik, aplikasi ini dapat mengidentifikasi pola, tema, atau genre, memberikan wawasan kepada pengguna tentang karakteristik lagu.</p>
                <a href="/predict" className='px-6 py-3 text-white bg-sky-600 rounded-lg hover:bg-sky-700'>Mulai Sekarang</a>
            </div>
            <div className='hidden lg:flex lg:w-1/2 lg:justify-center'>
                <Image
                    src={heroImage}
                    alt="Gambar Hero"
                    className='object-contain rounded-lg'
                    layout='intrinsic'
                    width={350}
                    height={400}
                />
            </div>
        </div>
    )
}

export default Hero;