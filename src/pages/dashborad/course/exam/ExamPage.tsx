import {useLocation, useNavigate} from "react-router-dom";
import style from "./ExamPage.module.css";
import ExamItem from "../../../../components/exam/ExamItem.tsx";
import {Exam} from "../../../../api/exam/exam.response.ts";
import {getExams} from "../../../../api/exam/exam.api.ts";
import {useQuery} from "@tanstack/react-query";
import ExamHeader from "../../../../components/exam/ExamHeader.tsx";
import {useState} from "react";

export default function ExamPage() {
  const nav = useNavigate();
  const location = useLocation();
  //dashboard/course/1/exam 에서 1추출
  const courseId = parseInt(location.pathname.split("/")[3] || "0");



  const { data} = useQuery<Exam[], Object, Exam[], [_1:string, _2:string, _3:number]>({
    queryKey: ['dashboard', 'exams', courseId],
    queryFn: getExams,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const onClick = (id: number) => {
    nav(`${location.pathname}/${id}`);
    console.log("Clicked");
  }

  const [examTitle, setExamTitle] = useState('');
  const onSearch = () => {
    console.log("Search");
    //useQuery를 다시 요청함
  }

  return (
    <div className={style.container}>
      <ExamHeader examTitle={examTitle} setExamTitle={(t)=>setExamTitle(t)} onSearch={onSearch}/>
      {
        data?.map((assignment) =>
          <ExamItem key={assignment.id} exam={assignment} onclick={()=> onClick(assignment.id)}/>
        )
      }
    </div>
  );
}