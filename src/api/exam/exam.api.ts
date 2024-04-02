import {Exam, ExamDetail} from "./exam.response.ts";
import {QueryFunction} from "@tanstack/react-query";
import {axiosClient} from "../AxiosClient.ts";

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
  const response = await axiosClient.get(`/api/exam-content/course/${courseId}`);
  return response.data.examContents;
}

export const getExamDetail: QueryFunction<ExamDetail, [_1:string, _2:string, number]>
 = async ({queryKey}): Promise<ExamDetail> => {
  const [_1, _2, examId] = queryKey;

  return exams.find(exam => exam.id === examId) as ExamDetail;
}