import {useLocation} from "react-router-dom";
import {ANNOUNCEMENTS, COURSES, DASHBOARD, MINUTE_5} from "@/const/data.ts";
import {useQuery} from "@tanstack/react-query";
import {AnnouncementsResponse} from "@/api/announcement/announcement.response.ts";
import {getAnnouncementsByCourseId} from "@/api/announcement/announcement.api.ts";

export default function CourseAnnouncementPage() {
  const location = useLocation();
  const courseId = parseInt(location.pathname.split("/")[3] || "0");

  const {data} = useQuery<AnnouncementsResponse, Object, AnnouncementsResponse, [_1: string, _2: string, _3: number, _4: string]>({
    queryKey: [DASHBOARD, COURSES, courseId, ANNOUNCEMENTS],
    queryFn: getAnnouncementsByCourseId,
    staleTime: MINUTE_5,
  });



  return (
    <div className="flex flex-col items-start justify-start w-full h-full overflow-y-auto">
      <h1>CourseAnnouncementPage</h1>
      {data?.announcementResponses.map((announcement) => (
        <div key={announcement.id}>
          {announcement.title}
          {announcement.content}
        </div>
      ))}
    </div>
  );
}