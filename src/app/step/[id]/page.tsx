/* eslint-disable @typescript-eslint/no-explicit-any */
import quiz from '@/quiz.json';
import Step from './step';

export async function generateStaticParams() {
    return quiz.map((step) => ({
      id: String(step.id),
    }));
}

export default function StepPage({ params }: { params: any }) {
    return <Step params={params} />; 
}