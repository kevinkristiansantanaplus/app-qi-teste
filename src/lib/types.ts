// Tipos para o aplicativo QI Test

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'logic' | 'pattern' | 'numeric' | 'abstract';
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  iqScore: number;
  profile: string;
  profileDescription: string;
  completedAt: Date;
}

export interface TestState {
  currentQuestion: number;
  answers: UserAnswer[];
  startTime: Date;
  isCompleted: boolean;
  isPaid: boolean;
}

export type AppScreen = 'home' | 'test' | 'preview' | 'payment' | 'result';