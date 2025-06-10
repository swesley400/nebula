'use client';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import Image from 'next/image';
import { useState } from 'react';

type OptionProps = {
  option: { id: string; text: string; icon: string };
  questionId: number;
  question: string;
  toRedirect: string;
  multipleChoices?: boolean;
  needContinueButton?: boolean;
  onOptionSelect?: (optionId: string, isSelected: boolean) => void;
};

export default function Option({ option, questionId, question, toRedirect, multipleChoices, needContinueButton, onOptionSelect }: OptionProps) {
    const router = useRouter();
    const addSelection = useQuizStore((state) => state.addSelection);
    const [selected, setSelected] = useState(false);
    
    const handleOptionClick = () => {
        // For multiple choice questions, toggle selection state
        if (multipleChoices) {
            const newSelectedState = !selected;
            setSelected(newSelectedState);
            
            // Communicate selection to parent component
            if (onOptionSelect) {
                onOptionSelect(option.id, newSelectedState);
            }
            
            // Save the selection to the store for tracking responses
            addSelection({
                questionId,
                question,
                optionId: option.id,
                optionText: option.text,
                selected: newSelectedState
            });
        } else {
            // For single choice, just add and navigate immediately
            addSelection({
                questionId,
                question,
                optionId: option.id,
                optionText: option.text
            });
            
            // Only navigate if not using continue button
            if (!needContinueButton) {
                router.push(toRedirect);
            }
        }
    };
    
    return (
        <div 
            onClick={handleOptionClick}
            className={`flex items-center p-4 my-2 ${selected ? 'bg-purple-200' : 'bg-gray-100'} rounded-2xl shadow-sm cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out`}
        >
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full mr-4">
                {option.icon.includes('/elements/') ? (
                    <Image 
                        src={option.icon} 
                        alt={option.text} 
                        width={24} 
                        height={24} 
                    />
                ) : (
                    <span className="text-2xl">{option.icon}</span>
                )}
            </div>
            <div>
                <h2 className="text-gray-800 font-medium">{option.text}</h2>
            </div>
        </div>
    );
}