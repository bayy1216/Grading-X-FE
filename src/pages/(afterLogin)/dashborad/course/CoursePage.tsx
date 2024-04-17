import {getCourses} from "@/api/course/course.api.ts";
import {useQuery} from "@tanstack/react-query";
import {CoursesResponse} from "@/api/course/course.response.ts";
import {Link, useNavigate} from "react-router-dom";
import CourseItem from "../../../../components/course/CourseItem.tsx";
import {COURSES, DASHBOARD, MEMBER, MINUTE_5} from "@/const/data.ts";
import {Button} from "@/components/ui/button.tsx";

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
    <div className="w-full h-screen flex flex-col p-8 items-center overflow-y-auto">
      <div className="grid grid-cols-4 gap-5">
        {
          data?.courseResponses.map((course) => (
            <div className="" key={course.id}>
              <CourseItem course={course} onClick={() => onClick(course.id)}/>
            </div>
          ))
        }
        <Button size={"lg"} asChild>
          <Link to="/dashboard/course/create">Create a new course</Link>
        </Button>
      </div>
    </div>
  );
}