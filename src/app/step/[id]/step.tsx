/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import quiz from '@/quiz.json';
import { notFound, useRouter } from 'next/navigation';
import Option from '../../components/option';
import { useState } from 'react';

export default function Step({ id }: { id: string }) {
  const router = useRouter();
  const step = quiz.find((s) => String(s.id) === id);
  const countTotal = quiz.length;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  if (!step) {
    notFound();
  }

  // Track selected options when using multiple choices mode
  const handleOptionSelect = (optionId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedOptions(prev => [...prev, optionId]);
    } else {
      setSelectedOptions(prev => prev.filter(id => id !== optionId));
    }
  };
  
  const handleContinue = () => {
    if (step.toRedirect) {
      router.push(step.toRedirect);
    }
  };

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

      <h1 className='text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2'>
        {step.question}
      </h1>
      
      {step.subTitleQuestion && (
        <p className='text-center text-gray-600 mb-6'>
          {step.subTitleQuestion}
        </p>
      )}
      
      <div className='w-full'>
        {step.options.map((option) => (
          <Option 
            key={option.id} 
            option={option} 
            questionId={step.id}
            question={step.question}
            toRedirect={step.toRedirect}
            multipleChoices={step.multipleChoices}
            needContinueButton={step.needContinusBuuton}
            onOptionSelect={handleOptionSelect}
          />
        ))}
      </div>
      
      {step.needContinusBuuton && (
        <div className='w-full mt-6 flex justify-center'>
          <button
            onClick={handleContinue}
            disabled={step.multipleChoices && selectedOptions.length === 0}
            className={`px-8 py-3 rounded-full font-medium text-white ${step.multipleChoices && selectedOptions.length === 0 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}// Before
