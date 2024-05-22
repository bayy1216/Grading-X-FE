import {axiosClient} from "@/api/AxiosClient.ts";
import {Announcement, AnnouncementsResponse} from "@/api/announcement/announcement.response.ts";
import {AnnouncementCreateRequest, AnnouncementUpdateRequest} from "@/api/announcement/announcement.request.ts";
import {QueryFunction} from "@tanstack/react-query";


export const getAnnouncementsByCourseId: QueryFunction<AnnouncementsResponse, [_1: string, _2: string, number, _4: string]>
  = async ({queryKey}): Promise<AnnouncementsResponse> => {
  const [_1, _2, courseId, _4] = queryKey;
  const response = await axiosClient.get(`/api/v2/announcement/${courseId}/announcement`);
  return response.data;
}

export async function createAnnouncement(courseId: number, request: AnnouncementCreateRequest): Promise<number> {
  const response = await axiosClient.post(`/api/v2/announcement/${courseId}/announcement`, {
    ...request
  });
  return response.data;
}

export async function getAnnouncementById(announcementId: number): Promise<Announcement> {
  const response = await axiosClient.get(`/api/v2/announcement/announcement/${announcementId}`);
  return response.data;
}


export async function updateAnnouncement(announcementId: number, request: AnnouncementUpdateRequest): Promise<void> {
  await axiosClient.put(`/api/v2/announcement/announcement/${announcementId}`, {
    ...request
  });
  return;
}

export async function deleteAnnouncement(announcementId: number): Promise<void> {
  await axiosClient.delete(`/api/v2/announcement/announcement/${announcementId}`);
  return;
}
