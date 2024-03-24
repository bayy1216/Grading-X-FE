"use client";
import {useRouter} from "next/navigation";
import style from "@/app/(afterLogin)/dashboard/course/page.module.css";
import CourseItem from "@/app/(afterLogin)/dashboard/course/_component/CourseItem";
import {useQuery} from "@tanstack/react-query";
import {getCourses} from "@/app/(afterLogin)/dashboard/course/_lib/getCourses";
import {Course} from "@/api/course/course.response";

export default function Page() {
  const router = useRouter();

  function go(id: string){
    router.push(`/dashboard/course/${id}`)
  }

  const { data } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  return (
    <div className={style.container}>
      <div className={style.currentClass}>
        {
          data?.map((course) =>
            <CourseItem key={course.id} onClick={()=>go(course.id.toString())} course={course}/>
          )
        }
      </div>
      {/*<div className={style.previousClass}>*/}
      {/*  <CourseItem onClick={()=>go('dd')}/>*/}
      {/*  <CourseItem onClick={()=>go('dd')}/>*/}
      {/*  <CourseItem onClick={()=>go('dd')}/>*/}
      {/*</div>*/}
    </div>
  );
}
