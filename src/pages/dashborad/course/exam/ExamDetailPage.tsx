import {ExamDetail} from "../../../../api/exam/exam.response.ts";
import style from "./ExamDetailPage.module.css";
import {useLocation, useNavigate} from "react-router-dom";

const detailData : ExamDetail = {
  id: 1,
  name: "Assignment 1",
  startTime: "2021-09-01T00:00:00Z",
  endTime: "2021-09-08T00:00:00Z",
  description: "This is a description",
}

export default function ExamDetailPage() {
  const nav = useNavigate();
  const location = useLocation();

  const onTakeExam = () => {
    nav(`${location.pathname}/take`);
  }

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

        <button className={style.startExam} onClick={onTakeExam}>
          Start Exam
        </button>
      </div>

    </div>
  );
}