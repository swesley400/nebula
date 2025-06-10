/* eslint-disable @typescript-eslint/no-explicit-any */
import quiz from '@/quiz.json';
import Step from './step';

export async function generateStaticParams() {
    return quiz.map((step) => ({
      id: String(step.id),
    }));
}

// For static pages, we can use a synchronous component
// but we need to pass the params safely to the client component
export default function StepPage({ params }: { params: { id: string } }) {
    // This ensures the static content is safely pre-rendered
    // The client component (Step) will handle the dynamic behavior
    return <Step id={params.id} />;
}