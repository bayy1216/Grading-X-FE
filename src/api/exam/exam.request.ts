export interface ExamCreateRequest {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
}


export interface ExamUpdateRequest {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
}


export interface ExamSaveRequest {
  email: string;
  answers: MemberExamAnswer[];
}

export interface MemberExamAnswer {
  questionId: number;
  answer: string;
}

export interface ExamTakeGuestRequest {
  email: string;
}