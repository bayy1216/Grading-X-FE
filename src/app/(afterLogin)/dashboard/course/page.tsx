import style from "@/app/(afterLogin)/dashboard/course/page.module.css";
import CourseItems from "@/app/(afterLogin)/dashboard/course/_component/CourseItems";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getCourses} from "@/app/(afterLogin)/dashboard/course/_lib/getCourses";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });
  const dehydratedState = dehydrate(queryClient);


  return (
    <div className={style.container}>
      <div className={style.currentClass}>
        <HydrationBoundary state={dehydratedState}>
          <CourseItems/>
        </HydrationBoundary>
      </div>
    </div>
  );
}
