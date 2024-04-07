import style from "./CourseItem.module.css";
import {Course} from "../../api/course/course.response.ts";

type Props = {
  onClick: () => void;
  course: Course
}

export default function CourseItem({onClick, course}: Props) {

  return (
    <div className={style.container} onClick={onClick}>
      <div>
        <h3>{course.courseName}</h3>
      </div>

      <div>
        <p>{course.startDate} - {course.endDate}</p>
        <p>Instructor: {course.instructor.name}</p>
      </div>
    </div>
  );
}