import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ExamDetail} from "../../../../../api/exam/exam.response.ts";
import {EXAMS, MINUTE_10, MINUTE_5} from "../../../../../const/data.ts";
import {examStartGuestByExamId, getExamDetailById} from "../../../../../api/exam/exam.api.ts";
import {ExamTakeGuestRequest} from "../../../../../api/exam/exam.request.ts";
import dayjs from "dayjs";
import style from "./ExamDetailPage.module.css";
import {Input} from "@/components/ui/input.tsx";

export default function ExamDetailPage() {
  const nav = useNavigate();
  const location = useLocation();

  const examId = parseInt(location.pathname.split("/").pop() || "0");
  console.log("exmmaID" + examId);

  const [guestEmail, setGuestEmail] = useState<string>("");

  const { data} = useQuery<ExamDetail, Object, ExamDetail, [_1:string, _2:number]>({
    queryKey: [EXAMS, examId],
    queryFn: getExamDetailById,
    staleTime: MINUTE_5,
    gcTime: MINUTE_10,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestEmail(e.target.value);
  }

  const onTakeExam = () => {
    const req : ExamTakeGuestRequest  = {
      email: guestEmail,
    }
    examStartGuestByExamId(examId, req).then(
      (_) => {
        nav(`${location.pathname}/take?email=${guestEmail}`);
      }
    )
  }

  const onEditButtonClick = () => {
    nav(`${location.pathname}/edit`);
  }


  const startTime = dayjs(data?.startTime).format('YYYY-MM-DD HH:mm');
  const endTime = dayjs(data?.endTime).format('YYYY-MM-DD HH:mm');

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>{data?.name}</h1>
        <div className={style.data}>
          <div className={style.startTime}>
            {startTime}
          </div>
          <div className={style.endTime}>
            {endTime}
          </div>
          <button className={style.edit} onClick={onEditButtonClick}>Edit</button>
        </div>
      </div>
      <div className={style.content}>
        <h2>Description</h2>
        <p>{data?.description}</p>

        <Input
          name="email"
          value={guestEmail}
          onChange={handleInputChange}
        />
        <button className={style.startExam} onClick={onTakeExam}>
          Start Exam
        </button>
      </div>

    </div>
  );
}