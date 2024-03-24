"use client";
import {useQuery} from "@tanstack/react-query";
import {Course} from "@/api/course/course.response";
import {getCourses} from "@/app/(afterLogin)/dashboard/course/_lib/getCourses";
import CourseItem from "@/app/(afterLogin)/dashboard/course/_component/CourseItem";
import {useRouter} from "next/navigation";

export default function CourseItems() {
  const { data } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: getCourses,
    staleTime: 1000 * 60 * 5, // 5 minutes 동안 fresh data를 유지(fresh -> stale)
    gcTime: 1000 * 60 * 10, // 5 minutes 동안 garbage collection을 하지 않음. staleTime <= gcTime
  });

  const router = useRouter();

  const onClick = (id:number) => {
    console.log('click');
    router.push(`/dashboard/course/${id}`);

  }

  return data?.map((course) => (
        <CourseItem key={course.id} course={course} onClick={()=>onClick(course.id)}/>
      ));
}