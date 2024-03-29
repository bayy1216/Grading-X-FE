import {Exam} from "../../../api/exam/exam.response.ts";
import style from "./CourseDetailPage.module.css";
import ExamItem from "../../../components/exam/ExamItem.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const sampleDatas: Exam[] = [
  {
    id: 1,
    name: "Assignment 1",
    startTime: "2021-09-01T00:00:00Z",
    endTime: "2021-09-08T00:00:00Z",
  },
  {
    id: 2,
    name: "Assignment 2",
    startTime: "2021-09-01T00:00:00Z",
    endTime: "2021-09-08T00:00:00Z",
  },
  {
    id: 3,
    name: "Assignment 3",
    startTime: "2021-09-01T00:00:00Z",
    endTime: "2021-09-08T00:00:00Z",
  }
]

export default function CourseDetailPage() {
  const nav = useNavigate();
  const location = useLocation();
  const onClick = (id: number) => {
    nav(`${location.pathname}/exam/${id}`);
    console.log("Clicked");
  }

  return (
    <div className={style.container}>
      {
        sampleDatas.map((assignment) =>
          <ExamItem key={assignment.id} exam={assignment} onclick={()=> onClick(assignment.id)}/>
        )
      }

    </div>
  )
}