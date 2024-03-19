export interface QuestionCreateRequest {
  query: string;
  index: number;
  weightage: number;
  answers: string[];
  keywords: string[];
}

export interface QuestionUpdateRequest {
  query: string;
  index: number;
  weightage: number;
  answers: string[];
  keywords: string[];
}