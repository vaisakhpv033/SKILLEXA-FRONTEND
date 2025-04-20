'use client';
import React, { useEffect, useState } from 'react';

const DashboardClockCard = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='h-[250px] w-full rounded-[20px] bg-hero bg-cover'>
      <div className='flex h-full flex-col justify-between max-md:px-5 px-5 max-md:py-8 lg:py-11'>
        <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
          Instructor Dashboard
        </h2>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
          <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardClockCard;
