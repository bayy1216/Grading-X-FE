"use client";
import {useRouter} from "next/navigation";
import style from "@/app/(afterLogin)/dashboard/course/page.module.css";
import CourseItem from "@/app/(afterLogin)/dashboard/course/_component/CourseItem";

export default function Page() {
  const router = useRouter();

  function go(id: string){
    router.push(`/dashboard/course/${id}`)
  }
  return (
    <div className={style.container}>
      <div className={style.currentClass}>
        <CourseItem onClick={()=>go('dd')}/>
        <CourseItem onClick={()=>go('dd')}/>
        <CourseItem onClick={()=>go('dd')}/>
      </div>
      <div className={style.previousClass}>
        <CourseItem onClick={()=>go('dd')}/>
        <CourseItem onClick={()=>go('dd')}/>
        <CourseItem onClick={()=>go('dd')}/>
      </div>
    </div>
  );
}
