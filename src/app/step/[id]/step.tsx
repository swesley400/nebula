/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import quiz from '@/quiz.json';
import { notFound } from 'next/navigation';
import Option from '../../components/option';

export default function Step({ params }: { params: any }) {
  const step = quiz.find((s) => String(s.id) === params.id);
  const countTotal = quiz.length;

  if (!step) {
    notFound();
  }

  const progressPercentage = (Number(step.id) / countTotal) * 100;

  return (
    <div className='flex flex-col w-full max-w-md mx-auto p-4'>
      
      <div className='w-full mb-8'>
        <div className='flex justify-between items-center mb-1 text-sm'>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5}
            stroke="currentColor" 
            className="w-5 h-5 text-gray-400 cursor-pointer"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>

          <span className='font-semibold text-gray-600'>{step.title}</span>
          
          <span className='font-semibold text-purple-400'>{step.id}/{countTotal}</span>
        </div>
        
        <div className='w-full bg-purple-100 rounded-full h-1.5'>
          <div 
            className='bg-purple-500 h-1.5 rounded-full' 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <h1 className='text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6'>
        {step.question}
      </h1>
      
      <div className='w-full'>
        {step.options.map((option) => (
          <Option key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
}