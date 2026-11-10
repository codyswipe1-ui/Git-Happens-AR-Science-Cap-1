// Every call the app makes to the back end lives in this file.
// Screens import from here and never call fetch() themselves.
import { CellModel, Quiz, QuizAnswers, QuizSubmission } from '@/api/types';
import { CELL_MODELS } from '@/api/mock-data/cell-models';

// Set EXPO_PUBLIC_API_URL in .env.local.
// On a phone, use your Mac's network address (e.g. http://10.3.250.7:8000), not localhost.
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status} on ${path}: ${body}`);
  }
  return res.json() as Promise<T>;
}

// ---- Cell models: sample data until the back end has /models ----

export async function getCellModels(): Promise<CellModel[]> {
  return CELL_MODELS; // TODO: return request<CellModel[]>('/models');
}

export async function getCellModel(id: number): Promise<CellModel | undefined> {
  return CELL_MODELS.find((m) => m.id === id); // TODO: return request<CellModel>(`/models/${id}`);
}

// ---- Quizzes: real back end (backend/routes/quizzes.py) ----

export function getQuiz(quizId: string): Promise<Quiz> {
  return request<Quiz>(`/quizzes/${quizId}`);
}

export function submitQuiz(quizId: string, answers: QuizAnswers): Promise<QuizSubmission> {
  return request<QuizSubmission>(`/quizzes/${quizId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ answers }),
  });
}
