import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type QuizSelection = {
  questionId: number;
  question: string;
  optionId: string;
  optionText: string;
  selected?: boolean;
};

type QuizStore = {
  selections: QuizSelection[];
  addSelection: (selection: QuizSelection) => void;
  clearSelections: () => void;
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      selections: [],
      addSelection: (selection) =>
        set((state) => {
          // For multiple choices, we need to handle different logic
          if (selection.selected !== undefined) {
            // For multiple choice, check if we already have this specific option
            const existingIndex = state.selections.findIndex(
              (item) => item.questionId === selection.questionId && item.optionId === selection.optionId
            );
            
            if (existingIndex >= 0) {
              // If this option exists and is being unselected, remove it
              if (!selection.selected) {
                const newSelections = state.selections.filter((_, i) => i !== existingIndex);
                return { selections: newSelections };
              } else {
                // Just update the existing selection
                const newSelections = [...state.selections];
                newSelections[existingIndex] = selection;
                return { selections: newSelections };
              }
            } else if (selection.selected) {
              // If it's a new selected option, add it
              return { selections: [...state.selections, selection] };
            } else {
              // If it's a new unselected option, do nothing
              return { selections: state.selections };
            }
          } else {
            // For single choice questions, replace any existing answer for this question
            const existingIndex = state.selections.findIndex(
              (item) => item.questionId === selection.questionId
            );
            
            if (existingIndex >= 0) {
              // Replace existing answer
              const newSelections = [...state.selections];
              newSelections[existingIndex] = selection;
              return { selections: newSelections };
            } else {
              // Add new answer
              return { selections: [...state.selections, selection] };
            }
          }
        }),
      clearSelections: () => set({ selections: [] }),
    }),
    {
      name: 'quiz-store', // name for localStorage
    }
  )
);
