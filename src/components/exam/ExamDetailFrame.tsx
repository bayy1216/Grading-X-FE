
import style from "./ExamDetailFrame.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {TextField} from "@mui/material";
import {ExamDetail} from "../../api/exam/exam.response.ts";
import {examStartGuestByExamId, getExamDetailById} from "../../api/exam/exam.api.ts";
import {ExamTakeGuestRequest} from "../../api/exam/exam.request.ts";
import {DASHBOARD, EXAMS, MINUTE_10, MINUTE_5} from "../../const/data.ts";

export default function ExamDetailFrame() {
  const nav = useNavigate();
  const location = useLocation();

  const examId = parseInt(location.pathname.split("/").pop() || "0");
  console.log("exmmaID" + examId);

  const [guestEmail, setGuestEmail] = useState<string>("");

  const { data} = useQuery<ExamDetail, Object, ExamDetail, [_1:string, _2:string, _3:number]>({
    queryKey: [DASHBOARD, EXAMS, examId],
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

        <TextField
          name="email"
          label="Email"
          value={guestEmail}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <button className={style.startExam} onClick={onTakeExam}>
          Start Exam
        </button>
      </div>

    </div>
  );
}