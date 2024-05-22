export interface QuestionResult {
  answer: string;
  score: number;
}

export interface Criteria {
  answers: string[];
  keywords: string[];
}

export interface Question {
  id: number;
  query: string;
  index: number;
  weightage: number;
}

export interface QuestionEdit {
  id: number;
  query: string;
  index: number;
  weightage: number;
  answer: string;
  keywords: string[];
}

export interface QuestionEditResponse {
  questions: QuestionEdit[];
}

export interface QuestionsResponse{
  questions: Question[];
}