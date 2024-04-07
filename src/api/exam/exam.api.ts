import {Exam, ExamDetail} from "./exam.response.ts";
import {QueryFunction} from "@tanstack/react-query";
import {axiosClient} from "../AxiosClient.ts";
import {ExamSaveRequest} from "./exam.request.ts";

const exams = [
  {
    id: 1,
    name: "무역의 이해 1",
    description: "무역의 이해 1 시험입니다.",
    startTime: "2021-09-01T00:00:00Z",
    endTime: "2021-09-08T00:00:00Z",
  },
  {
    id: 2,
    name: "자연과 역사 2",
    description: "자연과 역사 2 시험입니다.",
    startTime: "2021-09-01T00:00:00Z",
    endTime: "2021-09-08T00:00:00Z",
  },
  {
    id: 3,
    name: "자바 프로그래밍 3",
    description: "자바 프로그래밍 3 시험입니다.",
    startTime: "2021-09-01T00:00:00Z",
    endTime: "2021-09-08T00:00:00Z",
  }
]


export const getExams: QueryFunction<Exam[], [_1:string, _2:string, number]>
 = async ({queryKey}): Promise<Exam[]> => {
  const [_1, _2, courseId] = queryKey;
  const response = await axiosClient.get(`/api/v1/exam-content/course/${courseId}`);
  return response.data.examContents;
}

export const getExamDetail: QueryFunction<ExamDetail, [_1:string, _2:string, number]>
 = async ({queryKey}): Promise<ExamDetail> => {
  const [_1, _2, examId] = queryKey;

  return exams.find(exam => exam.id === examId) as ExamDetail;
}


/**
 * 시험 시작
 */
export async function examStartGuest(examId: number): Promise<void> {
  await axiosClient.post(`/api/v1/exam/${examId}`);
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