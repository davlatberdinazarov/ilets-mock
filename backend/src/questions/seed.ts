import { Question } from '../common/types';
import { randomUUID } from 'crypto';

export const seedQuestions = (): Question[] => [
  {
    id: randomUUID(),
    text: 'IELTS Reading: "The Earth revolves around the _____."',
    options: ['Moon', 'Sun', 'Mars', 'Jupiter'],
    correctAnswer: 1,
  },
  {
    id: randomUUID(),
    text: 'IELTS Listening: What is the synonym of "assist"?',
    options: ['Help', 'Ignore', 'Delay', 'Refuse'],
    correctAnswer: 0,
  },
  {
    id: randomUUID(),
    text: 'IELTS Reading: Choose the correct spelling.',
    options: ['Definately', 'Definitely', 'Definetely', 'Defenitely'],
    correctAnswer: 1,
  },
];