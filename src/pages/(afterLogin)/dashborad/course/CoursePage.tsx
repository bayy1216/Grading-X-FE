import style from "./CoursePage.module.css";
import {getCourses} from "../../../../api/course/course.api.ts";
import {Button} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {CoursesResponse} from "../../../../api/course/course.response.ts";
import {useNavigate} from "react-router-dom";
import CourseItem from "../../../../components/course/CourseItem.tsx";
import {COURSES, DASHBOARD, MEMBER, MINUTE_5} from "../../../../const/data.ts";

export default function CoursePage() {

  const {data} = useQuery<CoursesResponse>({
    queryKey: [MEMBER, DASHBOARD, COURSES],
    queryFn: getCourses,
    staleTime: MINUTE_5, // 5 minutes 동안 fresh data를 유지(fresh -> stale)
  });

  const nav = useNavigate();

  const onClick = (id: number) => {
    console.log('click');
    nav(`/dashboard/course/${id}/exam`);
  }


  return (
    <div className={style.container}>
      <div className={style.currentClass}>
        {
          data?.courseResponses.map((course) => (
            <div className={style.gridItem} key={course.id}>
              <CourseItem course={course} onClick={() => onClick(course.id)}/>
            </div>
          ))
        }
        <Button variant="contained" color="primary" onClick={
          () => {
            //setIsModalOpen(true);
            nav('/dashboard/course/create');
          }
        }>Create a new course</Button>
      </div>
    </div>
  );
}