import style from "./CoursePage.module.css";
import CourseItems from "../../../components/course/CourseItems.tsx";
export default function CoursePage() {
  return (
    <div className={style.container}>
      <div className={style.currentClass}>
        <CourseItems/>
      </div>
    </div>
  );
}