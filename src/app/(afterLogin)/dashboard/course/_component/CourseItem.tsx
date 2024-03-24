import style from "@/app/(afterLogin)/dashboard/course/_component/courseItem.module.css";
import {Course} from "@/api/course/course.response";

type Props = {
  onClick: () => void;
  course: Course
}

export default function CourseItem({onClick, course}: Props) {

  return (
    <div className={style.container} onClick={onClick}>
      <div>
        <h2>{course.courseName}</h2>
        <p>클래스 설명</p>
      </div>

      <div>
        <h2>{course.startDate}</h2>
        <h2>{course.endDate}</h2>
      </div>
      <div>
        <h2>수강생</h2>
        <p>수강생 수</p>
      </div>
    </div>
  );
}