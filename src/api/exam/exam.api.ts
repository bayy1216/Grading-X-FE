import {Exam} from "./exam.response.ts";

export async function getExams(): Promise<Exam[]>{
  return [
    {
      id: 1,
      name: "무역의 이해 1",
      startTime: "2021-09-01T00:00:00Z",
      endTime: "2021-09-08T00:00:00Z",
    },
    {
      id: 2,
      name: "자연과 역사 2",
      startTime: "2021-09-01T00:00:00Z",
      endTime: "2021-09-08T00:00:00Z",
    },
    {
      id: 3,
      name: "자바 프로그래밍 3",
      startTime: "2021-09-01T00:00:00Z",
      endTime: "2021-09-08T00:00:00Z",
    }
  ];
}