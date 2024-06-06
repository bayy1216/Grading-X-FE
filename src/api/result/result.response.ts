export interface ResultForInstructorResponse {
  resultInstructorResponses : Result[]
}

export interface Result {
  email: string;
  totalScore: number;
  totalWeightage: number;
  gradingResponseList: GradingAnswer[];
}

export interface GradingAnswer {
  answerId: number;
  query: string;
  answer: string;
  score: number;
}
