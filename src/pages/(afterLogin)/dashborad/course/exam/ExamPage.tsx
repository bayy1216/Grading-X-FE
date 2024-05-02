import {Link, useLocation} from "react-router-dom";
import ExamItem from "../../../../../components/exam/ExamItem.tsx";
import { ExamsResponse} from "@/api/exam/exam.response.ts";
import {getExamsByCourseId} from "@/api/exam/exam.api.ts";
import {useQuery} from "@tanstack/react-query";
import ExamHeader from "../../../../../components/exam/ExamHeader.tsx";
import {useState} from "react";
import {COURSES, DASHBOARD, EXAMS, MINUTE_10, MINUTE_5} from "@/const/data.ts";

export default function ExamPage() {
  const location = useLocation();
  //dashboard/course/1/exam 에서 1추출
  const courseId = parseInt(location.pathname.split("/")[3] || "0");



  const { data} = useQuery<ExamsResponse, Object, ExamsResponse, [_1:string, _2:string, _3:number, _4:string]>({
    queryKey: [DASHBOARD, COURSES, courseId, EXAMS],
    queryFn: getExamsByCourseId,
    staleTime: MINUTE_5,
    gcTime: MINUTE_10,
  });



  const [examTitle, setExamTitle] = useState('');
  const onSearch = () => {
    console.log("Search");
    //useQuery를 다시 요청함
  }

  return (
    <div className="flex flex-col items-start justify-start w-full h-full overflow-y-auto">
      <ExamHeader examTitle={examTitle} setExamTitle={(t)=>setExamTitle(t)} onSearch={onSearch}/>
      {
        data?.examContents.map((assignment) =>
          <Link className="w-full" to={`${location.pathname}/${assignment.id}`} key={assignment.id}>
            <ExamItem key={assignment.id} exam={assignment}/>
          </Link>
        )
      }
    </div>
  );
}