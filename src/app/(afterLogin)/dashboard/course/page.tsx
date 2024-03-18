"use client";
import {useRouter} from "next/navigation";
import style from "@/app/(afterLogin)/dashboard/course/page.module.css";
import CourseItem from "@/app/(afterLogin)/dashboard/course/_component/CourseItem";

export default function Page() {
  const router = useRouter();

  function go(){
    router.push('/dashboard/class/21d')
  }
  return (
    <div className={style.container}>
      <div className={style.currentClass}>
        <CourseItem/>
        <CourseItem/>
        <CourseItem/>
      </div>
      <div className={style.previousClass}>
        <CourseItem/>
        <CourseItem/>
        <CourseItem/>
      </div>
    </div>
  );
}
