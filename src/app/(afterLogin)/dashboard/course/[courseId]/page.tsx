"use client";
import ExamItem from "@/app/(afterLogin)/dashboard/course/[courseId]/_component/ExamItem";
import style from "./page.module.css"
import {Exam} from "@/api/exam/exam.response";
import {useRouter} from "next/navigation";


type Props = {
  params: {
    courseId: string;
  }
};

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

export default function Page({params}: Props) {

  const router = useRouter();
  const onClick = (id: number) => {
    router.push(`/dashboard/course/${params.courseId}/exam/${id}`);
    console.log("Clicked");
  }



  return (
    <div className={style.container}>
      {
        sampleDatas.map((assignment) =>
          <div key={assignment.id} onClick={()=> onClick(assignment.id)} className={style.item}>
            <ExamItem exam={assignment} />
          </div>

        )
      }

    </div>
  )
}
