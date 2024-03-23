import AssignmentItem from "@/app/(afterLogin)/dashboard/course/[courseId]/_component/AssignmentItem";
import style from "./page.module.css"
import {Assignment} from "@/api/assignment/assignment.response";


type Props = {
  params: {
    classId: string;
  }
};

const sampleData: Assignment = {
  id: 1,
  name: "Assignment 1",
  startTime: "2021-10-10",
  endTime: "2021-10-20"
}

export default function Page({params} : Props) {

  return (
    <div className={style.container}>
      <AssignmentItem assignment={sampleData} />
      <AssignmentItem assignment={sampleData} />
      <AssignmentItem assignment={sampleData} />
    </div>
  )
}
