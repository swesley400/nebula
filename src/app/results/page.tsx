'use client';
import { useQuizStore } from '@/store/quizStore';
import Link from 'next/link';

export default function Results() {
  const selections = useQuizStore((state) => state.selections);
  const clearSelections = useQuizStore((state) => state.clearSelections);

  return (
    <div className='flex flex-col w-full max-w-md mx-auto p-4'>
      <h1 className='text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6'>
        Suas Respostas
      </h1>

      {selections.length > 0 ? (
        <>
          <div className='space-y-4'>
            {selections.map((selection, index) => (
              <div key={index} className='bg-gray-100 p-4 rounded-lg'>
                <h2 className='font-semibold text-gray-700'>{selection.question}</h2>
                <p className='mt-2 text-gray-600'>
                  <span className='font-medium'>Resposta:</span> {selection.optionText}
                </p>
              </div>
            ))}
          </div>

          <div className='mt-8 flex flex-col space-y-4'>
            <Link 
              href="/"
              className='bg-purple-500 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-purple-600 transition-colors'
            >
              Voltar ao Início
            </Link>
            
            <button
              onClick={() => clearSelections()}
              className='bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors'
            >
              Limpar Respostas
            </button>
          </div>
        </>
      ) : (
        <div className='text-center'>
          <p className='text-gray-600 mb-6'>Você não respondeu nenhuma pergunta ainda.</p>
          <Link 
            href="/"
            className='bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors'
          >
            Iniciar Quiz
          </Link>
        </div>
      )}
    </div>
  );
}
