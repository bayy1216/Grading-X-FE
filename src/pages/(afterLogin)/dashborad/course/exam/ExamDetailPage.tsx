import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ExamDetail} from "@/api/exam/exam.response.ts";
import {EXAMS, MINUTE_10, MINUTE_5} from "@/const/data.ts";
import {examStartGuestByExamId, getExamDetailById} from "@/api/exam/exam.api.ts";
import {ExamTakeGuestRequest} from "@/api/exam/exam.request.ts";
import dayjs from "dayjs";
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
    <div className="flex flex-col items-start justify-start w-full h-full">
      <div className="flex flex-row items-center justify-between w-full p-5 border-b border-gray-300">
        <h1>{data?.name}</h1>
        <div className="flex flex-row items-center">
          <div className="text-base font-medium mb-2 mr-5">
            {startTime}
          </div>
          <div className="text-base font-medium mb-2">
            {endTime}
          </div>
          <button className="border-2 m-2 p-2" onClick={onEditButtonClick}>Edit</button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full p-5">
        <h2>Description</h2>
        <p>{data?.description}</p>

        <Input
          name="email"
          value={guestEmail}
          onChange={handleInputChange}
        />
        <button className="flex flex-row items-center justify-center w-300 p-5 m-2 border border-gray-300" onClick={onTakeExam}>
          Start Exam
        </button>
      </div>

    </div>
  );
}