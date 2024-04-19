import {axiosClient} from "../AxiosClient.ts";
import {Criteria, QuestionsResponse} from "./question.response.ts";
import {
  QuestionCreateRequest,
  QuestionUpdateRequest
} from "./question.request.ts";
import {QueryFunction} from "@tanstack/react-query";

// export async function getQuestionsByExamId(examContentId: number): Promise<QuestionsResponse> {
//   const res
//     = await axiosClient.get(`/api/v1/course/exam-content/${examContentId}/question`);
//   return res.data;
// }

export const getQuestionsByExamId: QueryFunction<QuestionsResponse, [_1: string, number]>
  = async ({queryKey}) => {
  const [_1, examContentId] = queryKey;
  const res = await axiosClient.get(`/api/v1/course/exam-content/${examContentId}/question`);
  return res.data;
}

export async function createQuestion(examContentId: number, request: QuestionCreateRequest): Promise<number> {
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

export async function getCriteria(questionId: number): Promise<Criteria> {
  const res
    = await axiosClient.get(`/api/v1/course/exam-content/question/${questionId}/criteria`);
  return res.data;
}