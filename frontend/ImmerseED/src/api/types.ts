// Shared data shapes for the app.
// Keep these matched to what the back end returns.

// A cell students can explore (from the team's CellModel class diagram)
export type CellModel = {
  id: number;
  name: string;
  modelType: 'animal' | 'plant' | 'bacteria' | 'specialized';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  partsCount: number;
  sceneId?: string;  // ReactVision Studio scene (phone AR)
  modelUrl?: 'animal' | 'plant' | 'human'; // Local GLB key in public/models
  quizId?: string;   // matches a quiz on the back end, e.g. 'animal-cell'
  locked?: boolean;
};

// ---- Quizzes: shapes returned by backend/routes/quizzes.py ----

export type QuizQuestion = {
  id: number;
  question: string;
  choices: Record<string, string>; // { A: 'Nucleus', B: '...' }
};

export type Quiz = {
  id: string;
  title: string;
  questions: QuizQuestion[]; // answers are NOT included (graded on the server)
};

// What the student picked: question id -> choice letter, e.g. { 1: 'B', 2: 'C' }
export type QuizAnswers = Record<number, string>;

export type QuizResult = {
  question_id: number;
  selected_answer: string | null;
  correct_answer: string;
  is_correct: boolean;
  explanation: string;
};

export type QuizSubmission = {
  quiz_id: string;
  score: number;
  total: number;
  percentage: number;
  results: QuizResult[];
};
