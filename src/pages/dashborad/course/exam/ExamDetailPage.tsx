import {ExamDetail} from "../../../../api/exam/exam.response.ts";
import style from "./ExamDetailPage.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getExamDetailById} from "../../../../api/exam/exam.api.ts";

export default function ExamDetailPage() {
  const nav = useNavigate();
  const location = useLocation();

  const examId = parseInt(location.pathname.split("/").pop() || "0");

  const { data} = useQuery<ExamDetail, Object, ExamDetail, [_1:string, _2:string, _3:number]>({
    queryKey: ['dashboard', 'exam', examId],
    queryFn: getExamDetailById,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const onTakeExam = () => {
    nav(`${location.pathname}/take`);
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>{data?.name}</h1>
        <div className={style.data}>
          <div className={style.startTime}>
            {data?.startTime}
          </div>
          <div className={style.endTime}>
            {data?.endTime}
          </div>
        </div>
      </div>
      <div className={style.content}>
        <h2>Description</h2>
        <p>{data?.description}</p>

        <button className={style.startExam} onClick={onTakeExam}>
          Start Exam
        </button>
      </div>

    </div>
  );
}