import {Link, useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {ExamDetail} from "@/api/exam/exam.response.ts";
import {EXAMS, MINUTE_10, MINUTE_5} from "@/const/data.ts";
import {getExamDetailById} from "@/api/exam/exam.api.ts";
import dayjs from "dayjs";
import {Button} from "@/components/ui/button.tsx";

export default function ExamDetailPage() {
  const nav = useNavigate();
  const location = useLocation();

  const examId = parseInt(location.pathname.split("/").pop() || "0");
  console.log("exmmaID" + examId);

  const { data} = useQuery<ExamDetail, Object, ExamDetail, [_1:string, _2:number]>({
    queryKey: [EXAMS, examId],
    queryFn: getExamDetailById,
    staleTime: MINUTE_5,
    gcTime: MINUTE_10,
  });

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
          <Link to={`${location.pathname}/edit`} className="border-2 m-2 p-2" onClick={onEditButtonClick}>Edit</Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full p-5">
        <h2>Description</h2>
        <p>{data?.description}</p>

        <Button className="items-center mt-32" size={"default"} asChild>
          <Link to={`${location.pathname}/question-edit`}>문제 편집</Link>
        </Button>
      </div>

    </div>
  );
}