import style from "./CoursePage.module.css";
import CourseCreateModal from "../../../components/course/CourseCreateModal.tsx";
import {useState} from "react";
import {getCourses} from "../../../api/course/course.api.ts";
import {Button} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import { CoursesResponse} from "../../../api/course/course.response.ts";
import {useNavigate} from "react-router-dom";
import CourseItem from "../../../components/course/CourseItem.tsx";

export default function CoursePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data} = useQuery<CoursesResponse>({
    queryKey: ['dashboard', 'courses'],
    queryFn: getCourses,
    staleTime: 1000 * 60 * 5, // 5 minutes 동안 fresh data를 유지(fresh -> stale)
    gcTime: 1000 * 60 * 10, // 5 minutes 동안 garbage collection을 하지 않음. staleTime <= gcTime
  });

  const nav = useNavigate();

  const onClick = (id: number) => {
    console.log('click');
    nav(`/dashboard/course/${id}/exam`);
  }


  return (
    <div className={style.container}>
      <div className={style.currentClass}>
        {!isModalOpen &&
            <>
                {
                  data?.courseResponses.map((course) => (
                    <div className={style.gridItem} key={course.id}>
                      <CourseItem course={course} onClick={()=>onClick(course.id)} />
                    </div>
                  ))
                }
                <Button variant="contained" color="primary" onClick={
                  () => {
                    setIsModalOpen(true);
                  }
                }>Create a new course</Button>
            </>
        }
        {isModalOpen && <CourseCreateModal onCreate={
          course => {
            data?.courseResponses.push(course);
            setIsModalOpen(false);
          }
        }/>}
      </div>
    </div>
  );
}