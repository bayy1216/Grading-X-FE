import {axiosClient} from "../AxiosClient.ts";
import {QuestionEditResponse, QuestionsResponse} from "./question.response.ts";
import {QuestionCreateRequest, QuestionUpdateRequest} from "./question.request.ts";
import {QueryFunction} from "@tanstack/react-query";

// export async function getQuestionsByExamId(examContentId: number): Promise<QuestionsResponse> {
//   const res
//     = await axiosClient.get(`/api/v1/course/exam-content/${examContentId}/question`);
//   return res.data;
// }

export const getQuestionsByExamIdForUpdate: QueryFunction<QuestionEditResponse, [_1: string, number]>
  = async ({queryKey}) => {
  const [_1, examContentId] = queryKey;
  const res = await axiosClient.get(`/api/v1/course/exam-content/${examContentId}/instructor/question`);
  return res.data;
}

export async function createQuestion(examContentId: number, request: QuestionCreateRequest): Promise<void> {
  const res
    = await axiosClient.post(`/api/v1/course/exam-content/${examContentId}/question`, {
    ...request
  });
  return res.data;
}

//문제 수정
export async function updateQuestion(request: QuestionUpdateRequest): Promise<number> {
  const res
    = await axiosClient.put("/api/v1/course/exam-content/question", {
    ...request
  });
  return res.data;
}

export const getQuestionsByExamIdForSolve: QueryFunction<QuestionsResponse, [_1: string, number]>
  = async ({queryKey}) => {
  const [_1, examContentId] = queryKey;
  const res = await axiosClient.get(`/api/v1/course/exam-content/${examContentId}/student/question`);
  return res.data;
}

export async function createQuestionByAI(file : FormData) : Promise<QuestionAnswerResponse>{

  const res = await fetch('http://43.201.130.60:8000/upload/', {
    method: 'POST',
    body: file,
  });
  return await res.json();
}

export interface QuestionAnswerResponse{
  questions_answers : QuestionsAnswers[];
}

export interface QuestionsAnswers{
  문제 : string;
  답안 : string;
}