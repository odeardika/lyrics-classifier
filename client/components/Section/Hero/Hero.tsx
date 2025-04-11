import React from 'react';
import Image from 'next/image';
import heroImage from '@/public/assets/Hero.png';

function Hero() {
    return (
        <div className='flex flex-col items-center text-start justify-center px-4 md:text-center bg-gradient-to-b from-slate-100 to-slate-50 lg:px-24 lg:flex-row lg:text-left lg:space-x-8 md:h-screen'>
            <div className='flex flex-col gap-3 items-start lg:w-1/2 lg:items-start lg:space-y-4'>
                <h1 className='text-3xl font-bold text-sky-600 md:text-4xl lg:text-5xl'>Classify Emotion of Songs with Lyrics Classifier</h1>
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
                <p className='text-lg text-justify font-light text-slate-500 md:text-base'>This web application leverages machine learning to analyze and classify song lyrics. By processing the textual content of lyrics, the application can identify patterns, themes, or genres, providing users with insights into the characteristics of the songs.</p>
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
        </div>
    )
}

export default Hero;