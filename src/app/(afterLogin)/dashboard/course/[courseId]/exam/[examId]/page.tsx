import {ExamDetail} from "@/api/exam/exam.response";
import style from "./page.module.css"

const detailData : ExamDetail = {
  id: 1,
  name: "Assignment 1",
  startTime: "2021-09-01T00:00:00Z",
  endTime: "2021-09-08T00:00:00Z",
  description: "This is a description",
}
type Props = {
  params: {
    examId: string;
  }
};


export default function Page({params}: Props) {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>{detailData.name}</h1>
        <div className={style.data}>
          <div className={style.startTime}>
            {detailData.startTime}
          </div>
          <div className={style.endTime}>
            {detailData.endTime}
          </div>
        </div>
      </div>
      <div className={style.content}>
        <h2>Description</h2>
        <p>{detailData.description}</p>

        <button className={style.startExam}>
          Start Exam
        </button>
      </div>

    </div>
  );
}