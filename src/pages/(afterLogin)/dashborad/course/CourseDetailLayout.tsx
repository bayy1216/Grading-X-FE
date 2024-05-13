import {Outlet, useLocation} from "react-router-dom";
import {Separator} from "@/components/ui/separator.tsx";
import {useQuery} from "@tanstack/react-query";
import {CoursesResponse} from "@/api/course/course.response.ts";
import {COURSES, DASHBOARD, MEMBER, MINUTE_5} from "@/const/data.ts";
import {getCourses} from "@/api/course/course.api.ts";

export default function CourseDetailLayout() {
  const {data} = useQuery<CoursesResponse>({
    queryKey: [MEMBER, DASHBOARD, COURSES],
    queryFn: getCourses,
    staleTime: MINUTE_5, // 5 minutes 동안 fresh data를 유지(fresh -> stale)
  });
  const location = useLocation();
  const courseId = parseInt(location.pathname.split("/")[3] || "0");

  const course = data?.courseResponses.find((course) => course.id === courseId)
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-[50px] flex justify-start items-center pl-4">
        {course?.courseName}
      </div>
      <Separator/>
      <div className="w-full h-full flex flex-row">
        <div className="h-full w-[160px] flex flex-col p-4">
          <div className="text-[12px] font-light mb-8">
            {course?.startDate} ~ {course?.endDate}
          </div>
          <h1>시험</h1>
          <h1>성적</h1>
        </div>

        <Outlet/>
      </div>
    </div>
  );
}