import { ExamDetail, ExamsResponse} from "./exam.response.ts";
import {QueryFunction} from "@tanstack/react-query";
import {axiosClient} from "../AxiosClient.ts";
import {ExamCreateRequest, ExamSaveRequest, ExamUpdateRequest} from "./exam.request.ts";


export const getExamsByCourseId: QueryFunction<ExamsResponse, [_1:string, _2:string, number, _4:string]>
 = async ({queryKey}): Promise<ExamsResponse> => {
  const [_1, _2, courseId, _4] = queryKey;
  const response = await axiosClient.get(`/api/v1/course/${courseId}/exam-content`);
  return response.data;
}

export const getExamDetailById: QueryFunction<ExamDetail, [_1:string, _2:string, number]>
 = async ({queryKey}): Promise<ExamDetail> => {
  const [_1, _2, examId] = queryKey;

  const response = await axiosClient.get(`/api/v1/course/exam-content/${examId}`);
  return response.data;
}

export async function createExam(courseId: number, examCreateRequest: ExamCreateRequest) : Promise<number>{
  const resp = await axiosClient.post(`/api/v1/course/${courseId}/exam-content`, {
    ...examCreateRequest
  });
  return resp.data;
}

export async function updateExamDetail(examId: number, examUpdateRequest: ExamUpdateRequest){
  await axiosClient.put(`/api/v1/course/exam-content/${examId}`, {
    ...examUpdateRequest
  });
  return;
}



/**
 * 현재까지 풀은 문제 서버에 전송하기
 */
export async function saveExamAnswer(examId: number, examSaveRequest: ExamSaveRequest): Promise<void> {
  await axiosClient.post(`/api/v1/exam/${examId}/save`,{
    ...examSaveRequest
  });
  return;
}