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

export interface QuestionsResponse{
  questions: Question[];
}