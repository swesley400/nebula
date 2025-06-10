import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type QuizSelection = {
  questionId: number;
  question: string;
  optionId: string;
  optionText: string;
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
          // Check if we already have an answer for this question
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
        }),
      clearSelections: () => set({ selections: [] }),
    }),
    {
      name: 'quiz-store', // name for localStorage
    }
  )
);
