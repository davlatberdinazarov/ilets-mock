export type Question = {
  id: string;
  text: string;
  options: string[]; // 4 ta variant
  correctAnswer: number; // 0..3 index
};

export type AnswerPayload = {
  questionId: string;
  selectedIndex: number; // 0..3
};

export type SubmissionResult = {
  submissionId: string;
  score: number; // to'g'ri javoblar soni
  total: number;
  details: Array<{
    questionId: string;
    correct: boolean;
    correctIndex: number;
    selectedIndex: number;
  }>;
};