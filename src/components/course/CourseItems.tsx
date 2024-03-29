import {useQuery} from "@tanstack/react-query";
import {Course} from "../../api/course/course.response.ts";
import {useNavigate} from "react-router-dom";
import CourseItem from "./CourseItem.tsx";
import {getCourses} from "../../api/course/course.api.ts";


export default function CourseItems() {
  const {data} = useQuery<Course[]>({
    queryKey: ['dashboard', 'courses'],
    queryFn: getCourses,
    staleTime: 1000 * 60 * 5, // 5 minutes 동안 fresh data를 유지(fresh -> stale)
    gcTime: 1000 * 60 * 10, // 5 minutes 동안 garbage collection을 하지 않음. staleTime <= gcTime
  });

  const nav = useNavigate();

  const onClick = (id: number) => {
    console.log('click');
    nav(`/dashboard/course/${id}`);
  }

  return data?.map((course) => (
    <CourseItem key={course.id} course={course} onClick={()=>onClick(course.id)}/>
  ));
}