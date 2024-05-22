export interface QuestionCreateRequest {
  questions: QuestionCreateModel[];
}

export interface QuestionCreateModel {
  query: string;
  index: number;
  weightage: number;
  answer: string;
  keywords: string[];
}

export interface QuestionUpdateRequest {
  questions: QuestionUpdateModel[];
}

export interface QuestionUpdateModel {
  id: number;
  query: string;
  index: number;
  weightage: number;
  answer: string;
  keywords: string[];
}