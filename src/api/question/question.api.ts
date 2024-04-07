import {axiosClient} from "../AxiosClient.ts";
import {Criteria, Question} from "./question.response.ts";
import {
  QuestionCreateRequest,
  QuestionUpdateRequest
} from "./question.request.ts";

export async function getQuestionsByExamId(examContentId: number): Promise<Question[]> {
  const res
    = await axiosClient.get(`/api/v1/course/exam-content/${examContentId}/question`);
  return res.data.questions;
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

export async function getCriteria(questionId: number): Promise<Criteria[]> {
  const res
    = await axiosClient.get(`/api/v1/course/exam-content/question/${questionId}/criteria`);
  return res.data;
}