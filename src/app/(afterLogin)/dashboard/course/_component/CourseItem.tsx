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
      </div>

      <div>
        <p>{course.startDate}</p>
        <p>{course.endDate}</p>
      </div>
    </div>
  );
}