import React from 'react';
import Image from 'next/image';
import heroImage from '@/public/assets/Hero.png';

function Hero() {
    return (
        <section className='flex flex-col items-center justify-center h-screen px-4 text-center bg-gradient-to-b from-slate-100 to-slate-50 lg:px-24 lg:flex-row lg:text-left lg:space-x-8'>
            <div className='flex flex-col gap-3 items-center lg:w-1/2 lg:items-start lg:space-y-4'>
                <h1 className='text-4xl font-bold text-slate-800 md:text-5xl lg:text-6xl'>Classify Emotion with Lyrics Classifier</h1>
                <div className='w-full lg:hidden'>
                    <Image
                        src={heroImage}
                        alt="Hero Image"
                        className='object-contain rounded-lg'
                        layout='intrinsic'
                        width={350}
                        height={400}
                    />
                </div>
                <p className='text-lg text-slate-600 md:text-xl'>A web application for classifying song lyrics using machine learning.</p>
                <a href="#features" className='px-6 py-3 text-white bg-sky-600 rounded-lg hover:bg-sky-700'>Get Started</a>
            </div>
            <div className='hidden lg:flex lg:w-1/2 lg:justify-center'>
                <Image
                    src={heroImage}
                    alt="Hero Image"
                    className='object-contain rounded-lg'
                    layout='intrinsic'
                    width={350}
                    height={400}
                />
            </div>
        </section>
    )
}

export default Hero